import { Carousel } from 'antd';

const contentStyle = {
    color: '#fff',
    textAlign: 'center',
    background: '#364d79',
};

export const Slider = () => {
    const ListBanner = [
        {
            key: 1,
            url: "https://res.cloudinary.com/dyewrrq39/image/upload/v1700277701/bookshop/siryxmhjubyfnczlrwz4.png"
        },
        {
            key: 2,
            url: "https://res.cloudinary.com/dyewrrq39/image/upload/v1700277695/bookshop/akkkyht13vqp6xynlfje.png"
        },
        {
            key: 3,
            url: "https://res.cloudinary.com/dyewrrq39/image/upload/v1700277694/bookshop/nvmucdefxioz7vmxorkm.png"
        },
        {
            key: 4,
            url: "https://res.cloudinary.com/dyewrrq39/image/upload/v1700277694/bookshop/xrwd7pouvmmxrkx7dkhy.png"
        },
        {
            key: 5,
            url: "https://res.cloudinary.com/dyewrrq39/image/upload/v1700277694/bookshop/sagykdf8allnfoozklbe.png"
        },
    ]

    return <>
        <Carousel autoplay>
            {ListBanner.map((banner) => {
                return <div key={banner.key}>
                    <img style={contentStyle} src={banner.url} alt="" />
                </div>
            })}
        </Carousel>
    </>
}
