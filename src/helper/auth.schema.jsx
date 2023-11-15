import * as yup from 'yup';

export const registerSchema = yup.object().shape({
    fullname: yup.string().required('Họ tên không được bỏ trống'),
    username: yup.string().required('Tài khoản không được bỏ trống').matches(/^[a-zA-Z0-9_]+$/, 'Tài khoản không được chứa kí tự đặc biệt'),
    email: yup.string().email('Email không đúng định dạng').required('Email không được bỏ trống'),
    password: yup.string().min(6, 'Mật khẩu chứa tối thiểu 6 kí tự').required('Mật khẩu không được bỏ trống'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Xác nhận mật khẩu không đúng').required('Yêu cầu xác nhận mật khẩu')
})

export const loginSchema = yup.object().shape({
    username: yup.string().required('Tài khoản không được bỏ trống').matches(/^[a-zA-Z0-9_]+$/, 'Tài khoản không được chứa kí tự đặc biệt'),
    password: yup.string().min(6, 'Mật khẩu chứa tối thiểu 6 kí tự').required('Mật khẩu không được bỏ trống'),
})
