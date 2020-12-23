!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).grained=e()}(this,(function(){"use strict";class t{static createKeyframes(t){let e="";return t.forEach((({step:t,translate:n})=>{e+=`${t} { transform: translate(${n}); }`})),`@keyframes grained {${e}}`}static create(){const t=document.createElement("style");t.id="grained-animation",t.dataset.grainedAnimation="",t.innerHTML=this.createKeyframes(this.keyFrames),document.body.appendChild(t)}static add(){document.querySelector("[data-grained-animation]")||this.create()}}t.keyFrames=[{step:"0%",translate:"-10%,10%"},{step:"10%",translate:"-25%,0%"},{step:"20%",translate:"-30%,10%"},{step:"30%",translate:"-30%,30%"},{step:"40%",translate:":-20%,20%"},{step:"50%",translate:"-15%,10%"},{step:"60%",translate:"-20%,20%"},{step:"70%",translate:"-5%,20%"},{step:"80%",translate:"-25%,5%"},{step:"90%",translate:"-30%,25%"},{step:"100%",translate:"-10%,10%"}];class e{constructor(e="",n={}){this.defaultOptions={animate:!0,patternWidth:100,patternHeight:100,grainOpacity:.1,grainDensity:1,grainWidth:1,grainHeight:1,grainChaos:.5,grainSpeed:20},this.$parent=document.querySelector(e),this.$parent?(this.selector=this.getCSSSelector(),this.options=n&&"object"==typeof n?Object.assign(Object.assign({},this.defaultOptions),n):this.defaultOptions,class{static shouldSetPosition(t){const e=["absolute","fixed","relative","sticky"],n=t=>!e.some((e=>e===t));return n(t.style.position)&&n(getComputedStyle(t).getPropertyValue("position"))}static addStyles(t){this.shouldSetPosition(t)&&(t.style.position="relative"),t.style.overflow="hidden"}}.addStyles(this.$parent),t.add(),class{static getRule(t,e,n,a){return`\n      content: "";\n      position: absolute;\n      top: -100%;\n      left: -100%;\n      width: 300%;\n      height: 300%;\n      background-image: url(${t});\n      ${e&&`animation-name:grained;\n      animation-iteration-count: infinite;\n      animation-duration: ${n}s;\n      animation-timing-function: steps(${a}, end);`}\n    `}static generateNoise(t){const e=document.createElement("canvas"),n=e.getContext("2d");if(null===n)return"";e.width=t.patternWidth,e.height=t.patternHeight;for(let e=0;e<t.patternWidth;e+=t.grainDensity)for(let a=0;a<t.patternHeight;a+=t.grainDensity){const i=Math.floor(256*Math.random());n.fillStyle=`rgba(${[i,i,i,t.grainOpacity].join()})`,n.fillRect(e,a,t.grainWidth,t.grainHeight)}return e.toDataURL("image/png")}static addCSSRule(t,e,n){let a;a=e.length?`${e}{${n}}`:n,t.insertRule(a)}static isExist(t){const e=document.querySelector(`#grained-animation__${t}`);e&&e.parentElement&&e.parentElement.removeChild(e)}static createStyle(t){const e=document.createElement("style");return e.id=`grained-animation__${t}`,document.body.appendChild(e),e}static add(t,e){this.isExist(t);const n=this.createStyle(t).sheet,a=this.getRule(this.generateNoise(e),e.animate,e.grainChaos,e.grainSpeed);this.addCSSRule(n,`${t}::before`,a)}}.add(this.selector,this.options)):console.error(`Grained: cannot find the element with selector ${e}`)}getCSSSelector(){if(null===this.$parent)return"";const t=this.$parent.tagName.toLowerCase(),{id:e}=this.$parent,n=this.$parent.className.split(" ").join(".");return`${t}${e?`#${e}`:""}${n?`.${n}`:""}`}}return(t,n)=>{new e(t,n)}}));
//# sourceMappingURL=grained.js.map
