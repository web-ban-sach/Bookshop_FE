import instance from "../instance"

export const getBooks = () => {
    return instance.get('/book')
}

export const getBookById = (id) => {
    return instance.get('/book' + id)
}

export const addBook = (data) => {
    return instance.post('/book', data)
}

export const updateBook = (id, data) => {
    return instance.put('/book' + id, data)
}

export const removeBook = (id) => {
    return instance.delete('/book' + id)
}

export const getBooksDetail = () => {
    return instance.get('/book')
}

export const getBookDetailById = (id) => {
    return instance.get('/book' + id)
}

export const addBookDetail = (data) => {
    return instance.post('/book', data)
}

export const updateBookDetail = (id, data) => {
    return instance.put('/book' + id, data)
}

export const removeBookDetail = (id) => {
    return instance.delete('/book' + id)
}
