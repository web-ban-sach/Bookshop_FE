import { useEffect, useState } from 'react';
import { Button, List, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';
import { getPublishers } from '../../../api/book/publisher.api';

const count = 4;
const ListPublisher = () => {
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            await getPublishers().then((res) => {
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
                        publisher_name: {},
                        description: {},
                    })),
                ),
            );
        }
        getPublishers()
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
                <h1 className=' font-bold text-[25px]'>List Publisher ({data.length} publisher)</h1>
                <Link to={'/admin/publisher/add'} className=' text-blue-400 hover:text-blue-600 hover:underline'>Add a new publisher <ArrowRightOutlined /></Link>
            </div>
            <List
                count={4}
                className="demo-loadmore-list"
                loading={initLoading}
                itemLayout="horizontal"
                loadMore={loadMore}
                dataSource={list}
                renderItem={(item, index) => (
                    <List.Item
                        actions={[<Link to={`/admin/publisher/details/${item._id}`} key="see-details">See more details</Link>]}
                    >
                        <Skeleton avatar title={false} loading={item.loading} active>
                            <List.Item.Meta
                                title={<p className='font-bold'>{index + 1}. {item.publisher_name}</p>}
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
export default ListPublisher;
