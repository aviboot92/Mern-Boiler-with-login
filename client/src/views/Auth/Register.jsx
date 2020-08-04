import React from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Typography} from '@material-ui/core/';
import {withFormik, Form, Field} from "formik";
import {TextField, CheckboxWithLabel} from 'formik-material-ui';
import * as Yup from "yup";
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Button from "components/CustomButtons/Button.js";
import {registerUser} from 'redux/actions/auth'; 


const Register = ({values, isSubmitting}) => {
    return (
        <GridContainer direction="column" justify="center" alignItems="center">
            <Form>
                <GridItem>
                    <h1>Sign-UP</h1>
                </GridItem>
                <GridItem>
                    <Typography>Create Your Account</Typography>
                </GridItem>
                <GridItem>
                    <Field type="text" name="userName" placeholder="NAME" component={TextField}/>
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
                        type="password"
                        name="password2"
                        placeholder="Confirm P@$$word"
                        component={TextField}/>
                </GridItem>
                <GridItem>
                    <Field
                        name="terms"
                        type="checkbox"
                        checked={values.terms}
                        color="primary"
                        component={CheckboxWithLabel}
                        Label={{
                        label: "Accepting terms and conditions*"
                    }}/>
                </GridItem>
                <GridItem>
                    <Button disabled={!values.terms || isSubmitting} type="submit" color="info">Register</Button>
                </GridItem>
            </Form>
            <GridItem>
                <Typography>
                    Already have an account?
                    <Link to="/login">Sign IN</Link>
                </Typography>
            </GridItem>
        </GridContainer>
    )
}

const FormikRegister = withFormik({
    mapPropsToValues(props) {
        return {userName: "", email: "", password: "", password2: "", terms: true}
    },
    validationSchema: Yup
        .object()
        .shape({
            userName: Yup
                .string()
                .required("Name is required"),
            email: Yup
                .string()
                .email("Email is not valid")
                .required("Email address is required"),
            password: Yup
                .string()
                .min(8, "Password should be minimum length of 8 charectars")
                .required("Password is required"),
            password2: Yup
                .string()
                .min(8, "Password should be minimum length of 8 charectars")
                .required("Password match is required")
        }),
    handleSubmit(values, FormikBag) {
        const {props, resetForm, setErrors, setSubmitting} = FormikBag;
            if (values.password !== values.password2) {
                setErrors({password: 'Passwords mismatch', password2: 'Passwords mismatch'});
            } else {
                const payload = {
                    name: values.userName,
                    email: values.email,
                    password: values.password
                }
                props.registerUser(payload);
                resetForm();
            }
            setSubmitting(false);
    }
})(Register);

const mapDispachToProps = dispatch => {
    return{
        registerUser: (payload) => dispatch(registerUser(payload))
    }
}

export default connect(null, mapDispachToProps)(FormikRegister);