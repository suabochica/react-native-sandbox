import React from 'react';
import App from './App';

import renderer, { act } from 'react-test-renderer';

it('renders without crashing', async () => {
  let rendered;
  await act(async () => {
    rendered = renderer.create(<App />);
  });
  expect(rendered.toJSON()).toBeTruthy();
});
