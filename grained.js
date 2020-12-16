/*! Grained.js
* Author : Sarath Saleem  - https://github.com/sarathsaleem
* MIT license: http://opensource.org/licenses/MIT
* GitHub : https://github.com/sarathsaleem/grained
* v0.0.1
*/
/**
 *
 * @param { HTMLElement } elm - HTML элемент
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
function grained(elm, opt) {
  function getElementSelector(el) {
    const tag = el.tagName.toLowerCase();
    const { id } = el;
    const cssClass = el.className.split(' ').join('.');

    return `${tag}${id ? `#${id}` : ''}${cssClass ? `.${cssClass}` : ''}`;
  }

  const element = elm; // элемент
  const selectorElement = getElementSelector(element); // css селектор элемента

  // если элемент отсутсвует, то заканчиваем выполнение
  if (!element) {
    console.error(`Grained: cannot find the element with id ${elm}`);
    return;
  }

  // SET STYLE FOR PARENT
  // проверяем какое значение у position, если оно есть
  const checkPosition = (el) => {
    const forbidden = ['absolute', 'fixed', 'relative', 'sticky'];
    const isAllow = (val) => !forbidden.some((pos) => pos === val);
    const getCssPosition = () => getComputedStyle(el).getPropertyValue('position');

    return isAllow(el.style.position) && isAllow(getCssPosition());
  };

  // Задаем базовые стили для элемента
  const addElmStyles = () => {
    // если position не задано, то задаем
    if (checkPosition(element)) {
      element.style.position = 'relative';
    }

    element.style.overflow = 'hidden';
  };

  addElmStyles();

  // DEFAULT OPTION VALUES
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

  /**
   * Генерирует изображение с "шумом" из канваса
   * @returns {string} - base64 png изображение
   */
  const generateNoise = () => {
    const canvas = document.createElement('canvas'); // создаем элемент
    const ctx = canvas.getContext('2d'); // задаем контекст

    /** @type {number} */
    canvas.width = options.patternWidth; // задаем размер
    /** @type {number} */
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
  };

  /**
   * Добавляем css стили для псевдо-элемента
   * @param {StyleSheet} sheet - css таблица(?) элемента style
   * @param {string} selector - селектор элемента
   * @param {string} rules - css стили
   * @param {number=} index - индекс, не используется
   */
  function addCSSRule(sheet, selector, rules, index) {
    let rule = '';

    if (selector.length) {
      rule = `${selector}{${rules}}`;
    } else {
      rule = rules;
    }

    sheet.insertRule(rule, index);
  }

  /** @type {string} */
  const noise = generateNoise();

  /**
   * Создаем css keyframe
   * @param { [{step: string, translate: string}] } frames - Список "шагов" со значениями translate
   * @returns {string}
   */
  const createKeyframes = (frames) => {
    let steps = '';

    frames.forEach(({ step, translate }) => {
      steps += `${step} { transform: translate(${translate}); }`;
    });

    return `@keyframes grained {${steps}}`;
  };

  const keyFrames = [
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
  const animation = createKeyframes(keyFrames);

  // add animation keyframe
  // Сама анимация не меняется - она всегда одинаковая.
  // Так что не вижу смысла удалять элемент, если он уже есть.
  // Лучше добавить data-атрибут, чтобы было понятно что это не пользователь создал
  const animationAdded = document.querySelector('[data-grained-animation]');
  if (!animationAdded) {
    // Добавляем элемент style в документ
    const style = document.createElement('style');
    style.id = 'grained-animation';
    style.dataset.grainedAnimation = '';
    style.innerHTML = animation;
    document.body.appendChild(style);
  }

  // add custimozed style
  // Если такой стиль уже существует, то удаляем.
  // Но это маловероятно. Возможно можно удалить.
  const styleAdded = document.querySelector(`#grained-animation__${selectorElement}`);

  if (styleAdded) {
    styleAdded.parentElement.removeChild(styleAdded);
  }

  // Добавляется элемент style
  const style = document.createElement('style');
  style.id = `grained-animation__${selectorElement}`;
  document.body.appendChild(style);

  const rule = `
    content: "";
    position: absolute;
    top: -100%;
    left: -100%;
    width: 300%;
    height: 300%;
    background-image: url(${noise});
    animation-name:grained;
    animation-iteration-count: infinite;
    animation-duration: ${options.grainChaos}s;
    animation-timing-function: steps(${options.grainSpeed}, end);
  `;

  // selecter element to add grains
  addCSSRule(style.sheet, `${selectorElement}::before`, rule);
// END
}

export default grained;
