import instance from "../instance";

export const register = (data) => {
    return instance.post('/register', data)
}

export const login = (data) => {
    return instance.post('/login', data)
}

export const changePassword = (data) => {
    return instance.put('/change-password/:id', data)
}
