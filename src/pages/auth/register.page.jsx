import { useForm, Controller } from "react-hook-form";
import { registerSchema } from "../../helper/auth.schema";
import { register } from "../../api/user/auth.api";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

export const RegisterPage = () => {
    const navigate = useNavigate()

    const { handleSubmit, control, formState: { errors } } = useForm({
        mode: 'onBlur',
        resolver: async (data) => {
            try {
                await registerSchema.validate(data, { abortEarly: false })
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

    // Hàm xử lý khi submit form
    const onSubmit = async (data) => {
        try {
            await register(data)
            window.alert('Đăng ký thành công!')
            navigate("/auth/login")
        } catch (error) {
            if (error) {
                window.alert(error.response.data.message)
            }
        }
    };


    return (
        <main className="w-full flex">
            <title>Sign up</title>
            <div className="relative flex-1 hidden items-center justify-center h-screen bg-indigo-500 lg:flex">
                <div className="relative z-10 w-full max-w-md">
                    <img src="https://res.cloudinary.com/dyewrrq39/image/upload/v1699954671/bookshop/gxwg1z51r02g4fiybngr.png" width={150} />
                    <div className=" mt-16 space-y-3">
                        <h3 className="text-white text-3xl font-bold">Welcome to BookStore</h3>
                        <p className="text-gray-300">
                            Create an account and get access to all features for 30-days, No c.
                        </p>
                        <div className="flex items-center -space-x-2 overflow-hidden">
                            <img src="https://randomuser.me/api/portraits/women/79.jpg" className="w-10 h-10 rounded-full border-2 border-white" />
                            <img src="https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg" className="w-10 h-10 rounded-full border-2 border-white" />
                            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=a72ca28288878f8404a795f39642a46f" className="w-10 h-10 rounded-full border-2 border-white" />
                            <img src="https://randomuser.me/api/portraits/men/86.jpg" className="w-10 h-10 rounded-full border-2 border-white" />
                            <img src="https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e" className="w-10 h-10 rounded-full border-2 border-white" />
                            <p className="text-sm text-gray-400 font-medium translate-x-5">
                                Join 5.000+ users
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1 flex items-center justify-center h-screen">
                <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0">
                    <div className="">
                        <img src="https://floatui.com/logo.svg" width={150} className="lg:hidden" />
                        <div className="mt-5 space-y-2">
                            <Link to={'/'} className=" flex items-center text-sm text-indigo-600 hover:text-indigo-500 hover:underline" ><ArrowLeftOutlined className="mr-2" /> Back to home</Link>
                            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Sign up</h3>
                            <p className="">Already have an account? <Link to={'/auth/login'} className="font-medium text-indigo-600 hover:text-indigo-500">Login</Link></p>
                        </div>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-5"
                    >
                        <div>
                            <label htmlFor="fullname" className="font-medium">
                                Fullname {errors?.fullname && <span className="text-red-500 text-xs">( {errors?.fullname} )</span>}
                            </label>
                            <Controller
                                name="fullname"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        id="fullname"
                                        type="text"
                                        placeholder="Enter your fullname"
                                        className="w-full px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                    />
                                )}
                            />
                        </div>
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
                                Email {errors?.email && <span className="text-red-500 text-xs">( {errors?.email} )</span>}
                            </label>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="email"
                                        placeholder="Enter your email"
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
                        <div>
                            <label className="font-medium">
                                Confirm Password {errors?.confirmPassword && <span className="text-red-500 text-xs">( {errors?.confirmPassword} )</span>}
                            </label>
                            <Controller
                                name="confirmPassword"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="password"
                                        placeholder="Confirm your password"
                                        className="w-full px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                    />
                                )}
                            />
                        </div>
                        <button
                            type="submit" className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                        >
                            Create account
                        </button>
                    </form>
                </div>
            </div>
        </main>
    )
}
