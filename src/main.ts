import Grained from './Grained';
import { Options } from './types';

// eslint-disable-next-line @typescript-eslint/ban-types
const grained = (selector: string, options: Options | {}): void => {
  // eslint-disable-next-line no-new
  new Grained(selector, options);
};

export default grained;
