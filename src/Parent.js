class Parent {
  // ### СТИЛИ ДЛЯ РОДИТЕЛЯ ### //
  // проверяем какое значение у position, если оно есть
  static _shouldSetPosition(parentElm) {
    const forbidden = ['absolute', 'fixed', 'relative', 'sticky'];
    const isAllow = (val) => !forbidden.some((pos) => pos === val);
    const getCssPosition = () => getComputedStyle(parentElm).getPropertyValue('position');

    return isAllow(parentElm.style.position) && isAllow(getCssPosition());
  }

  // Задаем базовые стили для элемента
  static addStyles(parentElm) {
    // если position не задано, то задаем
    if (this._shouldSetPosition(parentElm)) {
      // eslint-disable-next-line no-param-reassign
      parentElm.style.position = 'relative';
    }

    // eslint-disable-next-line no-param-reassign
    parentElm.style.overflow = 'hidden';
  }
}

export default Parent;
