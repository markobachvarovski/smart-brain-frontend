import React from 'react';
import 'tachyons';
import './FaceRecognition.css'

const FaceRecognition = ({box, imgUrl}) => {
    return(
        <div className={'center ma2'}>
            <div className={'absolute mt2'}>
                <img className={'br15'} id='inputimage' alt={''} src={imgUrl} width={'500px'} height={'auto'}/>
                <div className={'bounding-box'} style={{top: box.topRow,
                                                        right: box.rightCol,
                                                        bottom: box.bottomRow,
                                                        left: box.leftCol}}>
                </div>
            </div>
        </div>
    )
}

export default FaceRecognition;