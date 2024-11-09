(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.QuillToolbarTip = {}));
})(this, (function (exports) { 'use strict';

    class QuillToolbarTip {
        quill;
        static moduleName = 'toolbarTip';
        options;
        constructor(quill, options) {
            this.quill = quill;
            if (!options.tipTextMap) {
                throw new Error('Please provide the tip text');
            }
            this.options = options;
        }
    }

    exports.QuillToolbarTip = QuillToolbarTip;
    exports.default = QuillToolbarTip;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=dev.js.map
