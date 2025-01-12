!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).QuillToolbarTip={})}(this,(function(t){"use strict";const e={"en-US":{...["background","blockquote","bold","clean","code","color","formula","italic","image","strike","table","underline","video","link"].reduce(((t,e)=>(t[e]=e[0].toUpperCase()+e.slice(1),t)),{}),...["list","align","script","indent","header"].reduce(((t,e)=>{const n={"list:ordered":"Ordered List","list:bullet":"Unordered List","list:check":"Todo List","align:left":"Left aligned","align:center":"Center aligned","align:right":"Right aligned","align:justify":"Justify aligned","script:super":"Superscript","script:sub":"Subscript","indent:-1":"Minus Indent","indent:+1":"Add Indent",text:"Text","header:1":"Heading 1","header:2":"Heading 2","header:3":"Heading 3","header:4":"Heading 4","header:5":"Heading 5","header:6":"Heading 6"};return t[e]={onShow:(t,o)=>("align"!==e||o||(o="left"),"header"!==e||o?n[`${e}:${o}`]:n.text)},t}),{}),"code-block":"Code Block",size:"Font Size",font:"Font Style",direction:{onShow:t=>t.classList.contains("ql-active")?"Text Direction Right To Left":"Text Direction Left To Right"}}},n={msg:"",delay:150,direction:"top",className:[]},o=Math.min,i=Math.max,r=Math.round,l=Math.floor,s=t=>({x:t,y:t}),c={left:"right",right:"left",bottom:"top",top:"bottom"},a={start:"end",end:"start"};function f(t,e,n){return i(t,o(e,n))}function u(t,e){return"function"==typeof t?t(e):t}function d(t){return t.split("-")[0]}function p(t){return t.split("-")[1]}function h(t){return"x"===t?"y":"x"}function m(t){return"y"===t?"height":"width"}function g(t){return["top","bottom"].includes(d(t))?"y":"x"}function y(t){return h(g(t))}function x(t){return t.replace(/start|end/g,(t=>a[t]))}function v(t){return t.replace(/left|right|bottom|top/g,(t=>c[t]))}function w(t){const{x:e,y:n,width:o,height:i}=t;return{width:o,height:i,top:n,left:e,right:e+o,bottom:n+i,x:e,y:n}}function b(t,e,n){let{reference:o,floating:i}=t;const r=g(e),l=y(e),s=m(l),c=d(e),a="y"===r,f=o.x+o.width/2-i.width/2,u=o.y+o.height/2-i.height/2,h=o[s]/2-i[s]/2;let x;switch(c){case"top":x={x:f,y:o.y-i.height};break;case"bottom":x={x:f,y:o.y+o.height};break;case"right":x={x:o.x+o.width,y:u};break;case"left":x={x:o.x-i.width,y:u};break;default:x={x:o.x,y:o.y}}switch(p(e)){case"start":x[l]-=h*(n&&a?-1:1);break;case"end":x[l]+=h*(n&&a?-1:1)}return x}async function T(t,e){var n;void 0===e&&(e={});const{x:o,y:i,platform:r,rects:l,elements:s,strategy:c}=t,{boundary:a="clippingAncestors",rootBoundary:f="viewport",elementContext:d="floating",altBoundary:p=!1,padding:h=0}=u(e,t),m=function(t){return"number"!=typeof t?function(t){return{top:0,right:0,bottom:0,left:0,...t}}(t):{top:t,right:t,bottom:t,left:t}}(h),g=s[p?"floating"===d?"reference":"floating":d],y=w(await r.getClippingRect({element:null==(n=await(null==r.isElement?void 0:r.isElement(g)))||n?g:g.contextElement||await(null==r.getDocumentElement?void 0:r.getDocumentElement(s.floating)),boundary:a,rootBoundary:f,strategy:c})),x="floating"===d?{x:o,y:i,width:l.floating.width,height:l.floating.height}:l.reference,v=await(null==r.getOffsetParent?void 0:r.getOffsetParent(s.floating)),b=await(null==r.isElement?void 0:r.isElement(v))&&await(null==r.getScale?void 0:r.getScale(v))||{x:1,y:1},T=w(r.convertOffsetParentRelativeRectToViewportRelativeRect?await r.convertOffsetParentRelativeRectToViewportRelativeRect({elements:s,rect:x,offsetParent:v,strategy:c}):x);return{top:(y.top-T.top+m.top)/b.y,bottom:(T.bottom-y.bottom+m.bottom)/b.y,left:(y.left-T.left+m.left)/b.x,right:(T.right-y.right+m.right)/b.x}}function L(){return"undefined"!=typeof window}function R(t){return S(t)?(t.nodeName||"").toLowerCase():"#document"}function A(t){var e;return(null==t||null==(e=t.ownerDocument)?void 0:e.defaultView)||window}function E(t){var e;return null==(e=(S(t)?t.ownerDocument:t.document)||window.document)?void 0:e.documentElement}function S(t){return!!L()&&(t instanceof Node||t instanceof A(t).Node)}function C(t){return!!L()&&(t instanceof Element||t instanceof A(t).Element)}function O(t){return!!L()&&(t instanceof HTMLElement||t instanceof A(t).HTMLElement)}function D(t){return!(!L()||"undefined"==typeof ShadowRoot)&&(t instanceof ShadowRoot||t instanceof A(t).ShadowRoot)}function k(t){const{overflow:e,overflowX:n,overflowY:o,display:i}=N(t);return/auto|scroll|overlay|hidden|clip/.test(e+o+n)&&!["inline","contents"].includes(i)}function H(t){return["table","td","th"].includes(R(t))}function P(t){return[":popover-open",":modal"].some((e=>{try{return t.matches(e)}catch(t){return!1}}))}function F(t){const e=M(),n=C(t)?N(t):t;return"none"!==n.transform||"none"!==n.perspective||!!n.containerType&&"normal"!==n.containerType||!e&&!!n.backdropFilter&&"none"!==n.backdropFilter||!e&&!!n.filter&&"none"!==n.filter||["transform","perspective","filter"].some((t=>(n.willChange||"").includes(t)))||["paint","layout","strict","content"].some((t=>(n.contain||"").includes(t)))}function M(){return!("undefined"==typeof CSS||!CSS.supports)&&CSS.supports("-webkit-backdrop-filter","none")}function B(t){return["html","body","#document"].includes(R(t))}function N(t){return A(t).getComputedStyle(t)}function W(t){return C(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function V(t){if("html"===R(t))return t;const e=t.assignedSlot||t.parentNode||D(t)&&t.host||E(t);return D(e)?e.host:e}function j(t){const e=V(t);return B(e)?t.ownerDocument?t.ownerDocument.body:t.body:O(e)&&k(e)?e:j(e)}function q(t,e,n){var o;void 0===e&&(e=[]),void 0===n&&(n=!0);const i=j(t),r=i===(null==(o=t.ownerDocument)?void 0:o.body),l=A(i);if(r){const t=z(l);return e.concat(l,l.visualViewport||[],k(i)?i:[],t&&n?q(t):[])}return e.concat(i,q(i,[],n))}function z(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function $(t){const e=N(t);let n=parseFloat(e.width)||0,o=parseFloat(e.height)||0;const i=O(t),l=i?t.offsetWidth:n,s=i?t.offsetHeight:o,c=r(n)!==l||r(o)!==s;return c&&(n=l,o=s),{width:n,height:o,$:c}}function _(t){return C(t)?t:t.contextElement}function I(t){const e=_(t);if(!O(e))return s(1);const n=e.getBoundingClientRect(),{width:o,height:i,$:l}=$(e);let c=(l?r(n.width):n.width)/o,a=(l?r(n.height):n.height)/i;return c&&Number.isFinite(c)||(c=1),a&&Number.isFinite(a)||(a=1),{x:c,y:a}}const U=s(0);function Q(t){const e=A(t);return M()&&e.visualViewport?{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}:U}function X(t,e,n,o){void 0===e&&(e=!1),void 0===n&&(n=!1);const i=t.getBoundingClientRect(),r=_(t);let l=s(1);e&&(o?C(o)&&(l=I(o)):l=I(t));const c=function(t,e,n){return void 0===e&&(e=!1),!(!n||e&&n!==A(t))&&e}(r,n,o)?Q(r):s(0);let a=(i.left+c.x)/l.x,f=(i.top+c.y)/l.y,u=i.width/l.x,d=i.height/l.y;if(r){const t=A(r),e=o&&C(o)?A(o):o;let n=t,i=z(n);for(;i&&o&&e!==n;){const t=I(i),e=i.getBoundingClientRect(),o=N(i),r=e.left+(i.clientLeft+parseFloat(o.paddingLeft))*t.x,l=e.top+(i.clientTop+parseFloat(o.paddingTop))*t.y;a*=t.x,f*=t.y,u*=t.x,d*=t.y,a+=r,f+=l,n=A(i),i=z(n)}}return w({width:u,height:d,x:a,y:f})}function Y(t,e){const n=W(t).scrollLeft;return e?e.left+n:X(E(t)).left+n}function J(t,e,n){void 0===n&&(n=!1);const o=t.getBoundingClientRect();return{x:o.left+e.scrollLeft-(n?0:Y(t,o)),y:o.top+e.scrollTop}}function G(t,e,n){let o;if("viewport"===e)o=function(t,e){const n=A(t),o=E(t),i=n.visualViewport;let r=o.clientWidth,l=o.clientHeight,s=0,c=0;if(i){r=i.width,l=i.height;const t=M();(!t||t&&"fixed"===e)&&(s=i.offsetLeft,c=i.offsetTop)}return{width:r,height:l,x:s,y:c}}(t,n);else if("document"===e)o=function(t){const e=E(t),n=W(t),o=t.ownerDocument.body,r=i(e.scrollWidth,e.clientWidth,o.scrollWidth,o.clientWidth),l=i(e.scrollHeight,e.clientHeight,o.scrollHeight,o.clientHeight);let s=-n.scrollLeft+Y(t);const c=-n.scrollTop;return"rtl"===N(o).direction&&(s+=i(e.clientWidth,o.clientWidth)-r),{width:r,height:l,x:s,y:c}}(E(t));else if(C(e))o=function(t,e){const n=X(t,!0,"fixed"===e),o=n.top+t.clientTop,i=n.left+t.clientLeft,r=O(t)?I(t):s(1);return{width:t.clientWidth*r.x,height:t.clientHeight*r.y,x:i*r.x,y:o*r.y}}(e,n);else{const n=Q(t);o={x:e.x-n.x,y:e.y-n.y,width:e.width,height:e.height}}return w(o)}function K(t,e){const n=V(t);return!(n===e||!C(n)||B(n))&&("fixed"===N(n).position||K(n,e))}function Z(t,e,n){const o=O(e),i=E(e),r="fixed"===n,l=X(t,!0,r,e);let c={scrollLeft:0,scrollTop:0};const a=s(0);if(o||!o&&!r)if(("body"!==R(e)||k(i))&&(c=W(e)),o){const t=X(e,!0,r,e);a.x=t.x+e.clientLeft,a.y=t.y+e.clientTop}else i&&(a.x=Y(i));const f=!i||o||r?s(0):J(i,c);return{x:l.left+c.scrollLeft-a.x-f.x,y:l.top+c.scrollTop-a.y-f.y,width:l.width,height:l.height}}function tt(t){return"static"===N(t).position}function et(t,e){if(!O(t)||"fixed"===N(t).position)return null;if(e)return e(t);let n=t.offsetParent;return E(t)===n&&(n=n.ownerDocument.body),n}function nt(t,e){const n=A(t);if(P(t))return n;if(!O(t)){let e=V(t);for(;e&&!B(e);){if(C(e)&&!tt(e))return e;e=V(e)}return n}let o=et(t,e);for(;o&&H(o)&&tt(o);)o=et(o,e);return o&&B(o)&&tt(o)&&!F(o)?n:o||function(t){let e=V(t);for(;O(e)&&!B(e);){if(F(e))return e;if(P(e))return null;e=V(e)}return null}(t)||n}const ot={convertOffsetParentRelativeRectToViewportRelativeRect:function(t){let{elements:e,rect:n,offsetParent:o,strategy:i}=t;const r="fixed"===i,l=E(o),c=!!e&&P(e.floating);if(o===l||c&&r)return n;let a={scrollLeft:0,scrollTop:0},f=s(1);const u=s(0),d=O(o);if((d||!d&&!r)&&(("body"!==R(o)||k(l))&&(a=W(o)),O(o))){const t=X(o);f=I(o),u.x=t.x+o.clientLeft,u.y=t.y+o.clientTop}const p=!l||d||r?s(0):J(l,a,!0);return{width:n.width*f.x,height:n.height*f.y,x:n.x*f.x-a.scrollLeft*f.x+u.x+p.x,y:n.y*f.y-a.scrollTop*f.y+u.y+p.y}},getDocumentElement:E,getClippingRect:function(t){let{element:e,boundary:n,rootBoundary:r,strategy:l}=t;const s=[..."clippingAncestors"===n?P(e)?[]:function(t,e){const n=e.get(t);if(n)return n;let o=q(t,[],!1).filter((t=>C(t)&&"body"!==R(t))),i=null;const r="fixed"===N(t).position;let l=r?V(t):t;for(;C(l)&&!B(l);){const e=N(l),n=F(l);n||"fixed"!==e.position||(i=null),(r?!n&&!i:!n&&"static"===e.position&&i&&["absolute","fixed"].includes(i.position)||k(l)&&!n&&K(t,l))?o=o.filter((t=>t!==l)):i=e,l=V(l)}return e.set(t,o),o}(e,this._c):[].concat(n),r],c=s[0],a=s.reduce(((t,n)=>{const r=G(e,n,l);return t.top=i(r.top,t.top),t.right=o(r.right,t.right),t.bottom=o(r.bottom,t.bottom),t.left=i(r.left,t.left),t}),G(e,c,l));return{width:a.right-a.left,height:a.bottom-a.top,x:a.left,y:a.top}},getOffsetParent:nt,getElementRects:async function(t){const e=this.getOffsetParent||nt,n=this.getDimensions,o=await n(t.floating);return{reference:Z(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:o.width,height:o.height}}},getClientRects:function(t){return Array.from(t.getClientRects())},getDimensions:function(t){const{width:e,height:n}=$(t);return{width:e,height:n}},getScale:I,isElement:C,isRTL:function(t){return"rtl"===N(t).direction}};function it(t,e,n,r){void 0===r&&(r={});const{ancestorScroll:s=!0,ancestorResize:c=!0,elementResize:a="function"==typeof ResizeObserver,layoutShift:f="function"==typeof IntersectionObserver,animationFrame:u=!1}=r,d=_(t),p=s||c?[...d?q(d):[],...q(e)]:[];p.forEach((t=>{s&&t.addEventListener("scroll",n,{passive:!0}),c&&t.addEventListener("resize",n)}));const h=d&&f?function(t,e){let n,r=null;const s=E(t);function c(){var t;clearTimeout(n),null==(t=r)||t.disconnect(),r=null}return function a(f,u){void 0===f&&(f=!1),void 0===u&&(u=1),c();const{left:d,top:p,width:h,height:m}=t.getBoundingClientRect();if(f||e(),!h||!m)return;const g={rootMargin:-l(p)+"px "+-l(s.clientWidth-(d+h))+"px "+-l(s.clientHeight-(p+m))+"px "+-l(d)+"px",threshold:i(0,o(1,u))||1};let y=!0;function x(t){const e=t[0].intersectionRatio;if(e!==u){if(!y)return a();e?a(!1,e):n=setTimeout((()=>{a(!1,1e-7)}),1e3)}y=!1}try{r=new IntersectionObserver(x,{...g,root:s.ownerDocument})}catch(t){r=new IntersectionObserver(x,g)}r.observe(t)}(!0),c}(d,n):null;let m,g=-1,y=null;a&&(y=new ResizeObserver((t=>{let[o]=t;o&&o.target===d&&y&&(y.unobserve(e),cancelAnimationFrame(g),g=requestAnimationFrame((()=>{var t;null==(t=y)||t.observe(e)}))),n()})),d&&!u&&y.observe(d),y.observe(e));let x=u?X(t):null;return u&&function e(){const o=X(t);!x||o.x===x.x&&o.y===x.y&&o.width===x.width&&o.height===x.height||n();x=o,m=requestAnimationFrame(e)}(),n(),()=>{var t;p.forEach((t=>{s&&t.removeEventListener("scroll",n),c&&t.removeEventListener("resize",n)})),null==h||h(),null==(t=y)||t.disconnect(),y=null,u&&cancelAnimationFrame(m)}}const rt=function(t){return void 0===t&&(t=0),{name:"offset",options:t,async fn(e){var n,o;const{x:i,y:r,placement:l,middlewareData:s}=e,c=await async function(t,e){const{placement:n,platform:o,elements:i}=t,r=await(null==o.isRTL?void 0:o.isRTL(i.floating)),l=d(n),s=p(n),c="y"===g(n),a=["left","top"].includes(l)?-1:1,f=r&&c?-1:1,h=u(e,t);let{mainAxis:m,crossAxis:y,alignmentAxis:x}="number"==typeof h?{mainAxis:h,crossAxis:0,alignmentAxis:null}:{mainAxis:h.mainAxis||0,crossAxis:h.crossAxis||0,alignmentAxis:h.alignmentAxis};return s&&"number"==typeof x&&(y="end"===s?-1*x:x),c?{x:y*f,y:m*a}:{x:m*a,y:y*f}}(e,t);return l===(null==(n=s.offset)?void 0:n.placement)&&null!=(o=s.arrow)&&o.alignmentOffset?{}:{x:i+c.x,y:r+c.y,data:{...c,placement:l}}}}},lt=function(t){return void 0===t&&(t={}),{name:"shift",options:t,async fn(e){const{x:n,y:o,placement:i}=e,{mainAxis:r=!0,crossAxis:l=!1,limiter:s={fn:t=>{let{x:e,y:n}=t;return{x:e,y:n}}},...c}=u(t,e),a={x:n,y:o},p=await T(e,c),m=g(d(i)),y=h(m);let x=a[y],v=a[m];if(r){const t="y"===y?"bottom":"right";x=f(x+p["y"===y?"top":"left"],x,x-p[t])}if(l){const t="y"===m?"bottom":"right";v=f(v+p["y"===m?"top":"left"],v,v-p[t])}const w=s.fn({...e,[y]:x,[m]:v});return{...w,data:{x:w.x-n,y:w.y-o,enabled:{[y]:r,[m]:l}}}}}},st=function(t){return void 0===t&&(t={}),{name:"flip",options:t,async fn(e){var n,o;const{placement:i,middlewareData:r,rects:l,initialPlacement:s,platform:c,elements:a}=e,{mainAxis:f=!0,crossAxis:h=!0,fallbackPlacements:w,fallbackStrategy:b="bestFit",fallbackAxisSideDirection:L="none",flipAlignment:R=!0,...A}=u(t,e);if(null!=(n=r.arrow)&&n.alignmentOffset)return{};const E=d(i),S=g(s),C=d(s)===s,O=await(null==c.isRTL?void 0:c.isRTL(a.floating)),D=w||(C||!R?[v(s)]:function(t){const e=v(t);return[x(t),e,x(e)]}(s)),k="none"!==L;!w&&k&&D.push(...function(t,e,n,o){const i=p(t);let r=function(t,e,n){const o=["left","right"],i=["right","left"],r=["top","bottom"],l=["bottom","top"];switch(t){case"top":case"bottom":return n?e?i:o:e?o:i;case"left":case"right":return e?r:l;default:return[]}}(d(t),"start"===n,o);return i&&(r=r.map((t=>t+"-"+i)),e&&(r=r.concat(r.map(x)))),r}(s,R,L,O));const H=[s,...D],P=await T(e,A),F=[];let M=(null==(o=r.flip)?void 0:o.overflows)||[];if(f&&F.push(P[E]),h){const t=function(t,e,n){void 0===n&&(n=!1);const o=p(t),i=y(t),r=m(i);let l="x"===i?o===(n?"end":"start")?"right":"left":"start"===o?"bottom":"top";return e.reference[r]>e.floating[r]&&(l=v(l)),[l,v(l)]}(i,l,O);F.push(P[t[0]],P[t[1]])}if(M=[...M,{placement:i,overflows:F}],!F.every((t=>t<=0))){var B,N;const t=((null==(B=r.flip)?void 0:B.index)||0)+1,e=H[t];if(e)return{data:{index:t,overflows:M},reset:{placement:e}};let n=null==(N=M.filter((t=>t.overflows[0]<=0)).sort(((t,e)=>t.overflows[1]-e.overflows[1]))[0])?void 0:N.placement;if(!n)switch(b){case"bestFit":{var W;const t=null==(W=M.filter((t=>{if(k){const e=g(t.placement);return e===S||"y"===e}return!0})).map((t=>[t.placement,t.overflows.filter((t=>t>0)).reduce(((t,e)=>t+e),0)])).sort(((t,e)=>t[1]-e[1]))[0])?void 0:W[0];t&&(n=t);break}case"initialPlacement":n=s}if(i!==n)return{reset:{placement:n}}}return{}}}},ct=function(t){return void 0===t&&(t={}),{options:t,fn(e){const{x:n,y:o,placement:i,rects:r,middlewareData:l}=e,{offset:s=0,mainAxis:c=!0,crossAxis:a=!0}=u(t,e),f={x:n,y:o},p=g(i),m=h(p);let y=f[m],x=f[p];const v=u(s,e),w="number"==typeof v?{mainAxis:v,crossAxis:0}:{mainAxis:0,crossAxis:0,...v};if(c){const t="y"===m?"height":"width",e=r.reference[m]-r.floating[t]+w.mainAxis,n=r.reference[m]+r.reference[t]-w.mainAxis;y<e?y=e:y>n&&(y=n)}if(a){var b,T;const t="y"===m?"width":"height",e=["top","left"].includes(d(i)),n=r.reference[p]-r.floating[t]+(e&&(null==(b=l.offset)?void 0:b[p])||0)+(e?0:w.crossAxis),o=r.reference[p]+r.reference[t]+(e?0:(null==(T=l.offset)?void 0:T[p])||0)-(e?w.crossAxis:0);x<n?x=n:x>o&&(x=o)}return{[m]:y,[p]:x}}}},at=(t,e,n)=>{const o=new Map,i={platform:ot,...n},r={...i.platform,_c:o};return(async(t,e,n)=>{const{placement:o="bottom",strategy:i="absolute",middleware:r=[],platform:l}=n,s=r.filter(Boolean),c=await(null==l.isRTL?void 0:l.isRTL(e));let a=await l.getElementRects({reference:t,floating:e,strategy:i}),{x:f,y:u}=b(a,o,c),d=o,p={},h=0;for(let n=0;n<s.length;n++){const{name:r,fn:m}=s[n],{x:g,y:y,data:x,reset:v}=await m({x:f,y:u,initialPlacement:o,placement:d,strategy:i,middlewareData:p,rects:a,platform:l,elements:{reference:t,floating:e}});f=null!=g?g:f,u=null!=y?y:u,p={...p,[r]:{...p[r],...x}},v&&h<=50&&(h++,"object"==typeof v&&(v.placement&&(d=v.placement),v.rects&&(a=!0===v.rects?await l.getElementRects({reference:t,floating:e,strategy:i}):v.rects),({x:f,y:u}=b(a,d,c))),n=-1)}return{x:f,y:u,placement:d,strategy:i,middlewareData:p}})(t,e,{...i,platform:r})},ft=t=>void 0===t,ut=t=>"string"==typeof t;let dt;const pt=(t,e={})=>{let{msg:o="",delay:i=150,content:r,direction:l="top",className:s=[],tipHoverable:c=!0,onShow:a,appendTo:f=document.body}=Object.assign({},n,e);var u;if(ut(s)&&(u=s.split(" "),s=Array.isArray(u)?u||[]:[u]),o||r||a){const d=document.createElement("div");d.classList.add("toolbar-tip__tooltip","hidden","transparent",...s);const p=t=>{d.innerHTML="";for(const e of t.split("\n")){const t=document.createElement("div");t.textContent=e,d.appendChild(t)}},h=()=>{if(r&&d.appendChild(r),o&&p(o),a){const e=a(t);if(ut(e))p(e);else{if(!e)return!1;d.appendChild(e)}}return Boolean(r||o||a)};let m,g;const y=()=>{at(t,d,{placement:l,middleware:[st(),lt({limiter:ct()}),rt(8)]}).then((({x:t,y:e})=>{Object.assign(d.style,{left:`${t}px`,top:`${e}px`})}))},x=()=>{d.classList.add("hidden"),d.remove(),g&&g()};function v(){m&&clearTimeout(m),m=setTimeout((()=>{h()&&(dt||(dt=document.createElement("div"),f.appendChild(dt)),dt.appendChild(d),d.removeEventListener("transitionend",x),d.classList.remove("hidden"),g=it(t,d,y),d.classList.remove("transparent"))}),i)}function w(){m&&clearTimeout(m),m=setTimeout((()=>{d.classList.add("transparent"),((t,e,n,o)=>{t.addEventListener("transitionend",n,o),setTimeout((()=>{n()}),e)})(d,150,x,{once:!0})}),i)}const b=[t];c&&b.push(d);for(const L of b)L.addEventListener("mouseenter",v),L.addEventListener("mouseleave",w);const T=()=>{for(const t of b)t.removeEventListener("mouseenter",v),t.removeEventListener("mouseleave",w);g&&g(),d.remove(),dt.children.length<=0&&dt.remove()};return{instance:d,destroy:T,show:v,hide:w}}return null};class ht{quill;static moduleName="toolbar-tip";options;toolbar;toolbarTips=[];constructor(t,e){if(this.quill=t,!e.tipTextMap)throw new Error("Please provide the tip text");if(this.options=this.resolveOptions(e),this.toolbar=this.quill.getModule("toolbar"),!this.toolbar)throw new Error("Please provide the toolbar");!this.toolbar||this.toolbar.controls.length<=0?console.warn("Toolbar is not available or has no controls"):this.createToolbarTip()}resolveOptions(t){return{defaultTooltipOptions:Object.assign({},n,t.defaultTooltipOptions),tipTextMap:t.tipTextMap||{}}}createToolbarTip(){for(const t of this.toolbar.controls){const e=t;let[n,o]=e;const i=this.options.tipTextMap[n];o.value&&(n=`${n}:${o.value}`);let r=this.options.tipTextMap[n];ut(r)&&(r={msg:r});const l=this.getControlLabel(e);if(!l||ft(r)&&ft(i))continue;const s=pt(l,{...this.options.defaultTooltipOptions,...r,onShow(t){let e=o.value;i&&!ut(i)&&i.onShow&&(e=i.onShow(t,o.value));let n=null;return r&&(n=r.onShow?r.onShow(t,o.value):r.content||r.msg),n||e},appendTo:this.quill.container});s&&this.toolbarTips.push([n,s])}}getControlLabel([t,e]){return"button"===e.tagName.toLowerCase()?e:e.previousElementSibling}destroyAllTips(){const t=this.toolbarTips;if(0!==t.length)for(const[,e]of t)e.destroy()}hideAllTips(){const t=this.toolbarTips;if(0!==t.length)for(const[,e]of t)e.hide()}}t.QuillToolbarTip=ht,t.default=ht,t.defaultToolbarTip=e,Object.defineProperty(t,"__esModule",{value:!0})}));
//# sourceMappingURL=dev.js.map
