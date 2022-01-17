import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
    return(
      <div className='ma4 mt0 center'>
          <Tilt className="Tilt br15 shadow-2" options={{ max : 60 }} style={{ height: 130, width: 130 }} >
              <div className="Tilt-inner">
                  <img alt={''} src={brain} height='130px' width='130px'/>
              </div>
          </Tilt>
      </div>
    );
}

export default Logo;