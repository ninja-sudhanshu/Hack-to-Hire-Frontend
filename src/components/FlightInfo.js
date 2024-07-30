import React from "react";
import FlightInfoRow from "./FlightInfoRow";
import {dfToDateAndTime, dfToDate, dfToTime} from '../utils/DateFormater.js';

class FlightInfo extends React.Component {

    constructor() {
        super();
        this.state = {
            flights: [],
            flightDepartureGate: null,
            flightDepartureDateTime: null,
            flightArrivalDateTime: null
        };
        this.rerenderParentCallback = this.rerenderParentCallback.bind(this);
    }

    rerenderParentCallback(){
        this.getFlight();
    }

    getFlight(){
        fetch("http://127.0.0.1:9000/flights", {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access-token") },
        })
        .then((response) => {
                return response.json();
        })
        .then((data) => {
            console.log(data);
            this.setState({
                flights: data['data']
            })
        }).catch((error) => {
            console.log(error);
        });
    }

    componentDidMount() {
        this.getFlight();
    }

    submitUpdateDepartureDateTimeForm(){

        const departureDateTimeFormSubmitButton = document.getElementById("departureDateTimeFormSubmitButton");
        departureDateTimeFormSubmitButton.disabled = true;
        const oldContent = departureDateTimeFormSubmitButton.innerHTML;
        departureDateTimeFormSubmitButton.innerHTML = '<span class="spinner-border text-white spinner-border-sm"></span>';

        const updateDepartureGatePayload = {
            departureDateTime: dfToDateAndTime(new Date(this.state.flightDepartureDateTime)),
            arrivalDateTime: dfToDateAndTime(new Date(this.state.flightArrivalDateTime))
        }

        fetch("http://127.0.0.1:9000/flights/"+localStorage.getItem('flightToEdit')+"/delay", {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("access-token"),
            },
            body: JSON.stringify(updateDepartureGatePayload),
        })
        .then((response) => {
            departureDateTimeFormSubmitButton.disabled = false;
            departureDateTimeFormSubmitButton.innerHTML = oldContent;
            return response.json();
        })
        .then( (data) => {
            if(data['status'] == "SUCCESS"){
                this.getFlight();
                document.getElementById("departureDateTimeUpdateModelCloseButton").click();
            }else{
                alert(data['errors'][0]['message']);
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    submitUpdateDepartureGateForm(){
        const departureGateFormSubmitButton = document.getElementById("departureGateFormSubmitButton");
        departureGateFormSubmitButton.disabled = true;
        const oldContent = departureGateFormSubmitButton.innerHTML;
        departureGateFormSubmitButton.innerHTML = '<span class="spinner-border text-white spinner-border-sm"></span>';

        const updateDepartureGatePayload = {
            departureGate: this.state.flightDepartureGate
        }


        fetch("http://127.0.0.1:9000/flights/"+localStorage.getItem('flightToEdit')+"/gate-change", {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("access-token")
            },
            body: JSON.stringify(updateDepartureGatePayload),
        })
        .then((response) => {
            departureGateFormSubmitButton.disabled = false;
            departureGateFormSubmitButton.innerHTML = oldContent;
            return response.json();
        })
        .then( (data) => {
            console.log(data);
            if(data['status'] == "SUCCESS"){
                this.getFlight();
                document.getElementById("departureGateUpdateModelCloseButton").click();
            }else{
                alert(data['errors'][0]['message']);
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {

        const { flights } = this.state;

        return <>
            <div className="container mx-auto headerbar-bg mt-5 p-4 rounded-4">

                <div className="pb-5">
                    <h1 className="text-center display-5">All Flights</h1>
                </div>

                <table className="table bg-transparent-table">
                    <thead>
                        <tr className="text-center">
                            <th>Flight</th>
                            <th>Departure Date & Time</th>
                            <th>Departure From</th>
                            <th>Departure Gate</th>
                            <th>Arrival To</th>
                            <th>Arrival Gate</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            flights.map(function (data, index) {
                                return <FlightInfoRow key={index} row={data} />
                            })
                        }
                    </tbody>
                </table>
            </div>

            <div class="modal fade" id="departureDateTimeUpdateModel" tabindex="-1" aria-labelledby="departureDateTimeUpdateModel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5">Update Flight Departure Details</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="departureDateTimeUpdateModelCloseButton"></button>
                        </div>
                        <div class="modal-body">
                        <form onSubmit={(evt)=>{evt.preventDefault();}} id="loginForm">
                                <div className="mb-3">
                                    <label className="form-label">New Departure Time</label>
                                    <input type="datetime-local" className="form-control py-2" onChange={(e)=>{this.setState({flightDepartureDateTime:e.target.value})}}/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">New Arrival Time</label>
                                    <input type="datetime-local" className="form-control py-2" onChange={(e)=>{this.setState({flightArrivalDateTime:e.target.value})}}/>
                                </div>
                                <button type="submit" className="btn btn-dark w-100 py-3" id="departureDateTimeFormSubmitButton" onClick={()=>{this.submitUpdateDepartureDateTimeForm()}} >Update Gate</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


            <div class="modal fade" id="departureGateUpdateModel" tabindex="-1" aria-labelledby="departureGateUpdateModel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5">Update Flight Gate</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="departureGateUpdateModelCloseButton"></button>
                        </div>
                        <div class="modal-body">
                        <form onSubmit={(evt)=>{evt.preventDefault();}} id="loginForm">
                                <div className="mb-3">
                                    <label className="form-label">New Gate</label>
                                    <input type="text" className="form-control py-2" onChange={(e)=>{this.setState({flightDepartureGate:e.target.value})}}/>
                                </div>
                                <button type="submit" className="btn btn-dark w-100 py-3" id="departureGateFormSubmitButton" onClick={()=>{this.submitUpdateDepartureGateForm()}} >Update Gate</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    }

}

export default FlightInfo;