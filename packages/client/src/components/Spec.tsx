import * as React from 'react';
import SwaggerUI from 'swagger-ui-react';

import 'swagger-ui-react/swagger-ui.css';

type Listener = (d: any) => void;

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
  const ws = new WebSocket(url);
  ws.addEventListener('error', function (ev) {
    console.log('websocket error', ev);
  });
  ws.addEventListener('close', function (ev) {
    console.log('websocket close', ev);
  });
  ws.addEventListener('message', function (ev) {
    sub.handleData(ev.data);
  });
  return sub.subscribe(callback);
}

const specInit = {
  info: {
    title: 'empty',
    version: '0.0.0',
  },
  openapi: '3.0.0',
};

const { useState, useEffect, useCallback } = React;

function Spec() {
  const [spec, setSepc] = useState(specInit);

  const onComplete = useCallback((system) => {
    const state = system.getState();
    // state is an immutablejs data
    // const version = state.getIn(['spec', 'json', 'info', 'version']);
    const title = state.getIn(['spec', 'json', 'info', 'title']);
    document.title = title;
  }, []);

  useEffect(() => {
    return setupWebSocket((spec: any) => setSepc(spec));
  }, []);

  return (
    <>
      <SwaggerUI
        spec={spec}
        onComplete={onComplete}
        supportedSubmitMethods={[
          'get',
          'put',
          'post',
          'delete',
          'options',
          'head',
          'patch',
          'trace',
        ]}
      />
    </>
  );
}

export default Spec;
