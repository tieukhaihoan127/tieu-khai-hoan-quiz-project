import "./LayoutDefault.scss"
import LayoutFooter from "./LayoutFooter";
import LayoutHeader from "./LayoutHeader";
import LayoutMain from "./LayoutMain";

function LayoutDefault() {
    return (
        <div className="layout">
            <LayoutHeader/>
            <LayoutMain/>
            <LayoutFooter/>
        </div>
    )
}

export default LayoutDefault;