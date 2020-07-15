import React from "react";
import {NavLink, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn } from "../../store/actions/authActions";

class SignIn extends React.Component {
    state = {
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
        this.props.signIn(this.state);
    };

    render() {
        const { authError, currentUser } = this.props;

        if (currentUser) return <Redirect to="/" />
        else return (
            <div className="login-box wrapper container col-md-10">
                <form onSubmit={this.handleSubmit} className="login-box__form auth__form">
                    <h5>Login</h5>
                    <br/>
                    <div className="form-group col-md-6 form-item">
                        <label htmlFor="email">Email</label>
                        <input className="form-item__input" type="email" id="email" onChange={this.handleChange} />
                    </div>

                    <div className="form-group col-md-6 form-item">
                        <label htmlFor="password">Password</label>
                        <input className="form-item__input" type="password" id="password" onChange={this.handleChange} />
                    </div>

                    <div className="input-field btn-submit col-md-6">
                        <button className="btn btn-outline-dark">Login</button>
                    </div>

                    <div className="red-text">
                        { authError ? <p>{authError}</p>: null }
                    </div>

                    <span>
                        You don't have an account?<NavLink to='/signup'> Join now</NavLink>
                    </span>

                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.auth.currentUser,
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
