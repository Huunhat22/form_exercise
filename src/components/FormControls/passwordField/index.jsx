import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

PassworField.propTypes = {
    form:PropTypes.object.isRequired,
    name:PropTypes.string.isRequired,

    label:PropTypes.string,
    disable:PropTypes.bool,
};

function PassworField(props) {
    const{form,name,label,disable} = props;
    const {control} = form;

    // tạo một hook showpassword
    const [showPassword, setShowPassword] = useState(false);

    // hàm show password
    const handleClickShowPassword = () =>{
        setShowPassword(!showPassword)
    }
    return (
        <Controller
            name={name}
            control={control}
            render={({field:{onChange,onBlur,name,values},fieldState:{error,invalid}}) =>(
                <FormControl error={invalid} fullWidth margin="normal" variant="outlined">
                    <InputLabel >{label}</InputLabel>
                    <OutlinedInput
                        id={name}
                        error={invalid}
                        label={label}
                        type={showPassword ? 'text' : 'password'}
                        value={values}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                            >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                        }
                        onChange={onChange}
                        onBlur={onBlur}
                    
                    />
                    <FormHelperText contained="true" variant="outlined" error={invalid}>{error?.message}</FormHelperText>
                </FormControl>
            )}
        >
        </Controller>
    );
}

export default PassworField;