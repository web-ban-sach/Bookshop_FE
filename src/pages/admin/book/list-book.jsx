import { useEffect, useState } from 'react';
import { Button, List, Skeleton } from 'antd';
import { getBooks } from '../../../api/book/book.api';
import { Link } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';

const count = 8;
const LishBook = () => {
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            await getBooks().then((res) => {
                setInitLoading(false);
                setData(res.data.data);
                setList(res.data.data);
            });
        }
        fetchData()
    }, []);
    const onLoadMore = () => {
        setLoading(true);
        if (data.length === 0) {
            setList(
                data.concat(
                    [...new Array(count)].map(() => ({
                        loading: true,
                        book_title: {},
                        thumbnail: {},
                        description: {},
                    })),
                ),
            );
        }
        getBooks()
            .then((res) => {
                const newData = data.concat(res.data.data.filter(newItem => !data.some(item => item._id === newItem._id)))
                setData(newData);
                setList(newData);
                setLoading(false);

                window.dispatchEvent(new Event('resize'));
            });
    };
    const loadMore =
        !initLoading && !loading && data.length > 0 ? (
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
    return (
        <>
            <div className=' flex justify-between h-40px leading-[40px] mb-5'>
                <h1 className=' font-bold text-[25px]'>List Book</h1>
                <Link to={'/admin/book/add'} className=' text-blue-400 hover:text-blue-600 hover:underline'>Add a new book <ArrowRightOutlined /></Link>
            </div>
            <List
                className="demo-loadmore-list"
                loading={initLoading}
                itemLayout="horizontal"
                loadMore={loadMore}
                dataSource={list}
                renderItem={(item) => (
                    <List.Item
                        actions={[<Link to={'/admin/book/edit'} key="edit-book">Edit</Link>, <Link to={`/admin/book/details/${item._id}`} key="see-details">See details</Link>]}
                    >
                        <Skeleton avatar title={false} loading={item.loading} active>
                            <List.Item.Meta
                                avatar={<img className=' w-12' src={item.thumbnail} />}
                                title={<p>{item.book_title}</p>}
                                description={<p className=' w-[500px] overflow-hidden overflow-ellipsis line-clamp-2'>{item.description}</p>}
                            >
                            </List.Item.Meta>
                        </Skeleton>
                        <div>{item.publisher_id?.publisher_name}</div>
                        
                    </List.Item>
                )}
            />
        </>
    );
};
export default LishBook;
