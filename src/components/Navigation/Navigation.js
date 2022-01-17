import React from 'react';
import 'tachyons';
import './Navigation.css';

const Navigation = ({onRouteChange}) => {
    return (
        <div className={'ma3'} style = {{display: 'flex', justifyContent: 'flex-end'}}>
            <input onClick={() => onRouteChange('signin')} className="b br15 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib"
                   type="submit" value="Sign out"/>
        </div>
    );
}

export default Navigation;