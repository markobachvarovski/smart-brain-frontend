import React, {Component} from 'react';
import 'tachyons';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from './components/Rank/Rank';
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Particles from "react-tsparticles";
import Clarifai from 'clarifai';


const app = new Clarifai.App({
    apiKey: 'd4859bbc19794718a2c877aa76ed917e'
});

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imgUrl: '',
            box: {},
            route: 'signin'
        }
    }

    calculateFaceLocation = (data) => {
        const face = data.outputs[0].data.regions[0].region_info.bounding_box

        const image = document.getElementById('inputimage')

        const width = Number(image.width)
        const height = Number(image.height)

        return ({
            leftCol: face.left_col * width,
            topRow: face.top_row * height,
            rightCol: (1 - face.right_col) * width,
            bottomRow: (1 - face.bottom_row) * height
        })
    }

    displayFaceBox = (box) => {
        this.setState({box: box});
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value})
    }

    onButtonSubmit = () => {
        this.setState({imgUrl: this.state.input})
        app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
            .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
            .catch(err => console.log(err));
    }

    onRouteChange = (route) => {
        this.setState({route: route});
    }

    render() {
        return (
            <div className="App">
                <Particles
                    className={'particles'}
                    id="tsparticles"
                    init={particlesInit}
                    loaded={particlesLoaded}
                    options={particleOptions}
                />

                {this.state.route === 'home'
                    ?<div>
                        <div className={'ma3'} style={{display: 'flex'}}>
                            <div style={{justifyContent:'flex-start'}}>
                                <Logo />
                            </div>
                            <div style={{marginLeft: "auto"}}>
                                <Navigation onRouteChange={this.onRouteChange}/>
                            </div>
                        </div>

                        <Rank />

                        <ImageLinkForm onInputChange = {this.onInputChange}
                                       onButtonSubmit = {this.onButtonSubmit}/>

                        <FaceRecognition box={this.state.box} imgUrl={this.state.imgUrl}/>
                    </div>

                    : (this.state.route === 'signin'
                        ? <Signin onRouteChange={this.onRouteChange}/>
                        : <Register onRouteChange={this.onRouteChange}/>)
                }

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
            speed: 1,
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
            type: "circle"
        },
        size: {
            random: true,
            value: 3,
        },
    },
    detectRetina: true,
}

export default App;
