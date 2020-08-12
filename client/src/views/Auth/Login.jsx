import React from "react";
import PropTypes from 'prop-types'; 
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {Typography} from '@material-ui/core/';
import {withFormik, Form, Field} from "formik";
import {TextField, CheckboxWithLabel} from 'formik-material-ui';
import * as Yup from "yup";
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Button from "components/CustomButtons/Button.js";
import {loginUser} from 'redux/actions/auth';


const Login = ({values, isSubmitting, isAuthenticated}) => {

    // Redirect if is authenticated
    if(isAuthenticated){
        return <Redirect to='/admin' />
    }

    return (
        <GridContainer direction="column" justify="center" alignItems="center">
            <Form>
                <GridItem>
                    <h1>Sign-IN</h1>
                </GridItem>
                <GridItem>
                    <Typography>Sign in to your account</Typography>
                </GridItem>
                <GridItem>
                    <Field type="email" name="email" placeholder="EM@IL" component={TextField}/>
                </GridItem>
                <GridItem>
                    <Field
                        type="password"
                        name="password"
                        placeholder="P@$$word"
                        component={TextField}/>
                </GridItem>
                <GridItem>
                    <Field
                        type="checkbox"
                        name="keepSign"
                        checked={values.keepSign}
                        color="primary"
                        component={CheckboxWithLabel}
                        Label={{
                        label: "Keep me Signed in"
                    }}/>
                </GridItem>
                <GridItem>
                    <Button disabled={isSubmitting} type="submit" color="info">Sign In</Button>
                </GridItem>
            </Form>
            <GridItem>
                <Typography>
                    Don't have an account?
                    <Link to="/auth/register">Sign UP</Link>
                </Typography>
            </GridItem>
        </GridContainer>
    )
}

const FormikLogin = withFormik({
    mapPropsToValues(props) {
        return {userName: "", email: "", password: "", keepSign: true}
    },
    validationSchema: Yup
        .object()
        .shape({
            email: Yup
                .string()
                .email("Email is not valid")
                .required("Email address is required"),
            password: Yup
                .string()
                .required("Password is required")
        }),
    handleSubmit(values, FormikBag) {
             const {props, resetForm, setSubmitting} = FormikBag;
                const payload = {
                    email: values.email,
                    password: values.password,
                    keepSignIn: values.keepSign
                }
                props.loginUser(payload);
                resetForm();           
            setSubmitting(false);
    }
})(Login);

const mapStateToProps = (state) =>({
    isAuthenticated: state.auth.isAuthenticated
})

const mapDispachToProps = dispatch => {
    return{
        loginUser: (payload) => dispatch(loginUser(payload))
    }
}

FormikLogin.propTypes = {
    loginUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

export default connect(mapStateToProps, mapDispachToProps)(FormikLogin);