/*! Grained.js
* Author : Sarath Saleem  - https://github.com/sarathsaleem
* MIT license: http://opensource.org/licenses/MIT
* GitHub : https://github.com/sarathsaleem/grained
* v0.0.1
*/

import Parent from './Parent';
import Animation from './Animation';
import Noise from './Noise';

/**
 *
 * @param { string } elmSelector - css селектор
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
    } opt - Опции
 */

class Grained {
  constructor(selector = '', opt = {}) {
    this.$parent = document.querySelector(selector); // элемент
    if (!this.$parent) {
      // если элемент отсутсвует, то заканчиваем выполнение
      console.error(`Grained: cannot find the element with selector ${selector}`);
      return;
    }
    this.selector = this._getCSSSelector(); // css селектор элемента
    this.options = undefined;
    this._setOptions(opt);

    Parent.addStyles(this.$parent);
    Animation.add();
    Noise.add(this.selector, this.options);
  }

  set _setOptions(options) {
    const defaultOptions = {
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

    this.options = options && typeof options === 'object' ? { ...defaultOptions, ...options } : defaultOptions;
  }

  _getCSSSelector() {
    const tag = this.$parent.tagName.toLowerCase();
    const { id } = this.$parent;
    const cssClass = this.$parent.className.split(' ').join('.');

    return `${tag}${id ? `#${id}` : ''}${cssClass ? `.${cssClass}` : ''}`;
  }
}

export default Grained;
