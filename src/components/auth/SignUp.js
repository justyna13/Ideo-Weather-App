import React from "react";
import { connect } from 'react-redux';
import {NavLink, Redirect} from "react-router-dom";
import { signUp } from "../../store/actions/authActions";


class SignUp extends React.Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signUp(this.state);
    };

    render() {
        const { authError, currentUser } = this.props;

        if (currentUser) return <Redirect to="/" />
        else  return (
            <div className="wrapper container col-md-10">
                <form onSubmit={this.handleSubmit} className="auth__form">
                    <h5>Sign Up</h5>
                    <br/>

                    <div className="input-field form-item ">
                        <label htmlFor="firstName">First Name</label>
                        <input className="form-item__input" type="text" id="firstName" onChange={this.handleChange} />
                    </div>

                    <div className="input-field form-item ">
                        <label htmlFor="lastName">Last Name</label>
                        <input className="form-item__input" type="text" id="lastName" onChange={this.handleChange} />
                    </div>

                    <div className="input-field form-item ">
                        <label htmlFor="email">Email</label>
                        <input className="form-item__input" type="email" id="email" onChange={this.handleChange} />
                    </div>

                    <div className="input-field form-item ">
                        <label htmlFor="password">Password</label>
                        <input className="form-item__input" type="password" id="password" onChange={this.handleChange} />
                    </div>

                    <div className="input-field btn-submit col-md-6">
                        <button className="btn">Sign up</button>
                    </div>

                    <div className="red-text">
                        {authError ? <p>{authError}</p>: null}
                    </div>

                    <span>
                        Already have an account?<NavLink to='/signin'>Login</NavLink>
                    </span>

                </form>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        currentUser: state.auth.currentUser,
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
