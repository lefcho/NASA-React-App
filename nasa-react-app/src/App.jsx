import { useEffect, useState } from "react"
import Footer from "./components/Footer.jsx"
import Main from "./components/Main.jsx"
import SideBar from "./components/SideBar.jsx"

function App() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showModel, setShowModel] = useState(false);
    
    function handleToggleModel() {
        setShowModel(!showModel);
    }
    
    useEffect(() => {
        async function fetchAPIData() {
            const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
            const url = 'https://api.nasa.gov/planetary/apod' + `?api_key=${NASA_KEY}`;

            const today = new Date().toDateString();
            const localKey = `${today}`;

            if (localStorage.getItem(localKey)) {
                const apiData = JSON.parse(localStorage.getItem(localKey));
                setData(apiData);
                console.log("Fetched from cache.");
                return;
            }

            localStorage.clear();

            try {
                const res = await fetch(url);
                const apiData = await res.json();
                localStorage.setItem(localKey, JSON.stringify(apiData));
                setData(apiData);
                
            } catch(error) {
                console.log(error.message);
                
            }
        }
        fetchAPIData();
    }, [])

    return (
        <>  
            {data ? (<Main data={data} />) : (
                <div className="loadingState">
                    <i className="fa-solid fa-gear"></i>
                </div>
            )}
            {showModel && (
                <SideBar data={data} handleToggleModel={handleToggleModel}/>
            )}
            {data && (<Footer data={data} handleToggleModel={handleToggleModel}/>)}
        </>
    )
}

export default App;
