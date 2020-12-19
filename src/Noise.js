class Noise {
  static _getRule(noiseImg, grainChaos, grainSpeed) {
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
  static _generateNoise(options) {
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
  static _addCSSRule(sheet, selector, rules, index) {
    let rule;

    if (selector.length) {
      rule = `${selector}{${rules}}`;
    } else {
      rule = rules;
    }

    sheet.insertRule(rule, index);
  }

  static _isExist(selector) {
    // Если такой стиль уже существует, то удаляем.
    // Но это маловероятно. Возможно можно удалить.
    const styleAdded = document.querySelector(`#grained-animation__${selector}`);

    if (styleAdded) {
      styleAdded.parentElement.removeChild(styleAdded);
    }
  }

  static _createStyle(selector) {
    // Добавляется элемент style
    const style = document.createElement('style');
    style.id = `grained-animation__${selector}`;
    document.body.appendChild(style);
    return style;
  }

  static add(selector, options) {
    this._isExist(selector);

    const style = this._createStyle(selector);
    const rule = this._getRule(
      this._generateNoise(options),
      options.grainChaos,
      options.grainSpeed,
    );
    this._addCSSRule(style.sheet, `${selector}::before`, rule);
  }
}

export default Noise;
