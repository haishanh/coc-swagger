import 'modern-normalize/modern-normalize.css';

import React from 'react';
import { render } from 'react-dom';
import Root from './components/Root';

const rootEl = document.getElementById('app');

import('buffer').then((mod) => {
  // swagger-ui-react depends on randombytes
  // https://github.com/crypto-browserify/randombytes
  // randombytes is quite old module
  // @ts-ignore
  window.global = window;
  // @ts-ignore
  window.Buffer = mod.Buffer;
});

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-var-requires
// window.Buffer = window.Buffer || require('buffer').Buffer;

// const root = ReactDOM.createRoot(rootEl); root.render(<Root />);
render(<Root />, rootEl);
