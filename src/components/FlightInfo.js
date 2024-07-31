import React, { useState, useEffect } from "react";
import FlightInfoRow from "./FlightInfoRow";
import {dfToDateAndTime} from '../utils/DateFormater.js';

function FlightInfo() {

    const [flights, setFlights] = useState([]); 
    const [flightDepartureGate, setFlightDepartureGate] = useState(null);
    const [flightDepartureDateTime, setFlightDepartureDateTime] = useState(null);
    const [flightArrivalDateTime, setFlightArrivalDateTime] = useState(null);

    function getFlight(){
        fetch("http://127.0.0.1:9000/flights", {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access-token") },
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            setFlights(data['data']);
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        getFlight();
    }, []);

    function submitUpdateDepartureDateTimeForm(){

        const departureDateTimeFormSubmitButton = document.getElementById("departureDateTimeFormSubmitButton");
        departureDateTimeFormSubmitButton.disabled = true;
        const oldContent = departureDateTimeFormSubmitButton.innerHTML;
        departureDateTimeFormSubmitButton.innerHTML = '<span class="spinner-border text-white spinner-border-sm"></span>';

        const updateDepartureGatePayload = {
            departureDateTime: dfToDateAndTime(new Date(flightDepartureDateTime)),
            arrivalDateTime: dfToDateAndTime(new Date(flightArrivalDateTime))
        }

        fetch("http://127.0.0.1:9000/flights/"+localStorage.getItem('flightToEdit')+"/delay", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("access-token"),
            },
            body: JSON.stringify(updateDepartureGatePayload),
        }).then((response) => {
            departureDateTimeFormSubmitButton.disabled = false;
            departureDateTimeFormSubmitButton.innerHTML = oldContent;
            return response.json();
        }).then((data) => {
            if(data['status'] == "SUCCESS"){
                var flightCopy = flights.map((flight)=>{
                    if(flight.id == data['data']['id']){
                        flight.flightStatus = data['data']['flightStatus'];
                        flight.departureDateTime = data['data']['departureDateTime'];
                        return flight;
                    }else{
                        return flight;
                    }
                });
                setFlights(flightCopy);
                document.getElementById("departureDateTimeUpdateModelCloseButton").click();
                document.getElementById("departureDateTimeUpdateForm").reset();
            }else{
                alert(data['errors'][0]['message']);
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    function submitUpdateDepartureGateForm(){
        const departureGateFormSubmitButton = document.getElementById("departureGateFormSubmitButton");
        departureGateFormSubmitButton.disabled = true;
        const oldContent = departureGateFormSubmitButton.innerHTML;
        departureGateFormSubmitButton.innerHTML = '<span class="spinner-border text-white spinner-border-sm"></span>';

        const updateDepartureGatePayload = {
            departureGate: flightDepartureGate
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
            if(data['status'] == "SUCCESS"){
                var flightCopy = flights.map((flight)=>{
                    if(flight.id == data['data']['id']){
                        flight.flightStatus = data['data']['flightStatus'];
                        flight.departureGate = data['data']['departureGate'];
                        return flight;
                    }else{
                        return flight;
                    }
                });
                setFlights(flightCopy);
                document.getElementById("departureGateUpdateModelCloseButton").click();
            }else{
                alert(data['errors'][0]['message']);
            }
        }).catch((error) => {
            console.log(error);
        });
    }


        return (
        <>
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

            <div className="modal fade" id="departureDateTimeUpdateModel" tabIndex="-1" aria-labelledby="departureDateTimeUpdateModel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Update Flight Departure Details</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="departureDateTimeUpdateModelCloseButton"></button>
                        </div>
                        <div className="modal-body">
                        <form onSubmit={(evt)=>{evt.preventDefault();}} id="departureDateTimeUpdateForm">
                                <div className="mb-3">
                                    <label className="form-label">New Departure Time</label>
                                    <input type="datetime-local" className="form-control py-2" onChange={(e)=>{ setFlightDepartureDateTime(e.target.value); }} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">New Arrival Time</label>
                                    <input type="datetime-local" className="form-control py-2" onChange={(e)=>{ setFlightArrivalDateTime(e.target.value); }} />
                                </div>
                                <button type="submit" className="btn btn-dark w-100 py-3" id="departureDateTimeFormSubmitButton" onClick={()=>{submitUpdateDepartureDateTimeForm()}} >Reschedule Flight</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


            <div className="modal fade" id="departureGateUpdateModel" tabIndex="-1" aria-labelledby="departureGateUpdateModel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Update Flight Gate</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="departureGateUpdateModelCloseButton"></button>
                        </div>
                        <div className="modal-body">
                        <form onSubmit={(evt)=>{evt.preventDefault();}} id="loginForm">
                                <div className="mb-3">
                                    <label className="form-label">New Gate</label>
                                    <input type="text" className="form-control py-2" onChange={(e)=>{ setFlightDepartureGate(e.target.value); }}/>
                                </div>
                                <button type="submit" className="btn btn-dark w-100 py-3" id="departureGateFormSubmitButton" onClick={()=>{submitUpdateDepartureGateForm()}} >Update Gate</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

export default FlightInfo;