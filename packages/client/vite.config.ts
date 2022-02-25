import { defineConfig } from 'vite';
import { docplugin } from './docplugin';
// const { defineConfig } = require('vite');
// const { docplugin } = require('./docplugin');

export default defineConfig(() => ({ plugins: [docplugin()] }));
