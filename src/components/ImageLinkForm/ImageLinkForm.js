import React from 'react';
import 'tachyons';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return(
        <div>
            <p className={'f3'}>This Magic Brain will detect faces in your pictures.
                Give it a try by entering an URL of an image!</p>
            <div className={'center'}>
                <div className={'center form pa4 br15 shadow-5'}>
                    <input  id={'imageInput'} className={'f4 pa2 br15 w-75 center'} type={"text"} onChange={onInputChange}/>

                    <button className={'w-25 grow br15 f4 link ph3 pv2 dib white text-black'}
                            onClick={onButtonSubmit}>
                        DETECT
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;