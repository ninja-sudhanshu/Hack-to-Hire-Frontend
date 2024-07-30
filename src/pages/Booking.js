import BookingForm from "../components/BookingForm";
import Header from "../components/Header";

function Booking(){
    return(
        <>
            <Header/>
            <div className="hero-section pt-5">
                <br/><br/>
                <BookingForm />
            </div>
        </>
    );
}

export default Booking;