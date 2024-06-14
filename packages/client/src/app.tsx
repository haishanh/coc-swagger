import 'modern-normalize/modern-normalize.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import Root from './components/Root';

const container = document.getElementById('app');
const root = createRoot(container!);

// import('buffer').then((mod) => {
//   // swagger-ui-react depends on randombytes
//   // https://github.com/crypto-browserify/randombytes
//   // randombytes is quite old module
//   window.global = window;
//   // @ts-ignore
//   window.Buffer = mod.Buffer;
// });

 
// window.Buffer = window.Buffer || require('buffer').Buffer;

root.render(<Root />);
