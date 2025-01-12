

function SideBar(props) {
    const { handleToggleModel, data } = props

    return (
        <div className="sidebar">
            <div className="sidebarContents">
                <h2>{data?.title}</h2>
                <div>
                    <h3 className="date">{data?.date}</h3>
                    <p>{data?.explanation}</p>
                </div>
                <button onClick={handleToggleModel}>
                    <i className="fa-solid fa-right-long"></i>
                </button>
            </div>
        </div>
    )
}

export default SideBar;