import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
    // các props từ trên component cha truyền xuống,form vs name là 2 props quan trọng phải có
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool,
};

function InputField(props) {
    // lấy các props ở trên
    const {form,name,label,disabled} = props;
    const {control} = form;
    
    return (
        // sử dụng controller trong React hook form để control các thuộc tính của TextField
        <Controller
            name={name}
            control={control}
            render = {({field:{onChange,onBlur,value,name},fieldState:{invalid,error}}) =>(
                <TextField
                    margin="normal"
                    variant= "outlined"
                    fullWidth
                    label={label}
                    disabled={disabled}
                    value={value}
                    name={name}
                    onChange={onChange}
                    onBlur={onBlur} 
                    error={invalid}
                    // dấu ? là không chắc, có hoặc không có message
                    helperText={error?.message}
                />
            )}
        ></Controller>
    );
}

export default InputField;