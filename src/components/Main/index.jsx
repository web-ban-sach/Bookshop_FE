import { Outlet } from "react-router-dom"
import { SideBar } from "../SideBar"

export const Main = () => {
    return <>
        <main className=" flex px-[150px]">
            <SideBar />
            <section className=" w-[75%] p-2">
                <Outlet />
            </section>
        </main>
    </>
}
