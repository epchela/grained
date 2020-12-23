import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

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
    terser(),
    serve({
      open: true,
      host: 'localhost',
      port: 3000,
      contentBase: './',
    }),
    livereload({
      watch: ['./', './js'],
      exts: ['html', 'js', 'css'],
    }),
  ],
};
