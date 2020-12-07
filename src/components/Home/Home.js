import React from 'react';
import './Home.scss';
import logoProsa from '../../assets/img/logo-prosa.png';

const Home = () => {
  return (
    <div className="layout-container">
      <div className="menu-container"></div>
      <div className="main-container">
        <header className="main-header">
          <div className="header-title">
            <img src={logoProsa} alt="" />
            <h1>Kanban Prosa</h1>
          </div>
        </header>
        <main className="main-section">
          <div className="card-box"></div>
          <div className="card-box"></div>
          <div className="card-box"></div>
        </main>
      </div>
    </div>
  );
};

export default Home;
