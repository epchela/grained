var t,e;(t=window.document).getElementById("livereloadscript")||((e=t.createElement("script")).async=1,e.src="//"+(window.location.host||"localhost").split(":")[0]+":35729/livereload.js?snipver=1",e.id="livereloadscript",t.getElementsByTagName("head")[0].appendChild(e));class a{static createKeyframes(t){let e="";return t.forEach((({step:t,translate:a})=>{e+=`${t} { transform: translate(${a}); }`})),`@keyframes grained {${e}}`}static create(){const t=document.createElement("style");t.id="grained-animation",t.dataset.grainedAnimation="",t.innerHTML=this.createKeyframes(this.keyFrames),document.body.appendChild(t)}static add(){document.querySelector("[data-grained-animation]")||this.create()}}a.keyFrames=[{step:"0%",translate:"-10%,10%"},{step:"10%",translate:"-25%,0%"},{step:"20%",translate:"-30%,10%"},{step:"30%",translate:"-30%,30%"},{step:"40%",translate:":-20%,20%"},{step:"50%",translate:"-15%,10%"},{step:"60%",translate:"-20%,20%"},{step:"70%",translate:"-5%,20%"},{step:"80%",translate:"-25%,5%"},{step:"90%",translate:"-30%,25%"},{step:"100%",translate:"-10%,10%"}];class n{constructor(t="",e={}){this.defaultOptions={animate:!0,patternWidth:100,patternHeight:100,grainOpacity:.1,grainDensity:1,grainWidth:1,grainHeight:1,grainChaos:.5,grainSpeed:20},this.$parent=document.querySelector(t),this.$parent?(this.selector=this.getCSSSelector(),this.options=e&&"object"==typeof e?Object.assign(Object.assign({},this.defaultOptions),e):this.defaultOptions,class{static shouldSetPosition(t){const e=["absolute","fixed","relative","sticky"],a=t=>!e.some((e=>e===t));return a(t.style.position)&&a(getComputedStyle(t).getPropertyValue("position"))}static addStyles(t){this.shouldSetPosition(t)&&(t.style.position="relative"),t.style.overflow="hidden"}}.addStyles(this.$parent),a.add(),class{static getRule(t,e,a,n){return`\n      content: "";\n      position: absolute;\n      top: -100%;\n      left: -100%;\n      width: 300%;\n      height: 300%;\n      background-image: url(${t});\n      ${e&&`animation-name:grained;\n      animation-iteration-count: infinite;\n      animation-duration: ${a}s;\n      animation-timing-function: steps(${n}, end);`}\n    `}static generateNoise(t){const e=document.createElement("canvas"),a=e.getContext("2d");if(null===a)return"";e.width=t.patternWidth,e.height=t.patternHeight;for(let e=0;e<t.patternWidth;e+=t.grainDensity)for(let n=0;n<t.patternHeight;n+=t.grainDensity){const i=Math.floor(256*Math.random());a.fillStyle=`rgba(${[i,i,i,t.grainOpacity].join()})`,a.fillRect(e,n,t.grainWidth,t.grainHeight)}return e.toDataURL("image/png")}static addCSSRule(t,e,a){let n;n=e.length?`${e}{${a}}`:a,t.insertRule(n)}static isExist(t){const e=document.querySelector(`#grained-animation__${t}`);e&&e.parentElement&&e.parentElement.removeChild(e)}static createStyle(t){const e=document.createElement("style");return e.id=`grained-animation__${t}`,document.body.appendChild(e),e}static add(t,e){this.isExist(t);const a=this.createStyle(t).sheet,n=this.getRule(this.generateNoise(e),e.animate,e.grainChaos,e.grainSpeed);this.addCSSRule(a,`${t}::before`,n)}}.add(this.selector,this.options)):console.error(`Grained: cannot find the element with selector ${t}`)}getCSSSelector(){if(null===this.$parent)return"";const t=this.$parent.tagName.toLowerCase(),{id:e}=this.$parent,a=this.$parent.className.split(" ").join(".");return`${t}${e?`#${e}`:""}${a?`.${a}`:""}`}}export default(t,e)=>{new n(t,e)};
//# sourceMappingURL=grained.esm.js.map
