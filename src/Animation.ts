type KeyFrames = { step: string, translate: string }[];

export class Animation {
  private static keyFrames: KeyFrames = [
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

  private static createKeyframes(frames: KeyFrames): string {
    let steps = '';

    frames.forEach(({ step, translate }) => {
      steps += `${step} { transform: translate(${translate}); }`;
    });

    return `@keyframes grained {${steps}}`;
  }

  private static create(): void {
    // Добавляем элемент style в документ
    const style = document.createElement('style');
    style.id = 'grained-animation';
    style.dataset.grainedAnimation = '';
    style.innerHTML = this.createKeyframes(this.keyFrames);
    document.body.appendChild(style);
  }

  static add(): void {
    const isExist = document.querySelector('[data-grained-animation]');
    if (!isExist) {
      this.create();
    }
  }
}

export default Animation;
