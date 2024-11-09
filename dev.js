(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.QuillToolbarTip = {}));
})(this, (function (exports) { 'use strict';

    const tooltipDefaultOptions = {
        msg: '',
        delay: 150,
        direction: 'top',
        className: [],
        distance: 8,
    };

    const viewportPadding = 8;
    const limitDomInViewPort = (rect) => {
        let { left, top, width, height } = rect;
        const { clientWidth, clientHeight } = document.documentElement;
        let leftLimited = false;
        let topLimited = false;
        if (left + width > clientWidth) {
            left = clientWidth - width - viewportPadding;
            leftLimited = true;
        }
        else if (left < 0) {
            left = viewportPadding;
            leftLimited = true;
        }
        if (top + height > clientHeight) {
            top = clientHeight - height - viewportPadding;
            topLimited = true;
        }
        else if (top < 0) {
            top = viewportPadding;
            topLimited = true;
        }
        return {
            left,
            top,
            leftLimited,
            topLimited,
        };
    };

    const isUndefined = (val) => val === undefined;
    const isString = (val) => typeof val === 'string';
    const ensureArray = (value) => (Array.isArray(value) ? (value || []) : [value]);

    let tooltipContainer;
    const createTooltip = (target, options = {}) => {
        let { msg = '', delay = 150, content, direction = 'top', className = [], distance = 8, onShow, } = Object.assign(tooltipDefaultOptions, options);
        if (isString(className)) {
            className = ensureArray(className.split(' '));
        }
        if (msg || content || onShow) {
            if (!tooltipContainer) {
                tooltipContainer = document.createElement('div');
                document.body.appendChild(tooltipContainer);
            }
            const tooltip = document.createElement('div');
            tooltip.classList.add('toolbar-tip__tooltip', 'hidden', 'transparent', ...className);
            const setTooltipContent = () => {
                if (content) {
                    tooltip.appendChild(content);
                }
                if (msg) {
                    tooltip.textContent = msg;
                }
                if (onShow) {
                    const result = onShow(target);
                    if (isString(result)) {
                        tooltip.textContent = result;
                    }
                    else if (result) {
                        tooltip.appendChild(result);
                    }
                    else {
                        return false;
                    }
                }
                return Boolean(content || msg || onShow);
            };
            let timer;
            const transitionendHandler = () => {
                tooltip.classList.add('hidden');
                if (tooltipContainer.contains(tooltip)) {
                    tooltipContainer.removeChild(tooltip);
                }
            };
            const open = () => {
                if (timer)
                    clearTimeout(timer);
                timer = setTimeout(() => {
                    // empty content will not display
                    const setContentResult = setTooltipContent();
                    if (!setContentResult)
                        return;
                    tooltipContainer.appendChild(tooltip);
                    tooltip.removeEventListener('transitionend', transitionendHandler);
                    tooltip.classList.remove('hidden');
                    const elRect = target.getBoundingClientRect();
                    const contentRect = tooltip.getBoundingClientRect();
                    const extraPositionMap = {
                        top: {
                            top: -contentRect.height - distance,
                            left: elRect.width / 2 - contentRect.width / 2,
                        },
                        right: {
                            top: elRect.height / 2 - contentRect.height / 2,
                            left: elRect.width + distance,
                        },
                        bottom: {
                            top: contentRect.height + distance,
                            left: elRect.width / 2 - contentRect.width / 2,
                        },
                        left: {
                            top: elRect.height / 2 - contentRect.height / 2,
                            left: -contentRect.width - distance,
                        },
                    };
                    const extra = extraPositionMap[direction];
                    let top = elRect.top + extra.top;
                    let left = elRect.left + extra.left;
                    Object.assign(tooltip.style, {
                        top: `${top + window.scrollY}px`,
                        left: `${left + window.scrollX}px`,
                    });
                    ({ top, left } = limitDomInViewPort(tooltip.getBoundingClientRect()));
                    Object.assign(tooltip.style, {
                        top: `${top + window.scrollY}px`,
                        left: `${left + window.scrollX}px`,
                    });
                    tooltip.classList.remove('transparent');
                }, delay);
            };
            const close = () => {
                if (timer)
                    clearTimeout(timer);
                timer = setTimeout(() => {
                    tooltip.classList.add('transparent');
                    tooltip.addEventListener('transitionend', transitionendHandler, { once: true });
                    // handle remove when transition set none
                    setTimeout(() => {
                        transitionendHandler();
                    }, 150);
                }, delay);
            };
            target.addEventListener('mouseenter', open);
            target.addEventListener('mouseleave', close);
            tooltip.addEventListener('mouseenter', open);
            tooltip.addEventListener('mouseleave', close);
            return tooltip;
        }
        return null;
    };

    class QuillToolbarTip {
        quill;
        static moduleName = 'toolbarTip';
        options;
        toolbar;
        constructor(quill, options) {
            this.quill = quill;
            if (!options.tipTextMap) {
                throw new Error('Please provide the tip text');
            }
            this.options = this.resolveOptions(options);
            this.toolbar = this.quill.getModule('toolbar');
            if (!this.toolbar) {
                throw new Error('Please provide the toolbar');
            }
            if (!this.toolbar || this.toolbar.controls.length <= 0) {
                console.warn('Toolbar is not available or has no controls');
            }
            else {
                this.createToolbarTip();
            }
        }
        resolveOptions(options) {
            Object.assign(tooltipDefaultOptions, options.defaultTooltipOptions);
            return {
                tipTextMap: options.tipTextMap || {},
            };
        }
        createToolbarTip() {
            for (const control of this.toolbar.controls) {
                const toolControlItem = control;
                let [toolName, toolControl] = toolControlItem;
                const parentOptions = this.options.tipTextMap[toolName];
                if (toolControl.value) {
                    toolName = `${toolName}:${toolControl.value}`;
                }
                let currentControlOption = this.options.tipTextMap[toolName];
                if (isString(currentControlOption)) {
                    currentControlOption = {
                        msg: currentControlOption,
                    };
                }
                const targetLabel = this.getControlLabel(toolControlItem);
                if (!targetLabel || (isUndefined(currentControlOption) && isUndefined(parentOptions)))
                    continue;
                createTooltip(targetLabel, {
                    ...currentControlOption,
                    onShow(target) {
                        let result = toolControl.value;
                        if (parentOptions && !isString(parentOptions) && parentOptions.onShow) {
                            result = parentOptions.onShow(target, toolControl.value);
                        }
                        let currentControlResult;
                        if (currentControlOption) {
                            currentControlResult = currentControlOption.onShow ? currentControlOption.onShow(target, toolControl.value) : currentControlOption.content || currentControlOption.msg;
                        }
                        return currentControlResult || result;
                    },
                });
            }
        }
        getControlLabel([toolName, target]) {
            return target.tagName.toLowerCase() === 'button' ? target : this.toolbar.container?.querySelector(`.ql-${toolName} .ql-picker-label`);
        }
    }

    exports.QuillToolbarTip = QuillToolbarTip;
    exports.default = QuillToolbarTip;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=dev.js.map
