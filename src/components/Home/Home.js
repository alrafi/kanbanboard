import React from 'react';
import './Home.scss';
import logoProsa from '../../assets/img/logo-prosa.png';

const Home = () => {
  return (
    <div className="layout-container">
      <div className="menu-container"></div>
      <div className="main-container">
        <div className="main-header">
          <div className="header-title">
            <img src={logoProsa} alt="" />
            <h1>Kanban Prosa</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
