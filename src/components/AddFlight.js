import React from "react";

class AddFlightForm extends React.Component {

    constructor() {
        super();
        this.state = {
            flightRoutes: [],
            bookingRoute: 0,
            bookingFirstName: "",
            bookingLastName: "",
            bookingEmail: "",
            bookingPhoneNumber: ""
        }
    }

    submitBookingForm() {
        const bookingButton = document.getElementById("bookingFormSubmitButton");
        bookingButton.disabled = true;
        const oldContent = bookingButton.innerHTML;
        bookingButton.innerHTML = '<span class="spinner-border text-white spinner-border-sm"></span>';

        const bookingPayload = {
            flight: {
                id: this.state.bookingRoute,
            },
            firstName: this.state.bookingFirstName,
            lastName: this.state.bookingLastName,
            email: this.state.bookingEmail,
            phoneNumber: this.state.bookingPhoneNumber
        }
        console.log(JSON.stringify(bookingPayload));


        fetch("http://127.0.0.1:9000/booking", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingPayload),
        })
            .then((response) => {
                bookingButton.disabled = false;
                bookingButton.innerHTML = oldContent;
                console.log(response);
                return response.json();
            })
            .then((data) => {
                if (data['status'] == "SUCCESS") {
                    const pnr = data['data']['pnr'];
                    document.getElementById("bookingForm").reset();
                    const bookingMessageBox = document.getElementById("bookingMessageBox");
                    bookingMessageBox.innerText = "Your flight has been booked successfully with PNR number " + pnr;
                    bookingMessageBox.classList.remove("d-none");
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                } else {
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
                <div className="container mx-auto mt-5 p-4 headerbar-bg rounded-4">
                    <h1 className="text-center display-5">Add New Flight</h1>
                    <div className="messageBox bg-success mb-3 d-none text-center text-white p-2 rounded" id="bookingMessageBox"></div>
                    <form onSubmit={(evt) => { evt.preventDefault(); }} id="bookingForm">
                        
                        <div className="row">
                            <div className="col-6 mb-3">
                                <label className="form-label">Flight Number</label>
                                <input type="text" className="form-control py-2" onChange={(e) => { this.setState({ bookingFirstName: e.target.value }) }} />
                            </div>
                            <div className="col-6 mb-3">
                                <label className="form-label">Flight Name</label>
                                <input type="text" className="form-control py-2" onChange={(e) => { this.setState({ bookingFirstName: e.target.value }) }} />
                            </div>
                            <div className="col-6 mb-3">
                                <label className="form-label">Departure Airport</label>
                                <input type="text" className="form-control py-2" onChange={(e) => { this.setState({ bookingFirstName: e.target.value }) }} />
                            </div>
                            <div className="col-6 mb-3">
                                <label className="form-label">Departure Date and Time</label>
                                <input type="datetime-local" className="form-control py-2" onChange={(e) => { this.setState({ bookingFirstName: e.target.value }) }} />
                            </div>
                            <div className="col-6 mb-3">
                                <label className="form-label">Arrival Airport</label>
                                <input type="text" className="form-control py-2" onChange={(e) => { this.setState({ bookingFirstName: e.target.value }) }} />
                            </div>
                            <div className="col-6 mb-3">
                                <label className="form-label">Arrival Date and Time</label>
                                <input type="datetime-local" className="form-control py-2" onChange={(e) => { this.setState({ bookingFirstName: e.target.value }) }} />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-dark w-100 py-3" id="bookingFormSubmitButton" onClick={() => { this.submitBookingForm() }} >Add New Flight</button>
                    </form>
                </div>
            </>
        );
    }

}

export default AddFlightForm;