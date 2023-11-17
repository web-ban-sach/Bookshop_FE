import instance from "../instance";

export const getPublishers = () => {
    return instance.get('/publisher')
}

export const getPublisherById = (id) => {
    return instance.get('/publisher/' + id)
}

export const addPublisher = (data) => {
    return instance.post('/publisher/add', data)
}

export const updatePublisher = (id, data) => {
    return instance.put('/publisher/update/' + id, data)
}

export const removePublisher = (id) => {
    return instance.delete('/publisher/remove/' + id)
}
