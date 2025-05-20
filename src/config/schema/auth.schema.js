import * as yup from 'yup';
import { PASSWORD, PHONE_NUMBER } from '../../regex/index';

export const loginSchema = () => {
    const schema = yup.object({
        email: yup.string()
            .required(
                'Email is required'
            )
            .email(
                'Please enter valid email'
            ),

        password: yup.string().required(
            'Password is required'
        ),
        rememberMe: yup.boolean().optional(),
    })

    return schema
}

export const signUpSchema = () => {
    const schema = yup.object({
        firstname: yup.string().required('First name is required'),
        lastname: yup.string().required('Last name is required'),

        email: yup
            .string()
            .email('Please enter a valid email')
            .required('Email is required'),

        contactNumber: yup
            .string()
            .matches(PHONE_NUMBER, 'Please enter a valid contact number')
            .required('Phone number is required'),

        address: yup.string().required('Address is required'),

        password: yup
            .string()
            .matches(PASSWORD, 'Password must contain at least 1 uppercase, 1 lowercase, 1 special character, and be 8+ characters')
            .required('Password is required'),

        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password')], 'Passwords must match')
            .required('Confirm password Your Password'),
    })

    return schema
}
