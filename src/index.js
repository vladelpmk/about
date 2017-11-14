import './style';
import React from 'react';
import ReactDOM from 'react-dom';

import { Menu } from './components/menu/'
import { MainLayout } from './layout/main'

ReactDOM.render(
  <MainLayout>
    <Menu>AWESOME</Menu>
    <h1>Hello, world!</h1>
  </MainLayout>,
  document.getElementById('root')
);
