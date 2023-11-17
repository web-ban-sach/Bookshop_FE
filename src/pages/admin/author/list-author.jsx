import { useEffect, useState } from 'react';
import { Button, List, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';
import { getAuthors } from '../../../api/book/author.api';

const count = 4;
const ListAuthor = () => {
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            await getAuthors().then((res) => {
                setInitLoading(false);
                setData(res.data.data);
                setList(res.data.data.slice(0, count));
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
                        author_name: {},
                        description: {},
                    })),
                ),
            );
        }
        getAuthors()
            .then((res) => {
                const newData = data.concat(res.data.data.filter(newItem => !data.some(item => item._id === newItem._id)))
                setData(newData);
                setList(newData.slice(0, count + list.length));
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
                <h1 className=' font-bold text-[25px]'>List Author ({data.length} author)</h1>
                <Link to={'/admin/author/add'} className=' text-blue-400 hover:text-blue-600 hover:underline'>Add a new author <ArrowRightOutlined /></Link>
            </div>
            <List
                className="demo-loadmore-list"
                loading={initLoading}
                itemLayout="horizontal"
                loadMore={loadMore}
                dataSource={list}
                renderItem={(item, index) => (
                    <List.Item
                        actions={[<Link to={`/admin/author/details/${item._id}`} key="see-details">See more details</Link>]}
                    >
                        <Skeleton avatar title={false} loading={item.loading} active>
                            <List.Item.Meta
                                title={<p className='font-bold'>{index + 1}. {item.author_name}</p>}
                                description={<p >{item.description}</p>}
                            >
                            </List.Item.Meta>
                        </Skeleton>
                    </List.Item>
                )}
            />
        </>
    );
};
export default ListAuthor;
