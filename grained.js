/*! Grained.js
* Author : Sarath Saleem  - https://github.com/sarathsaleem
* MIT license: http://opensource.org/licenses/MIT
* GitHub : https://github.com/sarathsaleem/grained
* v0.0.1
*/
/**
 *
 * @param { HTMLElement } elm HTML элемент
 * @param {
 * { animate: Boolean,
    patternWidth: Number,
    patternHeight: Number,
    grainOpacity: Number,
    grainDensity: Number,
    grainWidth: Number,
    grainHeight: Number,
    grainChaos: Number,
    grainSpeed: Number}
    } opt Опции
 */
function grained(elm, opt) {
  const element = elm;
  let elementId = undefined;
  let elementClass = undefined;
  let selectorElement = undefined;

  // if (typeof ele === 'string') {
  //   element = document.getElementById(ele.split('#')[1]);
  // }

  if (!element) {
    console.error(`Grained: cannot find the element with id ${elm}`);
    return;
  }

  if (element.id) {
    elementId = element.id;
  } else {
    elementClass = element.className.split(' ').join('-');
  }

  // set style for parent
  const checkPosition = (el) => {
    // TODO: Проверить 'inherit' и другие значения + сделать через интерации
    if (el.style.position === 'unset' || el.style.position === 'static') {
      return true;
    }

    const cssPos = getComputedStyle(el).getPropertyValue('position');
    if (cssPos === 'static' || cssPos === 'unset') {
      return true;
    }

    return false;
  };

  if (checkPosition(element)) {
    element.style.position = 'relative';
  }

  element.style.overflow = 'hidden';

  // TODO: Нужны ли префиксы сейчас?
  // const prefixes = ['', '-moz-', '-o-animation-', '-webkit-', '-ms-'];
  const prefixes = [''];

  // default option values
  let options = {
    animate: true,
    patternWidth: 100,
    patternHeight: 100,
    grainOpacity: 0.1,
    grainDensity: 1,
    grainWidth: 1,
    grainHeight: 1,
    grainChaos: 0.5,
    grainSpeed: 20,
  };

  // TODO: Нужно проверить
  if (opt && typeof opt === 'object') {
    options = { ...options, ...opt };
  }

  // Object.keys(opt).forEach((key) => {
  //   options[key] = opt[key];
  // });

  const generateNoise = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = options.patternWidth;
    canvas.height = options.patternHeight;

    for (let width = 0; width < options.patternWidth; width += options.grainDensity) {
      for (let height = 0; height < options.patternHeight; height += options.grainDensity) {
        const rgb = Math.random() * 256 | 0;
        ctx.fillStyle = `rgba(${[rgb, rgb, rgb, options.grainOpacity].join()})`;
        ctx.fillRect(width, height, options.grainWidth, options.grainHeight);
      }
    }

    return canvas.toDataURL('image/png');
  };

  function addCSSRule(sheet, selector, rules, index) {
    let ins = '';
    if (selector.length) {
      ins = `${selector}{${rules}}`;
    } else {
      ins = rules;
    }

    if ('insertRule' in sheet) {
      sheet.insertRule(ins, index);
    } else if ('addRule' in sheet) {
      sheet.addRule(selector, rules, index);
    }
  }

  const noise = generateNoise();

  let animation = '';
  const keyFrames = ['0%:-10%,10%', '10%:-25%,0%', '20%:-30%,10%', '30%:-30%,30%', '40%::-20%,20%', '50%:-15%,10%', '60%:-20%,20%', '70%:-5%,20%', '80%:-25%,5%', '90%:-30%,25%', '100%:-10%,10%'];

  let pre = prefixes.length;
  while (pre--) {
    animation += `@${prefixes[pre]}keyframes grained{`;
    for (let key = 0; key < keyFrames.length; key++) {
      const keyVal = keyFrames[key].split(':');
      animation += `${keyVal[0]}{`;
      animation += `${prefixes[pre]}transform:translate(${keyVal[1]});`;
      animation += '}';
    }
    animation += '}';
  }

  // add animation keyframe
  const animationAdded = document.getElementById('grained-animation');
  if (animationAdded) {
    animationAdded.parentElement.removeChild(animationAdded);
  }
  let style = document.createElement('style');
  // style.type = 'text/css';
  style.id = 'grained-animation';
  style.innerHTML = animation;
  document.body.appendChild(style);

  // add custimozed style
  let styleAdded = undefined;
  if (elementId) {
    styleAdded = document.querySelector(`#grained-animation-${elementId}`);
  } else {
    styleAdded = document.querySelector(`.grained-animation-${elementClass}`);
  }

  if (styleAdded) {
    styleAdded.parentElement.removeChild(styleAdded);
  }

  style = document.createElement('style');
  // style.type = 'text/css';
  style.id = `grained-animation-${elementId || elementClass}`;
  document.body.appendChild(style);

  let rule = `background-image: url(${noise});`;
  rule += 'position: absolute;content: "";height: 300%;width: 300%;left: -100%;top: -100%;';
  pre = prefixes.length;
  if (options.animate) {
    while (pre--) {
      rule += `${prefixes[pre]}animation-name:grained;`;
      rule += `${prefixes[pre]}animation-iteration-count: infinite;`;
      rule += `${prefixes[pre]}animation-duration: ${options.grainChaos}s;`;
      rule += `${prefixes[pre]}animation-timing-function: steps(${options.grainSpeed}, end);`;
    }
  }

  // selecter element to add grains
  if (elementId) {
    selectorElement = `#${elementId}::before`;
  } else {
    selectorElement = `.${elementClass}::before`;
  }

  addCSSRule(style.sheet, selectorElement, rule);
// END
}

export default grained;
