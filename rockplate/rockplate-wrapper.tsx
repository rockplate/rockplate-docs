import React from 'react';
import dynamic from 'next/dynamic';
import init from './init';

let initialized = false;
if (!initialized) {
  if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
    init();
  }
  initialized = true;
}

export const getComponentWrapped = (component: typeof React.Component) => {
  const DynamicComponentWithNoSSR = dynamic(() => Promise.resolve(component), { ssr: false });
  return DynamicComponentWithNoSSR;
};

export const getComponent = (componentName: string) => {
  const DynamicComponentWithNoSSR = dynamic(() => import('./' + componentName), { ssr: false });
  return DynamicComponentWithNoSSR;
};
