import * as Types from './types';
import Parent from './Parent';
import Animation from './Animation';
import Noise from './Noise';

export class Grained {
  private readonly $parent: HTMLElement | null;

  private readonly selector!: string;

  private readonly options!: Types.Options;

  private defaultOptions: Types.Options = {
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

  constructor(selector = '', opt = {}) {
    this.$parent = document.querySelector(selector);

    if (!this.$parent) {
      // если элемент отсутсвует, то заканчиваем выполнение
      console.error(`Grained: cannot find the element with selector ${selector}`);
      return;
    }

    this.selector = this.getCSSSelector(); // селектор элемента
    this.options = opt && typeof opt === 'object' ? { ...this.defaultOptions, ...opt } : this.defaultOptions;

    Parent.addStyles(this.$parent);
    Animation.add();
    Noise.add(this.selector, this.options);
  }

  private getCSSSelector(): string {
    if (this.$parent === null) return '';

    const tag = this.$parent.tagName.toLowerCase();
    const { id } = this.$parent;
    const cssClass = this.$parent.className.split(' ').join('.');

    return `${tag}${id ? `#${id}` : ''}${cssClass ? `.${cssClass}` : ''}`;
  }
}

export default Grained;
