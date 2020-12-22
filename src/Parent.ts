// Устанавливаем стили родителя
class Parent {
  // проверяем какое значение у position, если оно есть
  private static shouldSetPosition(parentElm: HTMLElement): boolean {
    const forbidden = ['absolute', 'fixed', 'relative', 'sticky'];
    const isAllow = (val: string) => !forbidden.some((pos) => pos === val);
    const getCssPosition = () => getComputedStyle(parentElm).getPropertyValue('position');

    return isAllow(parentElm.style.position) && isAllow(getCssPosition());
  }

  // Задаем базовые стили для элемента
  static addStyles(parentElm: HTMLElement): void {
    // если position не задано, то задаем
    if (this.shouldSetPosition(parentElm)) {
      // eslint-disable-next-line no-param-reassign
      parentElm.style.position = 'relative';
    }

    // eslint-disable-next-line no-param-reassign
    parentElm.style.overflow = 'hidden';
  }
}

export default Parent;
