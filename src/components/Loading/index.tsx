import React from 'react';
import Spinner from 'react-spinkit';

import './styles.css';

interface Loading {
  loading: boolean
  message: string 
}

const Loading: React.FC<Loading> = ({ loading, message }) => {
  return (
    loading ? <div className="overlay-content">
      <div className="wrapper">
        <Spinner
          color="#fcfcfc"
          fadeIn="none"
          name="three-bounce" />
        <span className="message">{message}...</span>
      </div>
    </div> : null
  );
}

export default Loading;
