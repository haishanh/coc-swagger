import 'modern-normalize/modern-normalize.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';

const rootEl = document.getElementById('app');

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-var-requires
window.Buffer = window.Buffer || require('buffer').Buffer;

const root = ReactDOM.unstable_createRoot(rootEl);
root.render(<Root />);
