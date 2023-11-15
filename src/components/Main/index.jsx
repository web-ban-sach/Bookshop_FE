import { Outlet } from "react-router-dom"
import { SideBar } from "../SideBar"

export const Main = () => {
    return <>
        <main className=" flex px-[150px] border border-gray-200">
            <SideBar />
            <section className=" bg-white w-[80%] p-3 shadow-lg rounded-r-lg">
                <Outlet />
            </section>
        </main>
    </>
}
