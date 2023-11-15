import instance from "../instance";

export const register = (data) => {
    return instance.post('/auth/register', data)
}

export const login = (data) => {
    return instance.post('/auth/login', data)
}

export const changePassword = (data) => {
    return instance.put('/auth/change-password/:id', data)
}

export const decodeToken = (token) => {
    return instance.get('/auth/decode?token=' + token)
}
