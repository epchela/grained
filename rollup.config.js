import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'js/main.js',
  output: [
    {
      file: `main.js`,
      format: "iife"
    },
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    terser()
  ],
};
