import * as React from 'react';
import { Ghost } from './Ghost';

const style = {
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: 100,
  background: '#f3f3f3',
} as const;

export function Loading() {
  return (
    <div style={style}>
      <Ghost size={240} mood="blissful" color="#E0E4E8" />
      <p style={{ margin: '1em auto' }}>Contacting coc-swagger server...</p>
    </div>
  );
}
