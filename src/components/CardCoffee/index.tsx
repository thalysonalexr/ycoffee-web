import React, { useState } from 'react';
import Moment from 'react-moment';
import { FaRegClock } from 'react-icons/fa';
import 'moment/locale/pt-br';

import { CoffeeModel } from '../../types/domain/Coffee';

import portions from '../../assets/coffee-tea.svg';
import preparation from '../../assets/preparation.svg';
import coffeeBean from '../../assets/coffee-bean-smooth.svg';

import './styles.css';

const CardCoffee: React.FC<{ data: CoffeeModel }> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div
      onClick={toggle}
      title={`${data.type} (toque para expandir)`}
      className="card shadow-box">
      <section className="about-coffee">
        <div className="left">
          <div className="row-1">
            <header>
              <strong className="title">{data.type}</strong>
              <span className="updated-at">
                Atualizada em&nbsp;
                <Moment
                  format="DD MMM YYYY"
                  date={data.updatedAt} />
              </span>
            </header>
            <div className="description">
              <p>{data.description}</p>
            </div>
          </div>
          <div className="row-2">
            <div className="author">
              {data.author.avatar && (<img
                title={data.author.name}
                className="author-avatar"
                alt="Avatar do usuário"
                src={`${process.env.REACT_APP_API}/files/${data.author.avatar.key}`} />)}
              <span>escrito por {data.author.name}</span>
            </div>
            {data.timePrepare && !isOpen && (
              <div className="time-prepare">
                <FaRegClock size={16} color="3F3C32" />
                <span>{data.timePrepare} min</span>
              </div>
            )}
          </div>
        </div>
        <div className="right">
          {data.image && (<img
            title={data.type}
            className="coffee-image"
            alt="Imagem da receita pronta"
            src={`${process.env.REACT_APP_API}/files/${data.image.key}`} />)}
        </div>
      </section>
      <section style={
        isOpen ? {
          display: 'flex',
          height: 'auto',
          maxHeight: '600px',
          overflow: 'hidden',
          transition: 'max-height 500ms ease-out',
          marginTop: '25px'
        }: {
          maxHeight: 0,
          visibility: 'hidden',
          transition: 'max-height 100ms ease-in'
        }} className="make-coffee">
        <div className="top">
          <div className="left">
            <header>
              <strong className="subtitle">Ingredientes</strong>
              <img
                src={coffeeBean}
                className="bean-coffee"
                alt="Semente de café"/>
            </header>
            <ul className="ingredients">
              {data.ingredients.map((ingredient, index) =>
                <li key={index}>{ingredient}</li>
              )}
            </ul>
          </div>
          <div className="right">
            {data.timePrepare && (<div className="time-prepare">
              <FaRegClock size={32} color="3F3C32" />
              <span>pronto em {data.timePrepare} min</span>
            </div>)}
            {data.portions && (<div className="portions">
              <img src={portions} alt="Caneca de café"/>
              <span>faz até {data.portions} porções</span>
            </div>)}
          </div>
        </div>
        <div className="bottom">
          <header>
            <strong className="subtitle">Modo de preparo</strong>
            <img src={preparation} alt="Café sendo coado"/>
          </header>
          <p>{data.preparation}</p>
        </div>
      </section>
    </div>
  );
}

export default CardCoffee;
