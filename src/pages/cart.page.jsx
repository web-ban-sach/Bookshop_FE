import { useEffect, useState } from "react"
import { decodeToken } from "../api/user/auth.api"
import { getCartByUserId, removeCart, updateCart } from "../api/common/cart.api"

const CartPage = () => {
    const token = localStorage.getItem('token')
    const [user_id, setUserId] = useState('')
    const [carts, setCarts] = useState('')

    useEffect(() => {
        decodeToken(token)
            .then((res) => {
                setUserId(res.data.data._id);
            })
    }, [token])

    useEffect(() => {
        if (user_id) {
            getCartByUserId(user_id)
                .then((res) => {
                    setCarts(res.data.data);
                })
        }
    }, [user_id])

    return <>
        <section>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div className="mx-auto max-w-3xl">
                    <header className="text-center">
                        <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Your Cart</h1>
                    </header>

                    <div className="mt-8">
                        <ul className="space-y-4">
                            {carts?.cart?.map((cart) => {
                                const formattedNewPrice = new Intl.NumberFormat('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND',
                                }).format(cart.new_price)
                                return <> <li className="flex gap-4">
                                    <img
                                        src={cart.thumbnail}
                                        alt=""
                                        className="w-16 object-cover"
                                    />

                                    <div>
                                        <h3 className=" text-base text-gray-900 font-bold">{cart.book_title}</h3>

                                        <dl className="mt-0.5 space-y-px text-[12px] text-gray-600">
                                            <div>
                                                <dt className="inline">Tác giả: </dt>
                                                <dd className="inline">{cart.author_id?.map((author, index) => {
                                                    return <span key={index}>
                                                        {author.author_name}
                                                        {index < cart.author_id.length - 1 && ', '}
                                                    </span>
                                                })}</dd>
                                            </div>

                                            <div>
                                                <dt className="inline">Danh mục: </dt>
                                                <dd className="inline">{cart.category_name}</dd>
                                            </div>

                                            <div>
                                                <dt className="inline">Giá: </dt>
                                                <dd className="inline">{formattedNewPrice}</dd>
                                            </div>
                                        </dl>
                                    </div >

                                    <div className="flex flex-1 items-center justify-end gap-2">
                                        <form>
                                            <label htmlFor="Line1Qty" className="sr-only"> Quantity </label>

                                            <input
                                                type="number"
                                                min="1"
                                                defaultValue={cart.quantity}
                                                onChange={async (e) => {
                                                    const quantity = e.target.value
                                                    await updateCart(cart.cart_id, { quantity })
                                                    await getCartByUserId(user_id).then((res) => {
                                                        setCarts(res.data.data);
                                                    })
                                                }}
                                                id="Line1Qty"
                                                className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                                            />
                                        </form>

                                        <button onClick={async () => {
                                            if (window.confirm('Bạn muốn xóa sản phẩm này khỏi giỏ hàng?')) {
                                                await removeCart(cart.cart_id).then(async () => {
                                                    window.alert('Xóa thành công!')
                                                    await getCartByUserId(user_id).then((res) => {
                                                        setCarts(res.data.data);
                                                    })
                                                })
                                            }
                                        }}
                                            className="text-gray-600 transition hover:text-red-600">
                                            <span className="sr-only">Remove item</span>

                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="h-4 w-4"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </li>
                                </>
                            })}

                        </ul>
                        <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                            <div className="w-screen max-w-lg space-y-4">
                                <dl className="space-y-0.5 text-sm text-gray-700">
                                    <div className="flex justify-between">
                                        <dt>Subtotal</dt>
                                        <dd>{carts?.totalOldMoney} đ</dd>
                                    </div>

                                    <div className="flex justify-between">
                                        <dt>Discount</dt>
                                        <dd>-{carts?.discount} đ</dd>
                                    </div>

                                    <div className="flex justify-between !text-base font-medium">
                                        <dt>Total</dt>
                                        <dd>{carts.totalMoney} đ</dd>
                                    </div>
                                </dl>
                                <div className="flex justify-end">
                                    <a
                                        href="#"
                                        className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                                    >
                                        Checkout
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </section >
    </>
}

export default CartPage
