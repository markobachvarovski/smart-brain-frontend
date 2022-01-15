import React from 'react';
import 'tachyons';
import '../Signin/Signin.css';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registerEmail: '',
            registerPassword: '',
            name: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({registerEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({registerPassword: event.target.value})
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    onSubmitRegister = () => {
        fetch('http://localhost:3001/register',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.registerEmail,
                password: this.state.registerPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if(user.id) {
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
                else{
                    this.props.onRouteChange('register');
                }
            })
    }

    goBack = () => {
        this.props.onRouteChange('signin')
    }

    render() {
        return(
            <article className="br3 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="font f2 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="font db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                                <input onChange={this.onNameChange}
                                    className="pa2 input-reset ba bg-transparent hover-white w-100"
                                       type="text" name="name" id="name"/>
                            </div>
                            <div className="mt3">
                                <label className="font db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input onChange={this.onEmailChange}
                                    className="pa2 input-reset ba bg-transparent hover-white w-100"
                                       type="email" name="email-address" id="email-address"/>
                            </div>
                            <div className="mv3">
                                <label className="font db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input onChange={this.onPasswordChange}
                                    className="b pa2 input-reset ba bg-transparent hover-white w-100"
                                       type="password" name="password" id="password"/>
                            </div>
                        </fieldset>
                        <div className="" style={{display:"flex", flexDirection: 'column', justifyContent:"center"}}>
                            <input onClick={this.onSubmitRegister} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib"
                                   type="submit" value="Register"/>
                            <input onClick={this.goBack} className="b mh3 mv2 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                   type="submit" value="Back"/>
                        </div>
                    </div>
                </main>
            </article>
        )
    }
}

export default Register;