import instance from "../instance";

export const register = (data) => {
    return instance.post('/auth/register', data)
}

export const login = (data) => {
    return instance.post('/auth/login', data)
}

export const changePassword = (id, data, token) => {
    return instance.put('/auth/change-password/' + id, data, {
        headers: {
            Authorization: `Bearer ${token}`,
            // Các headers khác nếu cần thiết
        },
    })
}

export const changeProfile = (id, data, token) => {
    return instance.put('/auth/change-info/' + id, data, {
        headers: {
            Authorization: `Bearer ${token}`,
            // Các headers khác nếu cần thiết
        },
    })
}

export const decodeToken = (token) => {
    return instance.get('/auth/decode?token=' + token)
}
