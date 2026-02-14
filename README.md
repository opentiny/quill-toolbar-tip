# Quill Toolbar Tip

[online demo](https://zzxming.github.io/quill-toolbar-tip/)

## Install

```sh
npm install quill-toolbar-tip
```

## Usage

If you want to use English text, you can use the default tip text that export named `defaultToolbarTip`

```ts
import QuillToolbarTip, { defaultToolbarTip } from 'quill-toolbar-tip';
import 'quill-toolbar-tip/dist/index.css';

Quill.register({
  [`modules/${QuillToolbarTip.moduleName}`]: QuillToolbarTip,
}, true);

const QuillToolbarTipOption = {
  tipTextMap: defaultToolbarTip['en-US']
};

const quill = new Quill('#editor', {
  theme: 'snow',
  modules: {
    toolbar: [
      ['bold', 'italic',],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ color: [] }, { background: [] }],
    ],
    [QuillToolbarTip.moduleName]: QuillToolbarTipOption
  },
});
```

Or you can add the text in `tipTextMap` to display in the tooltip. The keys match the toolbar format name.

```ts
import QuillToolbarTip from 'quill-toolbar-tip';
import 'quill-toolbar-tip/dist/index.css';

Quill.register({
  [`modules/${QuillToolbarTip.moduleName}`]: QuillToolbarTip,
}, true);

const QuillToolbarTipOption = {
  tipTextMap: {
    bold: 'Bold',
    italic: 'Italic',
    color: {
      onShow(target, value) {
        return `Font Color${value ? `: ${value}` : ''}`;
      },
    },
    background: {
      onShow(target, value) {
        return `Background Color${value ? `: ${value}` : ''}`;
      },
    },
  }
};

const quill = new Quill('#editor', {
  theme: 'snow',
  modules: {
    toolbar: [
      ['bold', 'italic',],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ color: [] }, { background: [] }],
    ],
    [QuillToolbarTip.moduleName]: QuillToolbarTipOption
  },
});
```

## Configuration Structure

For toolbar formats with multiple values (like pickers and dropdowns), you can use the `values` object to map each value to its tooltip text:

```ts
const QuillToolbarTipOption = {
  tipTextMap: {
    list: {
      values: {
        ordered: 'Ordered List',
        bullet: 'Unordered List',
      },
    },
    align: {
      values: {
        '': 'Left aligned',
        center: 'Center aligned',
        right: 'Right aligned',
        justify: 'Justify aligned',
      },
    },
  }
};
```

You can also use the `onShow` function to dynamically calculate the tooltip text. When both `values` and `onShow` are provided, `onShow` takes priority:

```ts
const QuillToolbarTipOption = {
  tipTextMap: {
    script: {
      values: {
        sub: 'Subscript',
        super: 'Superscript',
      },
      // onShow takes priority over values
      onShow(target, value) {
        return `Script: ${value}`;
      },
    },
  }
};
```

## Options

| Option                | Type                                             | Description                                                                                                                      |
| --------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| defaultTooltipOptions | `Partial<TooltipOptions>`                        | Default tooltip options.                                                                                                         |
| tipTextMap            | `Record<string, Partial<TooltipItem> \| string>` | Tooltip text map. You can also set a object that will be use in the tooltip. The configuration of tooltip options is shown below |

### Tooltip Options

| Option       | Description                                                                                |
| ------------ | ------------------------------------------------------------------------------------------ |
| direction    | The direction of the tooltip display                                                       |
| delay        | The delay before the tooltip is displayed and hidden in milliseconds.                      |
| msg          | The message of the tooltip                                                                 |
| content      | The content of the tooltip                                                                 |
| className    | The class name of the tooltip                                                              |
| tipHoverable | Display tooltip when tooltip is hovered. Default is `true`.                                |
| onShow       | Callback when tooltip show. If `onShow` return `undefined`, the tooltip will not be shown. |

```ts
interface TooltipOptions {
  direction:
    | 'auto'
    | 'auto-start'
    | 'auto-end'
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
  msg: string;
  delay: number;
  content: HTMLElement;
  className: string | string[];
  onShow: (target: HTMLElement) => string | HTMLElement | undefined;
}
```

Only one of `msg` / `content` and `onShow` will be effective at the same time, with a priority of `onShow` > `content` > `msg`.

That means if you set a options like below. the final display text will be 'C'

```js
const B = document.createElement('span');
B.textContent = 'B';

tipTextMap = {
  color: {
    msg: 'A',
    content: B,
    onShow() {
      return 'C';
    },
  },
};
```

The parameter `value` of `onShow` is the current value of the toolbar button or select

```ts
interface TooltipItem extends Omit<TooltipOptions, 'onShow'> {
  onShow: (target: HTMLElement, value: string) => string | HTMLElement;
}
```

The `defaultTooltipOptions` like below

```ts
const tooltipDefaultOptions = {
  msg: '',
  delay: 150,
  direction: 'top',
  className: [] as string[],
};
```
