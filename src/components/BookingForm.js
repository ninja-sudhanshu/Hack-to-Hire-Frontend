import '../components-style/BookingForm.css'
import React from "react";

class BookingForm extends React.Component {

    constructor(){
        super();
        this.state = {
            flightRoutes:[],
            bookingRoute: 0,
            bookingFirstName: "",
            bookingLastName: "",
            bookingEmail: "",
            bookingPhoneNumber: ""
        }
    }

    componentDidMount(){
        fetch("http://127.0.0.1:9000/flights/all", {method: 'GET'})
        .then( (response) => {
            return response.json();
        })
        .then( (data) => {
            console.log(data);
            this.setState({
                flightRoutes: data['data']
            })
        }).catch((error) => {
            console.log(error);
        });
    }

    submitBookingForm(){
        const bookingButton = document.getElementById("bookingFormSubmitButton");
        bookingButton.disabled = true;
        const oldContent = bookingButton.innerHTML;
        bookingButton.innerHTML = '<span class="spinner-border text-white spinner-border-sm"></span>';

        const bookingPayload = {
            flight:{
                id:this.state.bookingRoute,
            },
            firstName: this.state.bookingFirstName,
            lastName: this.state.bookingLastName,
            email: this.state.bookingEmail,
            phoneNumber: this.state.bookingPhoneNumber
        }
        console.log(JSON.stringify(bookingPayload));


        fetch("http://127.0.0.1:9000/booking", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(bookingPayload),
        })
        .then((response) => {
            bookingButton.disabled = false;
            bookingButton.innerHTML = oldContent;
            console.log(response);
            return response.json();
        })
        .then( (data) => {
            if(data['status'] == "SUCCESS"){
                const pnr = data['data']['pnr'];
                document.getElementById("bookingForm").reset();
                const bookingMessageBox = document.getElementById("bookingMessageBox");
                bookingMessageBox.innerText = "Your flight has been booked successfully with PNR number "+pnr;
                bookingMessageBox.classList.remove("d-none");
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            }else{
                alert(data['errors'][0]['message']);
            }
        }).catch((error) => {
            console.log(error);
        });

    }

    render() {
        const { flightRoutes } = this.state;
        return (
            <>
                <div className="container mx-auto mt-5">
                    <div className="row">
                        <div className="col-lg-5 col-md-8 col-12 mx-auto">
                            <div className="p-4 headerbar-bg rounded-4">
                            <h1 className="text-center display-5">Book Flight</h1>
                            <div class="messageBox bg-success mb-3 d-none text-center text-white p-2 rounded" id="bookingMessageBox"></div>
                            <form onSubmit={(evt)=>{evt.preventDefault();}} id="bookingForm">
                                <div className="mb-3">
                                    <label className="form-label">Flight Route</label>
                                    <select className="form-select" onChange={(e)=>{this.setState({bookingRoute:e.target.value})}}>
                                        <option disabled selected>-- Select Route --</option>
                                        {
                                            flightRoutes.map((data, index) => {
                                                return(
                                                    <option value={data.id} key={data.id}>From {data.departureAirport} to {data.arrivalAirport}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">First Name</label>
                                    <input type="text" className="form-control py-2" onChange={(e)=>{this.setState({bookingFirstName:e.target.value})}} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Last Name</label>
                                    <input type="text" className="form-control py-2" onChange={(e)=>{this.setState({bookingLastName:e.target.value})}}/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-control py-2" onChange={(e)=>{this.setState({bookingEmail:e.target.value})}}/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Phone Number</label>
                                    <input type="text" className="form-control py-2" onChange={(e)=>{this.setState({bookingPhoneNumber:e.target.value})}}/>
                                </div>
                                <button type="submit" className="btn btn-dark w-100 py-3" id="bookingFormSubmitButton" onClick={()=>{this.submitBookingForm()}} >Book Flight</button>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}

export default BookingForm;