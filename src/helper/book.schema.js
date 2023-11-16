import * as yup from 'yup'

export const bookSchema = yup.object().shape({
    book_title: yup.string().required('Tên sách không được bỏ trống'),
    // description: yup.string().required('Mô tả về sách không được bỏ trống'),
    // category_id: yup.string().required('Yêu cầu chọn danh mục'),
    // author_id: yup.array().of(yup.string().required('Yêu cầu chọn tác giả')),
    // thumbnail: yup.string().required('Yêu cầu thêm ảnh'),
    // quantity: yup.number().required('Số lượng sách không được bỏ trống'),
    // old_price: yup.number().required('Giá thị trường không được bỏ trống'),
    // sale: yup.number(),
    // publisher_id: yup.string().required('Yêu cầu chọn nhà xuất bản')
})
