import React from 'react';
import 'tachyons';
import './Signin.css';

class Signin extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn = () => {
        fetch('https://limitless-cove-41492.herokuapp.com/signin',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id){
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
                else{
                    this.props.onRouteChange('signin');
                }
            })
    }

    goRegister = () => {
        this.props.onRouteChange('register')
    }

    render(){
        return(
            <article className="br15 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center" style={{marginTop: '90px'}}>
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="font f2 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="font db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input onChange={this.onEmailChange}
                                    className="pa2 input-reset br15 ba bg-transparent hover-white w-100"
                                       type="email" name="email-address" id="email-address"/>
                            </div>
                            <div className="mv3">
                                <label className="font db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input onChange={this.onPasswordChange}
                                    className="b pa2 input-reset br15 ba bg-transparent hover-white w-100"
                                       type="password" name="password" id="password"/>
                            </div>
                        </fieldset>
                        <div className="" style={{display:"flex", flexDirection: 'column', justifyContent:"center"}}>
                            <input onClick={this.onSubmitSignIn} className="b br15 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib"
                                   type="submit" value="Sign in"/>
                            <input onClick={this.goRegister} className="b mh3 br15 mv2 ph0 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                   type="submit" value="Register"/>
                        </div>
                    </div>
                </main>
            </article>
        )
    }
}

export default Signin;