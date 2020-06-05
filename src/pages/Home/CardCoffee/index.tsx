import React, { useState } from 'react';
import Moment from 'react-moment';
import { FaRegClock } from 'react-icons/fa';
import 'moment/locale/pt-br';

import { CoffeeModel } from '../../../types/domain/Coffee';

import portions from '../../../assets/icons/coffee-tea.svg';
import preparation from '../../../assets/icons/preparation.svg';
import coffeeBean from '../../../assets/icons/coffee-bean-bordered.svg';

import './styles.css';

interface Props {
  coffee: CoffeeModel;
}

const CardCoffee: React.FC<Props> = ({ coffee }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div
      onClick={toggle}
      title={`${coffee.type} (toque para expandir)`}
      className="card shadow-box"
    >
      <section className="about-coffee">
        <div className="left">
          <div className="row-1">
            <header>
              <strong className="title">{coffee.type}</strong>
              <span className="updated-at">
                Atualizada em&nbsp;
                <Moment format="DD MMM YYYY" date={coffee.updatedAt} />
              </span>
            </header>
            <div className="description">
              <p>{coffee.description}</p>
            </div>
          </div>
          <div className="row-2">
            <div className="author">
              {coffee.author && coffee.author.avatar && (
                <img
                  title={coffee.author.name}
                  className="author-avatar"
                  alt="Avatar do usuário"
                  src={`${process.env.REACT_APP_API}/files/${coffee.author.avatar.key}`}
                />
              )}
              {coffee.author && <span>escrito por {coffee.author.name}</span>}
            </div>
            {coffee.timePrepare && !isOpen && (
              <div className="time-prepare">
                <FaRegClock size={16} color="3F3C32" />
                <span>{coffee.timePrepare} min</span>
              </div>
            )}
          </div>
        </div>
        <div className="right">
          {coffee.image && (
            <img
              title={coffee.type}
              className="coffee-image"
              alt="Imagem da receita pronta"
              src={`${process.env.REACT_APP_API}/files/${coffee.image.key}`}
            />
          )}
        </div>
      </section>
      <section
        style={
          isOpen
            ? {
                display: 'flex',
                height: 'auto',
                maxHeight: '100%',
                overflow: 'hidden',
                transition: 'max-height 500ms ease-out',
                marginTop: '25px',
              }
            : {
                maxHeight: 0,
                display: 'none',
                visibility: 'hidden',
                transition: 'max-height 100ms ease-in',
              }
        }
        className="make-coffee"
      >
        <div className="top">
          <div className="left">
            <header>
              <strong className="subtitle">Ingredientes</strong>
              <img
                src={coffeeBean}
                className="bean-coffee"
                alt="Semente de café"
              />
            </header>
            <ul className="ingredients">
              {coffee.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div className="right">
            {coffee.timePrepare && (
              <div className="time-prepare">
                <FaRegClock size={32} color="3F3C32" />
                <span>pronto em {coffee.timePrepare} min</span>
              </div>
            )}
            {coffee.portions && (
              <div className="portions">
                <img src={portions} alt="Caneca de café" />
                <span>faz até {coffee.portions} porções</span>
              </div>
            )}
          </div>
        </div>
        <div className="bottom">
          <header>
            <strong className="subtitle">Modo de preparo</strong>
            <img src={preparation} alt="Café sendo coado" />
          </header>
          <p>{coffee.preparation}</p>
        </div>
      </section>
    </div>
  );
};

export default CardCoffee;
