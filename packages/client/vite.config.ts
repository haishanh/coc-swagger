import { defineConfig } from 'vite';
import { docplugin } from './docplugin';

export default defineConfig(() => ({ plugins: [docplugin()] }));
