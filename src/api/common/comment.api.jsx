import instance from "../instance";

export const getCommentByBookId = (id) => {
    return instance.get('/comment/' + id)
}

export const addComment = (data) => {
    return instance.post('/comment/add', data)
}

export const updateComment = (id, data) => {
    return instance.put('/comment/update/' + id, data)
}

export const removeComment = (id) => {
    return instance.delete('/comment/remove/' + id)
}
