import React from 'react';

import SocialNetwork from '../../../components/SocialNetwork';

import './styles.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer shadow-box">
      <div className="wrapper">
        <section className="newsletter">
          <article className="info">
            <h3>Lorem Ipsum</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy.
              Lorem Ipsum has been the industry's standard dummy. Lorem Ipsum
              has been the industry's standard dummy.
            </p>
          </article>
          <article className="info">
            <h3>Lorem Ipsum</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy.
              Lorem Ipsum has been the industry's standard dummy. Lorem Ipsum
              has been the industry's standard dummy.
            </p>
          </article>
        </section>
        <section className="about">
          <span className="copyright">
            Seu Café © {new Date().getFullYear()} - Todos os direitos reservados
          </span>
          <SocialNetwork />
        </section>
      </div>
    </footer>
  );
};

export default Footer;
