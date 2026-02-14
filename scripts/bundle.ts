#!/usr/bin/env node
import { copyFileSync } from 'node:fs';
import { resolve } from 'node:path';
import autoprefixer from 'autoprefixer';
import gulp from 'gulp';
import cleanCSS from 'gulp-clean-css';
import postcss from 'gulp-postcss';
import gulpSass from 'gulp-sass';
import * as sass from 'sass';
import { build } from 'tsdown';
import { demoBundle, distBundle, projectRoot } from './constants';

const sassPlugin = gulpSass(sass);
const { dest, src, watch } = gulp;

const baseOptions = {
  cwd: projectRoot,
  entry: ['./src/index.ts'],
  dts: true,
  plugins: [],
  ignoreWatch: ['./src/__tests__'],
  external: [/^quill\//],
  noExternal: [],
  inlineOnly: [],
  loader: {} as const,
  sourcemap: true,
  minify: false,
  clean: false,
  watch: false,
};

export function buildStyle({
  isDev = false,
  onSuccess = () => {},
} = {}) {
  function buildSass() {
    console.log('??');
    return src(['./src/style/index.scss'])
      .pipe(sassPlugin().on('error', sassPlugin.logError))
      .pipe(postcss([autoprefixer()]))
      .pipe(
        cleanCSS({}, (details) => {
          console.log(
            `${details.name}: ${details.stats.originalSize / 1000} KB -> ${
              details.stats.minifiedSize / 1000
            } KB`,
          );
        }),
      )
      .pipe(dest(distBundle))
      .pipe(dest(demoBundle))
      .on('finish', () => {
        onSuccess();
      });
  }
  if (isDev) {
    watch('./src/**/*.scss', buildSass);
  }
  return buildSass();
}

export async function buildTS({
  isDev = false,
  onSuccess = () => {},
} = {}) {
  const options = {
    ...baseOptions,
    minify: !isDev,
    watch: isDev ? ['./src'] : false,
  };
  return Promise.all([
    isDev
      ? null
      : build({
          ...options,
          format: ['esm'],
          outExtensions: () => ({ js: '.js' }),
        }),
    build(
      {
        ...options,
        format: ['umd'],
        platform: 'browser',
        target: ['es2015'],
        inputOptions: {
          plugins: options.plugins,
        },
        outputOptions: {
          name: 'QuillToolbarTip',
          format: 'umd',
          globals: {
            quill: 'Quill',
          },
          exports: 'named',
          plugins: [],
        },
        onSuccess() {
          copyFileSync(resolve(distBundle, 'index.umd.js'), resolve(demoBundle, 'index.umd.js'));
          copyFileSync(resolve(distBundle, 'index.umd.js.map'), resolve(demoBundle, 'index.umd.js.map'));
          console.log(`Copied index.umd.js to demo bundle`);
          onSuccess();
        },
      },
    ),
  ]);
}
