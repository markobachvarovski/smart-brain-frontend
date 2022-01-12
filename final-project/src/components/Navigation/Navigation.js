import React from 'react';
import 'tachyons';

const Navigation = () => {
    return (
        <div className={'ma3'} style = {{display: 'flex', justifyContent: 'flex-end'}}>
            <p className='f3 link dim black underline pointer tr'> Sign out </p>
        </div>
    );
}

export default Navigation;