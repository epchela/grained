import Tweakpane from 'tweakpane';
import grained from './grained';

const setDownloadLink = () => {
  const backgroundImage = document.querySelector('body style:not([data-grained-animation])').sheet.cssRules[0].style.backgroundImage;

  const createHref = () => backgroundImage.replace(/url\("/, '').replace(/"\)$/, '');
  document.querySelector('a').href = createHref();
};
const initGrained = () => {
  grained('body', PARAMS);
  setDownloadLink();
};

const $elm = document.querySelector('body');

const PARAMS = {
  animate: true,
  patternWidth: 100,
  patternHeight: 100,
  grainOpacity: 0.1,
  grainDensity: 1,
  grainWidth: 1,
  grainHeight: 1,
  background: { r: 255, g: 255, b: 255 }
};
const pane = new Tweakpane();

for (const paramsKey in PARAMS) {
  const value = PARAMS[paramsKey];

  switch (paramsKey) {
    case 'animate':
      pane.addInput(PARAMS, paramsKey);
      break;
    case 'background':
      pane.addInput(PARAMS, paramsKey).on('change', (value) => {
        const { r, g, b, a } = value;
        $elm.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a})`;
      });
      break;
    default:
      pane.addInput(PARAMS, paramsKey, {
        min: 0.1,
        max: value < 1 ? 1 : value < 100 ? 10 : 500
      });
  }
}

pane.on('change', () => {
  initGrained();
});

initGrained();
