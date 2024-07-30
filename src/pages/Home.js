import DepartureDisplay from "../components/DepartureDisplay";
import Header from "../components/Header";

function Home(){
    return(
        <>
            <Header/>
            <div className="hero-section pt-5">
                <br/><br/>
                <DepartureDisplay />
            </div>
        </>
    );
}

export default Home;