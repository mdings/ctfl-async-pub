import React from 'react';
import { render } from 'react-dom';

import { GlobalStyles } from '@contentful/f36-components';
import { SDKProvider } from '@contentful/react-apps-toolkit';

import LocalhostWarning from './components/LocalhostWarning';
import App from './App';

const root = document.getElementById('root');

// Overwrite any styles we want to overwrite
const overwriteStyles = {
  'html': {
    // 'border': '1px solid green',
    // 'height': '400px'
  }
}

if (process.env.NODE_ENV === 'development' && window.self === window.top) {
  // You can remove this if block before deploying your app
  render(<LocalhostWarning />, root);
} else {
  render(
    <SDKProvider>
      <GlobalStyles styles={overwriteStyles} />
      <App />
    </SDKProvider>,
    root
  );
}
