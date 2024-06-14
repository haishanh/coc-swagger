import * as React from 'react';
import { toast } from 'sonner';
import { Loading } from './Loading';
import 'swagger-ui-react/swagger-ui.css';
import { SwaggerUIProps } from 'swagger-ui-react';

const { lazy } = React;

const SwaggerUI = lazy(() => import('swagger-ui-react'));

type Listener = (d: SwaggerUIProps['spec']) => void;

const sub = {
  subscribers: [],

  handleData(input: string) {
    const cnt = JSON.parse(input);
    this.subscribers.forEach((f) => f(cnt));
  },

  subscribe(listener: Listener) {
    this.subscribers.push(listener);
    return () => {
      const idx = this.subscribers.indexOf(listener);
      this.subscribers.splice(idx, 1);
    };
  },
};

function setupWebSocket(callback: Listener) {
  const host = window.location.host || 'localhost:3000';
  const url = `ws://${host}`;
  const socket = new WebSocket(url, 'coc-swagger');
  // const socket = new WebSocket(url);
  function onError(ev: WebSocketEventMap['error']) {
    console.log('websocket error', ev);
    toast.error('coc-swagger socket error');
  }
  function onClose(ev: WebSocketEventMap['close']) {
    console.log('websocket close', ev);
    toast.error('coc-swagger server disconnected');
  }

  function onMessage(ev: WebSocketEventMap['message']) {
    toast.success('coc-swagger updating');
    sub.handleData(ev.data);
  }

  function onOpen(/* ev: WebSocketEventMap['open'] */) {
    socket.send(JSON.stringify({ type: 'Hello', message: 'Hello Server!' }));
  }

  socket.addEventListener('error', onError);
  socket.addEventListener('close', onClose);
  socket.addEventListener('message', onMessage);
  socket.addEventListener('open', onOpen);
  const unsub = sub.subscribe(callback);
  return () => {
    socket.removeEventListener('error', onError);
    socket.removeEventListener('close', onClose);
    socket.removeEventListener('message', onMessage);
    socket.removeEventListener('open', onOpen);
    unsub();
  };
}

const { useState, useEffect, useCallback } = React;

function Spec() {
  const [spec, setSepc] = useState<SwaggerUIProps['spec']>();

  const onComplete: SwaggerUIProps['onComplete'] = useCallback((system) => {
    const state = system.getState();
    // state is an immutablejs data
    // const version = state.getIn(['spec', 'json', 'info', 'version']);
    const title = state.getIn(['spec', 'json', 'info', 'title']);
    document.title = title;
  }, []);

  useEffect(() => {
    return setupWebSocket((spec) => setSepc(spec));
  }, []);

  return <>{spec ? <SwaggerUI spec={spec} onComplete={onComplete} /> : <Loading />}</>;
}

export default Spec;
