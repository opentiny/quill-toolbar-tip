import { autoUpdate, computePosition, flip, limitShift, offset, shift } from '@floating-ui/dom';
import { tooltipDefaultOptions } from '../constants';
import { handleIfTransitionend } from './handler-utils';
import { ensureArray, isString } from './types';

export type Placement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'left'
  | 'left-start'
  | 'left-end';
export interface TooltipOptions {
  direction: Placement;
  msg: string;
  delay: number;
  content: HTMLElement;
  className: string | string[];
  tipHoverable: boolean;
  onShow: (target: HTMLElement) => string | HTMLElement | undefined | null;
  appendTo: HTMLElement;
}
export interface TooltipInstance {
  instance: HTMLElement;
  destroy: () => void;
  hide: () => void;
  show: () => void;
}
let tooltipContainer: HTMLElement | undefined;
export const createTooltip = (target: HTMLElement, options: Partial<TooltipOptions> = {}): TooltipInstance | null => {
  let {
    msg = '',
    delay = 150,
    content,
    direction = 'top',
    className = [],
    tipHoverable = true,
    onShow,
    appendTo = document.body,
  } = Object.assign({}, tooltipDefaultOptions, options);
  if (isString(className)) {
    className = ensureArray(className.split(' '));
  }
  if (msg || content || onShow) {
    const tooltip = document.createElement('div');
    tooltip.classList.add('toolbar-tip__tooltip', 'hidden', 'transparent', ...className);

    const appendLine = (msg: string) => {
      tooltip.innerHTML = '';
      for (const text of msg.split('\n')) {
        const line = document.createElement('div');
        line.textContent = text;
        tooltip.appendChild(line);
      }
    };
    const setTooltipContent = () => {
      if (content) {
        tooltip.appendChild(content);
      }
      if (msg) {
        appendLine(msg);
      }
      if (onShow) {
        const result = onShow(target);
        if (isString(result)) {
          appendLine(result);
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

    let timer: ReturnType<typeof setTimeout> | null;
    let cleanup: () => void;
    const update = () => {
      computePosition(target, tooltip, {
        placement: direction,
        middleware: [flip(), shift({ limiter: limitShift() }), offset(8)],
      }).then(({ x, y }) => {
        Object.assign(tooltip.style, {
          left: `${x}px`,
          top: `${y}px`,
        });
      });
    };
    const transitionendHandler = () => {
      tooltip.classList.add('hidden');
      tooltip.remove();
      if (cleanup) cleanup();
    };
    function show() {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        // empty content will not display
        const setContentResult = setTooltipContent();
        if (!setContentResult) return;

        if (!tooltipContainer) {
          tooltipContainer = document.createElement('div');
          appendTo.appendChild(tooltipContainer);
        }
        tooltipContainer.appendChild(tooltip);
        tooltip.removeEventListener('transitionend', transitionendHandler);
        tooltip.classList.remove('hidden');

        cleanup = autoUpdate(target, tooltip, update);

        tooltip.classList.remove('transparent');
      }, delay);
    }

    function hide() {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        tooltip.classList.add('transparent');
        handleIfTransitionend(tooltip, 150, transitionendHandler, { once: true });
      }, delay);
    }

    const eventListeners = [target];
    if (tipHoverable) {
      eventListeners.push(tooltip);
    }
    for (const listener of eventListeners) {
      listener.addEventListener('mouseenter', show);
      listener.addEventListener('mouseleave', hide);
    }

    const destroy = () => {
      for (const listener of eventListeners) {
        listener.removeEventListener('mouseenter', show);
        listener.removeEventListener('mouseleave', hide);
      }
      if (cleanup) cleanup();
      tooltip.remove();
      if (tooltipContainer && tooltipContainer.children.length <= 0) {
        tooltipContainer.remove();
        tooltipContainer = undefined;
      }
    };

    return {
      instance: tooltip,
      destroy,
      show,
      hide,
    };
  }
  return null;
};
