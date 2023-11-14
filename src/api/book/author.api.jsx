import instance from "../instance"

export const getAuthors = () => {
    return instance.get('/author')
}

export const getAuthorById = (id) => {
    return instance.get('/author' + id)
}

export const addAuthor = (data) => {
    return instance.post('/author', data)
}

export const updateAuthor = (id, data) => {
    return instance.put('/author' + id, data)
}

export const removeAuthor = (id) => {
    return instance.delete('/author' + id)
}
