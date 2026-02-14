import type { QuillToolbarTipOptions } from '..';

export const defaultToolbarTip: Record<string, QuillToolbarTipOptions['tipTextMap']> = {
  'en-US': {
    // Simple string configs
    'blockquote': 'Blockquote',
    'bold': 'Bold',
    'clean': 'Clean',
    'code': 'Code',
    'code-block': 'Code Block',
    'formula': 'Formula',
    'italic': 'Italic',
    'image': 'Image',
    'strike': 'Strike',
    'table': 'Table',
    'underline': 'Underline',
    'video': 'Video',
    'link': 'Link',

    // Object configs with values mapping
    'list': {
      values: {
        ordered: 'Ordered List',
        bullet: 'Unordered List',
        check: 'Todo List',
      },
    },
    'align': {
      values: {
        '': 'Left aligned',
        'center': 'Center aligned',
        'right': 'Right aligned',
        'justify': 'Justify aligned',
      },
    },
    'script': {
      values: {
        super: 'Superscript',
        sub: 'Subscript',
      },
    },
    'indent': {
      values: {
        '-1': 'Minus Indent',
        '+1': 'Add Indent',
      },
    },
    'header': {
      values: {
        '': 'Normal text',
        '1': 'Heading 1',
        '2': 'Heading 2',
        '3': 'Heading 3',
        '4': 'Heading 4',
        '5': 'Heading 5',
        '6': 'Heading 6',
      },
    },
    'size': 'Font Size',
    'font': 'Font Style',

    // Configs with onShow function (takes priority over values)
    'direction': {
      onShow(target) {
        return target.classList.contains('ql-active') ? 'Text Direction Right To Left' : 'Text Direction Left To Right';
      },
    },
    'color': {
      onShow(target, value) {
        return value || 'Color';
      },
    },
    'background': {
      onShow(target, value) {
        return value || 'Background';
      },
    },
  },
};
