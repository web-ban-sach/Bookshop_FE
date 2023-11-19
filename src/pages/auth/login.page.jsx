import { useForm, Controller } from "react-hook-form";
import { login } from "../../api/user/auth.api";
import { loginSchema } from "../../helper/auth.schema";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

export const LoginPage = () => {
    const navigate = useNavigate()

    const { handleSubmit, control, formState: { errors } } = useForm({
        mode: 'onBlur',
        resolver: async (data) => {
            try {
                await loginSchema.validate(data, { abortEarly: false })
                return { values: data, errors: {} }
            } catch (yupErrors) {
                return {
                    values: {},
                    errors: yupErrors.inner.reduce((allErrors, currentError) => {
                        return { ...allErrors, [currentError.path]: currentError.message };
                    }, {}),
                };
            }
        }
    })


    const onSubmit = async (data) => {
        try {
            const response = await login(data)
            if (response) {
                // Lưu token vào localStorage
                localStorage.setItem('token', response.data.token)
                window.alert('Đăng nhập thành công!')
                navigate('/')
            }
        } catch (error) {
            if (error.response) {
                window.alert(error.response.data.message)
            } else {
                window.alert(error.message)
            }
        }
    };

    return (
        <main className="w-full flex">
            <title>Login</title>
            <div className="flex-1 flex items-center justify-center h-screen">
                <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0">
                    <div className="">
                        <img src="https://floatui.com/logo.svg" width={150} className="lg:hidden" />
                        <div className="mt-5 space-y-2">
                            <Link to={'/'} className=" flex items-center text-sm text-indigo-600 hover:text-indigo-500 hover:underline" ><ArrowLeftOutlined className="mr-2" /> Back to home</Link>
                            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Login</h3>
                            <p className="">Do not have an account? <Link to={'/auth/register'} className="font-medium text-indigo-600 hover:text-indigo-500">Sign up</Link></p>
                        </div>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-5"
                    >
                        <div>
                            <label className="font-medium">
                                Username {errors?.username && <span className="text-red-500 text-xs">( {errors?.username} )</span>}
                            </label>
                            <Controller
                                name="username"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        placeholder="Enter your username"
                                        className="w-full px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                    />
                                )}
                            />
                        </div>
                        <div>
                            <label className="font-medium">
                                Password {errors?.password && <span className="text-red-500 text-xs">( {errors?.password} )</span>}
                            </label>
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="password"
                                        placeholder="Enter your password"
                                        className="w-full px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                    />
                                )}
                            />
                        </div>
                        <button
                            type="submit" className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
            <div className="relative flex-1 hidden items-center justify-center h-screen bg-indigo-500 lg:flex">
                <div className="relative z-10 w-full max-w-md">
                    <img src="https://res.cloudinary.com/dyewrrq39/image/upload/v1699954671/bookshop/gxwg1z51r02g4fiybngr.png" width={150} />
                    <div className=" mt-16 space-y-3">
                        <h3 className="text-white text-3xl font-bold">Welcome back to BookStore</h3>
                        <p className="text-gray-300">
                            Create an account and get access to all features for 30-days.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}
