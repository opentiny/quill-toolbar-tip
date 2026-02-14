const Quill = window.Quill;
const QuillToolbarTip = window.QuillToolbarTip.default;

Quill.register({
  [`modules/${QuillToolbarTip.moduleName}`]: QuillToolbarTip,
}, true);

const toolbar = [
  ['bold', 'italic', 'underline', 'strike'],
  [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ color: [] }, { background: [] }],
  ['blockquote', 'code-block', 'code', 'clean'],
  ['link', 'image', 'video', 'formula'],
  ['direction', { direction: 'rtl' }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ size: ['small', false, 'large', 'huge'] }],
  [{ font: [] }],
  [{ align: [] }],
  [{ indent: '-1' }, { indent: '+1' }],
];

// Comprehensive configuration example demonstrating all options
const toolbarTipOptions = {
  // Default options for all tooltips
  defaultTooltipOptions: {
    direction: 'top', // Default direction
    delay: 200, // Custom delay (ms)
    tipHoverable: true, // Allow hovering on tooltip
    className: 'custom-tip', // Custom CSS class
  },

  tipTextMap: {
    // 1. Simple string configuration
    'bold': 'Bold Text',
    'italic': 'Italic Text',
    'underline': 'Underline Text',
    'strike': 'Strikethrough',
    'blockquote': 'Block Quote',
    'code-block': 'Code Block',
    'code': 'Inline Code',
    'clean': 'Clear Formatting',
    'link': 'Insert Link',
    'image': 'Insert Image',
    'video': 'Insert Video',
    'formula': 'Insert Formula',

    // 2. Values mapping for picker formats
    'list': {
      values: {
        ordered: 'Numbered List',
        bullet: 'Bulleted List',
        check: 'Checklist',
      },
    },

    'script': {
      values: {
        sub: 'Subscript',
        super: 'Superscript',
      },
    },

    'header': {
      values: {
        '': 'Normal Text',
        '1': 'Heading 1',
        '2': 'Heading 2',
        '3': 'Heading 3',
        '4': 'Heading 4',
        '5': 'Heading 5',
        '6': 'Heading 6',
      },
    },

    'align': {
      values: {
        '': 'Align Left',
        'center': 'Align Center',
        'right': 'Align Right',
        'justify': 'Justify',
      },
    },

    'indent': {
      values: {
        '-1': 'Decrease Indent',
        '+1': 'Increase Indent',
      },
    },

    'size': {
      values: {
        'small': 'Small Size',
        '': 'Normal Size',
        'large': 'Large Size',
        'huge': 'Huge Size',
      },
    },

    'font': 'Font Family',

    // 3. onShow function for dynamic content
    'color': {
      onShow(target, value) {
        return value ? `Text Color: ${value}` : 'Select Text Color';
      },
    },

    'background': {
      onShow(target, value) {
        return value ? `Background: ${value}` : 'Select Background Color';
      },
    },

    // 4. onShow with target element inspection
    'direction': {
      onShow(target) {
        const isRTL = target.classList.contains('ql-active');
        return isRTL ? 'Switch to LTR' : 'Switch to RTL';
      },
    },

    // 5. Custom tooltip options per format
    // Note: content (HTMLElement) example would be:
    // 'custom-format': {
    //   content: document.createElement('div'), // Custom HTML element
    //   direction: 'bottom',
    //   delay: 500,
    // },

    // 6. Combining values and onShow (onShow takes priority)
    // Uncomment to see onShow override values:
    // list: {
    //   values: {
    //     ordered: 'Numbered List',
    //     bullet: 'Bulleted List',
    //   },
    //   onShow(target, value) {
    //     return `List Type: ${value}`;
    //   },
    // },
  },
};

const quill1 = new Quill('#editor1', {
  theme: 'snow',
  modules: {
    toolbar,
    [QuillToolbarTip.moduleName]: toolbarTipOptions,
  },
});

const quill2 = new Quill('#editor2', {
  theme: 'bubble',
  modules: {
    toolbar,
    [QuillToolbarTip.moduleName]: toolbarTipOptions,
  },
});

document.getElementById('destroy-tips').addEventListener('click', () => {
  for (const quill of [quill1, quill2]) {
    quill.getModule(QuillToolbarTip.moduleName).destroyAllTips();
  }
});

document.getElementById('hide-tips').addEventListener('click', () => {
  for (const quill of [quill1, quill2]) {
    quill.getModule(QuillToolbarTip.moduleName).hideAllTips();
  }
});
