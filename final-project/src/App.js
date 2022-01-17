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

const initialState = {
    input: '',
    imgUrl: '',
    box: {},
    route: 'signin',
    user: {
        id: '',
        name: '',
        email: '',
        password: '',
        entries: 0,
        joined: ''
    }
};

class App extends Component {
    constructor() {
        super();
        this.state = initialState;
    }

    loadUser = (user) => {
        this.setState({user: {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
                entries: user.entries,
                joined: user.joined
            }})
    }

    calculateFaceLocation = (data) => {
        if (Object.keys(data.outputs[0].data).length === 0){
            return({})
        }

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
        this.setState({box: box})

        if(box.length === 0){
            this.setState({box: {}})
        }
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value})
    }

    onButtonSubmit = () => {
        this.setState({imgUrl: this.state.input})
        app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
            .then(response => {
                if (response) {
                    fetch('https://limitless-cove-41492.herokuapp.com/image', {
                        method: 'put',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            id: this.state.user.id
                        })
                    })
                        .then(response => response.json())
                        .then(count => {
                            this.setState(Object.assign(this.state.user, {entries: count}))
                        })
                }
                this.displayFaceBox(this.calculateFaceLocation(response))
            })
            .catch(err => {
                console.log('Image is too blurry for the API to recognize. Please try a different one')
                this.displayFaceBox({})
            });

        document.getElementById('imageInput').value = ''
    }

    onRouteChange = (route) => {
        if(route === 'signin'){
            this.setState(initialState)
        }

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

                        <Rank entries={this.state.user.entries} name={this.state.user.name}/>

                        <ImageLinkForm onInputChange = {this.onInputChange}
                                       onButtonSubmit = {this.onButtonSubmit}/>

                        <FaceRecognition box={this.state.box} imgUrl={this.state.imgUrl}/>
                    </div>

                    : (this.state.route === 'signin'
                        ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                        : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>)
                }

            </div>
        );
    }
}


const particlesInit = () => {};

const particlesLoaded = () => {};

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