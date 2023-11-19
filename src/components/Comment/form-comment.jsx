import { Avatar, Button, Card, Form, List, Rate, Skeleton } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { decodeToken } from '../../api/user/auth.api'
import { addComment, getCommentByBookId } from '../../api/common/comment.api'
import ListComment from './list-comment'

const count = 3

// eslint-disable-next-line react/prop-types
const FormComment = ({ book_id }) => {
    const token = localStorage.getItem('token')
    const [user, setUser] = useState({})
    const [dataCmt, setDataCmt] = useState([])
    const [listCmt, setListCmt] = useState([])
    const [sortType, setSortType] = useState('newest');
    const [form] = Form.useForm();

    useEffect(() => {
        if (token) {
            const fetchToken = async () => {
                await decodeToken(token).then((res) => {
                    setUser(res.data.data);
                })
            }
            fetchToken()
        }
        const fetchComment = async () => {
            await getCommentByBookId(book_id)
                .then((res) => {
                    const sortedComments = res?.data?.data?.reverse()
                    setDataCmt(sortedComments)
                    setListCmt(sortedComments.slice(0, count));
                })
        }
        fetchComment()
    }, [token, book_id])

    const sortComments = (type) => {
        setSortType(type);
        // Sao chép mảng comments để tránh ảnh hưởng đến state gốc
        const sortedComments = [...dataCmt];

        // Sắp xếp mảng dựa trên kiểu sắp xếp
        if (type === 'newest') {
            // none
        } else if (type === 'oldest') {
            sortedComments.reverse();
        }

        setDataCmt(sortedComments);
        setListCmt(sortedComments)
    };

    const onLoadMore = async () => {
        if (dataCmt.length === 0) {
            setListCmt(
                dataCmt.concat(
                    [...new Array(count)].map(() => ({
                        loading: true,
                    })),
                ),
            );
        }
        await getCommentByBookId(book_id)
            .then((res) => {
                const newData = dataCmt.concat(res.data.data.filter(newItem => !dataCmt.some(item => item._id === newItem._id)))
                setDataCmt(newData);
                setListCmt(newData.slice(0, count + listCmt.length));

                window.dispatchEvent(new Event('resize'));
            });
    };

    const loadMore =
        dataCmt.length > 0 ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button onClick={onLoadMore}>loading more</Button>
            </div>
        ) : null;

    //Thêm bình luận và render lại list bình luận
    const onFinish = async (values) => {
        const comment = {
            user_id: user._id,
            book_id: book_id,
            description: values?.description,
            rate: values?.rate
        }
        // await addComment(comment).then((res) => console.log(res))
        await addComment(comment).then((res) => {
            window.alert(res.data.message);
            form.resetFields()
            const fetchComment = async () => {
                await getCommentByBookId(book_id)
                    .then((res) => {
                        const sortedComments = res?.data?.data?.reverse()
                        setDataCmt(sortedComments)
                        setListCmt(sortedComments.slice(0, count));
                    })
            }
            fetchComment()
        })
    };

    return <>
        <Card title={`${dataCmt.length} bình luận`} extra={
            <>
                <label>Sắp xếp theo: </label>
                <select onChange={(e) => sortComments(e.target.value)} value={sortType}>
                    <option value="newest">Mới nhất</option>
                    <option value="oldest">Cũ nhất</option>
                </select>
            </>
        }>
            <Form form={form} onFinish={onFinish} className=' mb-10'>
                <div className="flex gap-3">
                    {user?.avatar
                        ? <Avatar className="border border-slate-200 w-14 h-14" src={user?.avatar} />
                        : <Avatar className="border border-slate-200 w-14 h-14" src="https://res.cloudinary.com/dyewrrq39/image/upload/v1700105007/bookshop/zsvvhe07vdiolrwrwpd5.png" />}
                    <Form.Item
                        className="w-full"
                        name="description"
                        rules={[{ required: true, message: 'Không bỏ trống!' }]}>
                        <TextArea rows={3} placeholder="Nêu cảm nghĩ của bạn" />
                    </Form.Item>
                </div>
                <div className="flex justify-between px-16 h-6 leading-6">
                    <Form.Item
                        name="rate"
                        label="Rate"
                        rules={[{ required: true, message: 'Mời đánh giá!' }]}>
                        <Rate />
                    </Form.Item>
                    <Form.Item>
                        {!token
                            ? < Link to={'/auth/login'}>
                                <Button type="primary" className=" border-blue-500 text-blue-500" htmlType="submit">
                                    Login to comment
                                </Button>
                            </Link>
                            : <Button type="submit" className=" border-blue-500 text-blue-500" htmlType="submit">
                                Post
                            </Button>
                        }
                    </Form.Item>
                </div>
            </Form >
            {listCmt?.length == 0
                ? <p className=" mt-[40px] text-slate-400">Chưa có bình luận nào</p>
                : <List
                    className=" w-full"
                    loadMore={loadMore}
                    dataSource={listCmt}
                    renderItem={(item) => (
                        <Skeleton avatar title={false} loading={item.loading} active>
                            <ListComment key={item?._id} {...item} />
                        </Skeleton>
                    )}
                />
            }
        </Card>
    </>
}

export default FormComment
