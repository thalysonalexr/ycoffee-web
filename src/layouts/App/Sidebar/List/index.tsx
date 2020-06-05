import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import arrowRight from '../../../../assets/icons/arrow-right.svg';

import './styles.css';

interface Props {
  title: string;
  toPath: string;
  icon: string;
}

const List: React.FC<Props> = ({ children, title, toPath, icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <section className="list">
      <Link onClick={toggle} title={title} to={{ pathname: toPath }}>
        <div>
          <img src={icon} alt={`Icone de ${title}`} />
        </div>
        <div>
          <span>{title}</span>
          <img
            src={arrowRight}
            alt="Icone de flecha para direita"
            className="icon-arrow"
          />
        </div>
      </Link>
      <ul
        className="navsublist"
        style={
          isOpen
            ? {
                display: 'block',
                marginTop: '15px',
                marginLeft: '62px',
              }
            : { display: 'none' }
        }
      >
        {children}
      </ul>
    </section>
  );
};

export default List;
