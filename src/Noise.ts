import { Options } from "./Grained";

class Noise {
  private static getRule(noiseImg: string, grainChaos: number, grainSpeed: number): string {
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
  private static generateNoise(options: Options): string {
    const canvas = document.createElement("canvas"); // создаем элемент
    const ctx = canvas.getContext("2d"); // задаем контекст

    if (ctx === null) return "";

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

    return canvas.toDataURL("image/png");
  }

  /**
   * Добавляем css стили для псевдо-элемента
   * @param {StyleSheet} sheet - css таблица(?) элемента style
   * @param {string} selector - селектор элемента
   * @param {string} rules - css стили
   */
  private static addCSSRule(sheet: CSSStyleSheet, selector: string, rules: string): void {
    let rule: string;

    if (selector.length) {
      rule = `${selector}{${rules}}`;
    } else {
      rule = rules;
    }

    sheet.insertRule(rule);
  }

  private static _isExist(selector: string): void {
    // Если такой стиль уже существует, то удаляем.
    // Но это маловероятно. Возможно можно удалить.
    const styleAdded = document.querySelector(`#grained-animation__${selector}`);

    if (styleAdded && styleAdded.parentElement) {
      styleAdded.parentElement.removeChild(styleAdded);
    }
  }

  private static createStyle(selector: string): HTMLStyleElement {
    // Добавляется элемент style
    const style = document.createElement("style");
    style.id = `grained-animation__${selector}`;
    document.body.appendChild(style);
    return style;
  }

  static add(selector: string, options: Options): void {
    this._isExist(selector);

    const style = this.createStyle(selector);
    const rule = this.getRule(
      this.generateNoise(options),
      options.grainChaos,
      options.grainSpeed,
    );

    this.addCSSRule(style.sheet!, `${selector}::before`, rule);
  }
}

export default Noise;
