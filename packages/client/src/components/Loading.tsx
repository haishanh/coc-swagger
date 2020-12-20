/** @jsx jsx */
// import * as React from 'react';
import { css, jsx } from '@emotion/react';

import { Ghost } from 'react-kawaii';

export function Loading() {
  return (
    <div
      css={css`
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 100px;
        background: #f3f3f3;
      `}
    >
      <Ghost size={240} mood="blissful" color="#E0E4E8" />
      <p
        css={css`
          margin: 1em auto;
        `}
      >
        Contacting coc-swagger server...
      </p>
    </div>
  );
}
