import React, {Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from './components/Rank/Rank';
import FaceRecognition from "./components/FaceRecognition/FaceRecognition"
import Particles from "react-tsparticles";
import Clarifai from 'clarifai';
import {calculateNewValue} from "@testing-library/user-event/dist/utils";

const app = new Clarifai.App({
    apiKey: 'd4859bbc19794718a2c877aa76ed917e'
});

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imgUrl: '',
            box: {}
        }
    }

    calculateFaceLocation = (data) => {
        const face = data.outputs[0].data.regions[0].region_info.bounding_box
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value})
    }

    onButtonSubmit = () => {
        this.setState({imgUrl: this.state.input})
        app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
            function(response){
                this.calculateFaceLocation(response)
            },
            function(err){
                console.log(err)
            }
        );
    }

    render() {
        return (
            <div className="App">
                <Particles
                    className={'particles'}
                    id="tsparticles"
                    init={particlesInit}
                    loaded={particlesLoaded}
                    options={particleOptions}/>
                <Navigation />
                <Logo />
                <Rank />
                <ImageLinkForm onInputChange = {this.onInputChange}
                               onButtonSubmit = {this.onButtonSubmit}/>
                <FaceRecognition imgUrl={this.state.imgUrl}/>
            </div>
        );
    }
}

const particlesInit = (main) => {
    console.log(main);
};

const particlesLoaded = (container) => {
    console.log(container);
};

const particleOptions = {
    background: {
        gradient: {
            value: 'linear-gradient(100deg, #0CE8B3 0%, #02B7F7 100%)',
        }
    },
    fpsLimit: 60,
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: "push",
            },
            onHover: {
                enable: true,
                mode: "repulse",
            },
            resize: true,
        },
        modes: {
            bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40,
            },
            push: {
                quantity: 4,
            },
            repulse: {
                distance: 200,
                duration: 0.4,
            },
        },
    },
    particles: {
        color: {
            value: "#ffffff",
        },
        links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.9,
            width: 1,
        },
        collisions: {
            enable: true,
        },
        move: {
            direction: "none",
            enable: true,
            outMode: "bounce",
            random: false,
            speed: 2,
            straight: false,
        },
        number: {
            density: {
                enable: true,
                area: 800,
            },
            value: 150,
        },
        opacity: {
            value: 0.5,
        },
        shape: {
            type: "circle",
        },
        size: {
            random: true,
            value: 5,
        },
    },
    detectRetina: true,
}

export default App;
