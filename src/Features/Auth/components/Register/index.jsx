import { unwrapResult } from '@reduxjs/toolkit';
import { register } from 'Features/Auth/userSlice';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import RegisterForm from '../RegisterForm';

Register.propTypes = {
    closeDialog: PropTypes.func,
};


function Register(props) {
    const dispatch = useDispatch();

    // SỬ DỤNG SNACKBAR TRONG NOTISTACK
    const { enqueueSnackbar } = useSnackbar();

    // tao handle handleSubmit
    const handleSubmit = async (values)=>{
        // tạo try catch vì trường hợp sai thì nó sẽ nhảy vào logs lỗi
        console.log("form register : ",values);
        try {
            // auto set username = email. vì trong quy định của api khóa học
            values.username = values.email;
            // values là các giá trị trong form
            const action = register(values);

            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction)

            // đóng form sau khi register
            const {closeDialog} = props;
            if (closeDialog) {
                closeDialog();
            }
            // hiển thị snackbar sau khi register
            enqueueSnackbar('Register succsessfuly!',{variant:'success'});

            // console.log('New user ', user);
        } catch (error) {
            //  console.log('Faild to register :',error.message);
            enqueueSnackbar(error.message,{variant:'error'});
        }
    };
    
    return (
        <div>
            <RegisterForm onSubmit={handleSubmit}></RegisterForm>
        </div>
    );
}

export default Register;