class Animation {
  static get _keyFrames() {
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
  static _createKeyframes(frames) {
    let steps = '';

    frames.forEach(({ step, translate }) => {
      steps += `${step} { transform: translate(${translate}); }`;
    });

    return `@keyframes grained {${steps}}`;
  }

  static _create() {
    // Добавляем элемент style в документ
    const style = document.createElement('style');
    style.id = 'grained-animation';
    style.dataset.grainedAnimation = '';
    style.innerHTML = this._createKeyframes(this._keyFrames);
    document.body.appendChild(style);
  }

  static add() {
    // Сама анимация не меняется - она всегда одинаковая.
    // Так что не вижу смысла удалять элемент, если он уже есть.
    // Лучше добавить data-атрибут, чтобы было понятно что это не пользователь создал
    const isExist = document.querySelector('[data-grained-animation]');
    if (!isExist) {
      this._create();
    }
  }
}

export default Animation;
