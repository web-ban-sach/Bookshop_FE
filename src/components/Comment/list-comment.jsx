import { DeleteOutlined, EditOutlined, StarFilled } from "@ant-design/icons"
import { Avatar, Card, Skeleton } from "antd"
import Meta from "antd/es/card/Meta"
import { decodeToken } from "../../api/user/auth.api"
import { useEffect, useState } from "react"
import { removeComment } from "../../api/common/comment.api"

const ListComment = (comment) => {
    const { _id, user_id, description, rate } = comment
    const token = localStorage.getItem('token')
    const [user, setUser] = useState({})

    useEffect(() => {
        if (token) {
            const fetchToken = async () => {
                await decodeToken(token).then((res) => {
                    setUser(res.data.data);
                })
            }
            fetchToken()
        }
    }, [token])

    return <>
        <Card
            key={_id}
            style={{ marginBottom: 20 }}
            actions={user?._id === user_id._id
                ? [
                    <EditOutlined key="edit" />,
                    <DeleteOutlined key="delete" onClick={() => {
                        if (window.confirm('Bạn có chắc?')) {
                            removeComment(_id).then(() => {
                                window.alert('Đã xóa bình luận')
                                window.location.reload()
                            })
                        }
                    }} />,
                ]
                : []}
        >
            <Skeleton loading={false} avatar active>
                <Meta
                    avatar={user_id?.avatar
                        ? <Avatar className="border border-slate-200" src={user_id.avatar} />
                        : <Avatar className="border border-slate-200" src="https://res.cloudinary.com/dyewrrq39/image/upload/v1700105007/bookshop/zsvvhe07vdiolrwrwpd5.png" />}
                    title={<div className="flex justify-between">
                        <p>{user_id?.fullname}</p>
                        <p>{rate}<StarFilled className=" text-yellow-300" /></p>
                    </div>}
                    description={description}
                />
            </Skeleton>
        </Card>
    </>
}

export default ListComment
