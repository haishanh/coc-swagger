import * as React from 'react';
import { Toaster } from 'sonner';
import Spec from './Spec';
import { Loading } from './Loading';

const { Suspense } = React;

function Root() {
  return (
    <>
      <Toaster position="bottom-center" />
      <Suspense fallback={<Loading />}>
        <Spec />
      </Suspense>
    </>
  );
}

export default Root;
