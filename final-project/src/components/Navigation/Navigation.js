import React from 'react';
import 'tachyons';

const Navigation = ({onRouteChange}) => {
    return (
        <div className={'ma3'} style = {{display: 'flex', justifyContent: 'flex-end'}}>
            {/*<p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pointer tr'> Sign out </p>*/}
            <input onClick={() => onRouteChange('signin')} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib"
                   type="submit" value="Sign out"/>
        </div>
    );
}

export default Navigation;