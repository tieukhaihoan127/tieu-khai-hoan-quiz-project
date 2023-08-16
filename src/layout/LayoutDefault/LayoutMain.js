import { Outlet } from "react-router-dom";
function LayoutMain() {
    return (
        <>
            <div className="layout__main">
                <main className="main">
                    <Outlet />
                </main>
            </div>
        </>
    )
}

export default LayoutMain;