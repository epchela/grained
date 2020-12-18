/*! Grained.js
* Author : Sarath Saleem  - https://github.com/sarathsaleem
* MIT license: http://opensource.org/licenses/MIT
* GitHub : https://github.com/sarathsaleem/grained
* v0.0.1
*/

// eslint-disable-next-line max-classes-per-file
class ParentStyle {
  // ### СТИЛИ ДЛЯ РОДИТЕЛЯ ### //
  // проверяем какое значение у position, если оно есть
  static shouldSetPosition(parentElm) {
    const forbidden = ['absolute', 'fixed', 'relative', 'sticky'];
    const isAllow = (val) => !forbidden.some((pos) => pos === val);
    const getCssPosition = () => getComputedStyle(parentElm).getPropertyValue('position');

    return isAllow(parentElm.style.position) && isAllow(getCssPosition());
  }

  // Задаем базовые стили для элемента
  static addStyles(parentElm) {
    // если position не задано, то задаем
    if (this.shouldSetPosition(parentElm)) {
      // eslint-disable-next-line no-param-reassign
      parentElm.style.position = 'relative';
    }

    // eslint-disable-next-line no-param-reassign
    parentElm.style.overflow = 'hidden';
  }
}

class Animation {
  static get keyFrames() {
    return [
      {
        step: '0%',
        translate: '-10%,10%',
      },
      {
        step: '10%',
        translate: '-25%,0%',
      },
      {
        step: '20%',
        translate: '-30%,10%',
      },
      {
        step: '30%',
        translate: '-30%,30%',
      },
      {
        step: '40%',
        translate: ':-20%,20%',
      },
      {
        step: '50%',
        translate: '-15%,10%',
      },
      {
        step: '60%',
        translate: '-20%,20%',
      },
      {
        step: '70%',
        translate: '-5%,20%',
      },
      {
        step: '80%',
        translate: '-25%,5%',
      },
      {
        step: '90%',
        translate: '-30%,25%',
      },
      {
        step: '100%',
        translate: '-10%,10%',
      },
    ];
  }

  /**
   * Создаем css keyframe
   * @param { [{step: string, translate: string}] } frames - Список "шагов" со значениями translate
   * @returns {string}
   */
  static createKeyframes(frames) {
    let steps = '';

    frames.forEach(({ step, translate }) => {
      steps += `${step} { transform: translate(${translate}); }`;
    });

    return `@keyframes grained {${steps}}`;
  }

  static create() {
    // Добавляем элемент style в документ
    const style = document.createElement('style');
    style.id = 'grained-animation';
    style.dataset.grainedAnimation = '';
    style.innerHTML = this.createKeyframes(this.keyFrames);
    document.body.appendChild(style);
  }

  static add() {
    // Сама анимация не меняется - она всегда одинаковая.
    // Так что не вижу смысла удалять элемент, если он уже есть.
    // Лучше добавить data-атрибут, чтобы было понятно что это не пользователь создал
    const isExist = document.querySelector('[data-grained-animation]');
    if (!isExist) {
      this.create();
    }
  }
}

class Noise {
  static getRule(noiseImg, grainChaos, grainSpeed) {
    return `
      content: "";
      position: absolute;
      top: -100%;
      left: -100%;
      width: 300%;
      height: 300%;
      background-image: url(${noiseImg});
      animation-name:grained;
      animation-iteration-count: infinite;
      animation-duration: ${grainChaos}s;
      animation-timing-function: steps(${grainSpeed}, end);
    `;
  }

  /**
   * Генерирует изображение с "шумом" из канваса
   * @returns {string} - base64 png изображение
   */
  static generateNoise(options) {
    const canvas = document.createElement('canvas'); // создаем элемент
    const ctx = canvas.getContext('2d'); // задаем контекст

    canvas.width = options.patternWidth; // задаем размер
    canvas.height = options.patternHeight; // задаем размер

    // ~~~***~~~
    // ОПИСАНИЕ ИТЕРАЦИИ
    // Общее - генерируется цвет и добавляется "нойз" (задаем цвет и рисуем прямоугольник)
    // --- //
    // width и height увеличиваются на grainDensity каждую итерацию
    // --- //
    // width и height являются координатами (x, y) для нового прямоугольника,
    // а grainWidth и grainHeight - размерами
    // ~~~***~~~
    for (let width = 0; width < options.patternWidth; width += options.grainDensity) {
      for (let height = 0; height < options.patternHeight; height += options.grainDensity) {
        const rgb = Math.floor(Math.random() * 256);
        ctx.fillStyle = `rgba(${[rgb, rgb, rgb, options.grainOpacity].join()})`;
        ctx.fillRect(width, height, options.grainWidth, options.grainHeight);
      }
    }

    return canvas.toDataURL('image/png');
  }

  /**
   * Добавляем css стили для псевдо-элемента
   * @param {StyleSheet} sheet - css таблица(?) элемента style
   * @param {string} selector - селектор элемента
   * @param {string} rules - css стили
   * @param {number=} index - индекс, не используется
   */
  static addCSSRule(sheet, selector, rules, index) {
    let rule = '';

    if (selector.length) {
      rule = `${selector}{${rules}}`;
    } else {
      rule = rules;
    }

    sheet.insertRule(rule, index);
  }

  static isExist(selector) {
    // Если такой стиль уже существует, то удаляем.
    // Но это маловероятно. Возможно можно удалить.
    const styleAdded = document.querySelector(`#grained-animation__${selector}`);

    if (styleAdded) {
      styleAdded.parentElement.removeChild(styleAdded);
    }
  }

  static createStyle(selector) {
    // Добавляется элемент style
    const style = document.createElement('style');
    style.id = `grained-animation__${selector}`;
    document.body.appendChild(style);
    return style;
  }

  static add(selector, options) {
    this.isExist(selector);

    const style = this.createStyle(selector);
    const rule = this.getRule(this.generateNoise(options), options.grainChaos, options.grainSpeed);
    this.addCSSRule(style.sheet, `${selector}::before`, rule);
  }
}

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
    this.selector = this.getCSSSelector(); // css селектор элемента
    this.options = opt && typeof opt === 'object' ? { ...this.defaultOptions, ...opt } : this.defaultOptions;

    ParentStyle.addStyles(this.$parent);
    Animation.add();
    Noise.add(this.selector, this.options);
  }

  get defaultOptions() {
    return {
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
  }

  getCSSSelector() {
    const tag = this.$parent.tagName.toLowerCase();
    const { id } = this.$parent;
    const cssClass = this.$parent.className.split(' ').join('.');

    return `${tag}${id ? `#${id}` : ''}${cssClass ? `.${cssClass}` : ''}`;
  }
}

export default Grained;
