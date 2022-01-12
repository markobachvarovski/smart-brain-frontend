import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from './components/Rank/Rank';
import Particles from "react-tsparticles";

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
                speed: 3,
                straight: false,
        },
        number: {
            density: {
                enable: true,
                    area: 800,
            },
            value: 100,
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

function App() {
  return (
    <div className="App">
      <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={particleOptions}/>
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
        { /*<FaceRecognition /> */}
    </div>
  );
}

export default App;
