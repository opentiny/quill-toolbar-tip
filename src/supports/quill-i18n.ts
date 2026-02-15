import type Quill from 'quill';
import type { QuillToolbarTipOptions } from '..';

export function createI18nToolbarTipMap(options: {
  prefix?: string;
  formats?: {
    simple?: string[];
    withValues?: Record<string, string[]>;
  };
  i18nModuleName?: string;
} = {}) {
  interface I18n {
    t: (key: string, params?: Record<string, any>, defaultValue?: string) => string;
  }
  const {
    prefix = 'toolbar',
    i18nModuleName = 'i18n',
  } = options;

  const FORMATS = options.formats || {
    simple: ['bold', 'italic', 'underline', 'strike', 'color', 'background', 'blockquote', 'code-block', 'code', 'link', 'image', 'video', 'formula', 'clean'],
    withValues: {
      list: ['ordered', 'bullet', 'check'],
      script: ['sub', 'super'],
      indent: ['-1', '+1'],
      header: ['', '1', '2', '3', '4', '5', '6'],
      align: ['', 'center', 'right', 'justify'],
      size: ['small', '', 'large', 'huge'],
      font: ['', 'serif', 'monospace'],
      direction: ['', 'rtl'],
    },
  };

  const tipTextMap: QuillToolbarTipOptions['tipTextMap'] = {};
  // Simple buttons - use onShow to dynamically get translation
  for (const format of (FORMATS.simple || [])) {
    tipTextMap[format] = {
      onShow() {
        const i18n = this.getModule?.(i18nModuleName) as I18n;
        if (!i18n) return;
        return i18n.t(`${prefix}.${format}`, {});
      },
    };
  }
  // Buttons with values
  for (const [format] of Object.entries(FORMATS.withValues || {})) {
    tipTextMap[format] = {
      onShow(this: Quill, target: HTMLElement, value: string) {
        const i18n = this.getModule?.(i18nModuleName) as I18n;
        if (!i18n) return;
        return i18n.t(`${prefix}.${format}.${value}`, {});
      },
    };
  }
  return tipTextMap;
}
