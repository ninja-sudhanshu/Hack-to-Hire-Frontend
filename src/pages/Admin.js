import AddFlightForm from "../components/AddFlight";
import FlightInfo from "../components/FlightInfo";
import HeaderBarAdmin from "../components/HeaderBarAdmin";

function Admin(){
    return(
        <>
            <div className="hero-section">
                <HeaderBarAdmin/>
                <FlightInfo/>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                {/* <AddFlightForm/> */}
                <br/><br/><br/><br/><br/><br/>
            </div>
        </>
    );
}

export default Admin;