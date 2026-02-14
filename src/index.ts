import type Quill from 'quill';
import type Toolbar from 'quill/modules/toolbar';
import type { TooltipInstance, TooltipOptions } from './utils';
import { tooltipDefaultOptions } from './constants';
import { createTooltip, isString, isUndefined } from './utils';

export interface TooltipItem extends Omit<TooltipOptions, 'onShow'> {
  values?: Record<string, string>;
  onShow?: (this: Quill, target: HTMLElement, value: string) => ReturnType<TooltipOptions['onShow']>;
}

export interface QuillToolbarTipOptions {
  tipTextMap: Record<string, Partial<TooltipItem> | string>;
  defaultTooltipOptions: Partial<TooltipOptions>;
}
export class QuillToolbarTip {
  static moduleName = 'toolbar-tip';
  options: QuillToolbarTipOptions;
  toolbar: Toolbar;
  toolbarTips: [string, TooltipInstance][] = [];
  constructor(
    public quill: Quill,
    options: Partial<QuillToolbarTipOptions>,
  ) {
    if (!options.tipTextMap) {
      throw new Error('Please provide the tip text');
    }
    this.options = this.resolveOptions(options);
    this.toolbar = this.quill.getModule('toolbar') as Toolbar;
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

  resolveOptions(options: Partial<QuillToolbarTipOptions>): QuillToolbarTipOptions {
    return {
      defaultTooltipOptions: Object.assign({}, tooltipDefaultOptions, options.defaultTooltipOptions),
      tipTextMap: options.tipTextMap || {},
    };
  }

  createToolbarTip() {
    for (const control of this.toolbar.controls) {
      const toolControlItem = control as [string, HTMLButtonElement | HTMLSelectElement];
      const [toolName, toolControl] = toolControlItem;

      let config = this.options.tipTextMap[toolName];
      if (isUndefined(config)) continue;

      // Convert string to object
      if (isString(config)) {
        config = { msg: config };
      }

      const targetLabel = this.getControlLabel(toolControlItem);
      if (!targetLabel) continue;

      // Create tooltip with new priority logic
      const instance = createTooltip(targetLabel, {
        ...this.options.defaultTooltipOptions,
        ...config,
        onShow: (target: HTMLElement) => {
          const currentValue = toolControl.value || '';

          // Priority 1: onShow function
          if (config.onShow) {
            return config.onShow.call(this.quill, target, currentValue);
          }

          // Priority 2: values mapping
          if (config.values && currentValue in config.values) {
            return config.values[currentValue];
          }

          // Priority 3: msg or content from config
          return config.content || config.msg || null;
        },
        appendTo: this.quill.container,
      });

      if (instance) {
        this.toolbarTips.push([toolName, instance]);
      }
    }
  }

  getControlLabel([_, target]: [string, HTMLButtonElement | HTMLSelectElement]) {
    return target.tagName.toLowerCase() === 'button' ? target : target.previousElementSibling!.querySelector('.ql-picker-label') as HTMLElement | null;
  }

  destroyAllTips() {
    const tips = this.toolbarTips;
    if (tips.length === 0) return;
    for (const [, item] of tips) {
      item.destroy();
    }
    this.toolbarTips = [];
  }

  hideAllTips() {
    const tips = this.toolbarTips;
    if (tips.length === 0) return;
    for (const [,item] of tips) {
      item.hide();
    }
  }
}

export default QuillToolbarTip;
export { defaultToolbarTip } from './constants';
