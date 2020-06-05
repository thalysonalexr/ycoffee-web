import React from 'react';
import { FaTwitter, FaPinterest, FaInstagram } from 'react-icons/fa';

import './styles.css';

const SocialNetwork: React.FC = () => {
  return (
    <ul className="social-network">
      <li>
        <a
          rel="noopener noreferrer"
          title="Seguir no Pinterest"
          href="https://br.pinterest.com/"
        >
          <FaPinterest size={22} color="#fcfcfc" />
        </a>
      </li>
      <li>
        <a
          rel="noopener noreferrer"
          title="Seguir no Instagram"
          href="https://www.instagram.com/"
        >
          <FaInstagram size={22} color="#fcfcfc" />
        </a>
      </li>
      <li>
        <a
          rel="noopener noreferrer"
          title="Seguir no Twitter"
          href="https://twitter.com/"
        >
          <FaTwitter size={22} color="#fcfcfc" />
        </a>
      </li>
    </ul>
  );
};

export default SocialNetwork;
