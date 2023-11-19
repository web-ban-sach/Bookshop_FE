import instance from "../instance";

export const getCartByUserId = (id) => {
    return instance.get('/cart/' + id)
}

export const addCart = (data) => {
    return instance.post('/cart/add', data)
}

export const updateCart = (id, data) => {
    return instance.put('/cart/update/' + id, data)
}

export const removeCart = (id) => {
    return instance.delete('/cart/remove/' + id)
}
