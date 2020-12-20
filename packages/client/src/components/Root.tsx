import * as React from 'react';
import Spec from './Spec';
import { ChakraProvider } from '@chakra-ui/react';
import { Loading } from './Loading';

const { Suspense } = React;

function Root() {
  return (
    <ChakraProvider>
      <Suspense fallback={<Loading />}>
        <Spec />
      </Suspense>
    </ChakraProvider>
  );
}

export default Root;
