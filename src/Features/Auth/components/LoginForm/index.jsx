import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import InputField from '../../../../components/FormControls/inputField';
import PassworField from '../../../../components/FormControls/passwordField';

LoginForm.propTypes = {
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
function LoginForm(props) {
    // tạo các props 

    const classes = useStyles();

    // validation with Yup
    const schema = yup.object().shape({
        identifier: yup.string()
            .required('Please enter your Email.').email('The email or user name does not match.')
            ,
        password: yup.string()
            .required('Please enter your password.')
            .min(6,'The password has at least six words.')
        ,
    });

    // định nghĩa form
    const form = useForm({
        defaultValues:{
            identifier:'',
            password:'',
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
                Sign In
            </Typography>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField name="identifier" label="Email" form={form}/>
                <PassworField name="password" label="Password" form={form}/>
                <Button disabled={isSubmitting} type="submit" className={classes.submit} variant="contained" color="primary" fullWidth> Sign In</Button>
            </form>
        </div>
    );
}

export default LoginForm;