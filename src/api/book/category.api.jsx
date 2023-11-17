import instance from "../instance";

export const getCategories = () => {
    return instance.get('/category')
}

export const getCategoryById = (id) => {
    return instance.get('/category/' + id)
}

export const addCategory = (data) => {
    return instance.post('/category/add', data)
}

export const updateCategory = (id, data) => {
    return instance.put('/category/update/' + id, data)
}

export const removeCategory = (id) => {
    return instance.delete('/category/remove/' + id)
}
