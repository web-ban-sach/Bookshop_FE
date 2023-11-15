import instance from "../instance"

export const getBooks = () => {
    return instance.get('/book/read')
}

export const getBookById = (id) => {
    return instance.get('/book/read/' + id)
}

export const addBook = (data) => {
    return instance.post('/book/add', data)
}

export const updateBook = (id, data) => {
    return instance.put('/book/update/' + id, data)
}

export const removeBook = (id) => {
    return instance.delete('/book/remove' + id)
}

