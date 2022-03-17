import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import InputField from '../../../../components/FormControls/inputField';
import PassworField from '../../../../components/FormControls/passwordField';

RegisterForm.propTypes = {
    onSubmit: PropTypes.func,
};


const useStyles = makeStyles((theme) =>({
    root:{
        padding:theme.spacing(3),
        position:'relative'
    },

    avatar:{
        backgroundColor:theme.palette.secondary.main,
        margin:'0 auto',
    },

    title:{
        textAlign:'center',
        margin: theme.spacing(2,0,3,0),
    },

    submit:{
        margin:theme.spacing(2,0),
        
    },
    progress:{
        position:'absolute',
        top:theme.spacing(1),
        left:0,
        right:0,
    }
}))
function RegisterForm(props) {
    // tạo các props 

    const classes = useStyles();

    // validation with Yup
    const schema = yup.object().shape({
        fullName: yup.string()
            .required('Please enter your full name.')
            .test('Should has atleast two words.','Please enter atleast two words.',(value)=>{
                return value.trim().split(' ').length >= 2 ;
        }),
        email: yup.string()
            .required('Please enter your email address.')
            .email('Please enter an vaild email.')
        ,
        password: yup.string()
            .required('Please enter your password.')
            .min(6,'The password has at least six words.')
        ,
        retypePassword: yup.string().required('Please retype password again.')
        .oneOf([yup.ref('password'),null],'The password does not match')
    });

    // định nghĩa form
    const form = useForm({
        defaultValues:{
            fullName:'',
            email:'',
            password:'',
            retypePassword:'',
        },
        resolver: yupResolver(schema),
    });

    // thêm async await -> đợi hàm này chạy xong 
    const handleSubmit = async(values) =>{
        const {onSubmit} = props;
        if (onSubmit) {
            await onSubmit(values);
        }

        // form.reset();
        
    }

    // thêm isSubmitting trong form của formState
    const {isSubmitting} = form.formState;

    return (
        <div className={classes.root}>
            {/* đang submit thì sẽ show linear progress */}
            {isSubmitting && <LinearProgress className={classes.progress}/>}
            <Avatar className={classes.avatar}>
                <LockOutlined></LockOutlined>
            </Avatar>

            <Typography className={classes.title} component="h3" variant="h6">
                Create an Account
            </Typography>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField name="fullName" label="Full Name" form={form}/>
                <InputField name="email" label="Email" form={form}/>
                <PassworField name="password" label="Password" form={form}/>
                <PassworField name="retypePassword" label="Retype Password" form={form}/>
                <Button disabled={isSubmitting} type="submit" className={classes.submit} variant="contained" color="primary" fullWidth> Create an Account</Button>
            </form>
        </div>
    );
}

export default RegisterForm;