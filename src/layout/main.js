import React from 'react';
import { Menu } from '../components/menu/';

export const MainLayout = (props) => {
  return (
    <div>
      <Menu>This is the menu</Menu>
      <div className='container'>
        <div className="row row-offcanvas row-offcanvas-right">
          <div className="jumbotron">
             <h1>Vladimir Gjorgievski</h1>
             <p>All things ReactJS</p>
           </div>
        </div>
      </div>
    </div>
  );
}
