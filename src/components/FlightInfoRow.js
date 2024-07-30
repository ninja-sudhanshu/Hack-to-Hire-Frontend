import React from 'react';
import {dfToDateAndTime, dfToDate, dfToTime} from '../utils/DateFormater.js';



function FlightInfoRow(prop){

    function cancelFlight(id){
        fetch("http://127.0.0.1:9000/flights/"+id+"/cancel", {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("access-token"),
            }
        })
        .then((response) => {
            return response.json();
        })
        .then( (data) => {
            if(data['status'] == "SUCCESS"){
                alert("Flight has been cancelled.");
            }else{
                alert(data['errors'][0]['message']);
            }
        }).catch((error) => {
            console.log(error);
        });
    }

        return <>
        <tr className="text-center">
            <td>{prop.row.flightNumber}</td> 
            <td>
                {dfToDateAndTime(new Date(prop.row.departureDateTime))}
                <button className="btn btn-sm btn-primary-outline"  data-bs-toggle="modal" data-bs-target="#departureDateTimeUpdateModel" onClick={()=>{localStorage.setItem("flightToEdit", prop.row.id)}}>
                    <i className="bi bi-pencil-square"></i>
                </button>
            </td>
            <td>{prop.row.departureAirport}</td>
            <td>
                {prop.row.departureGate != null ? prop.row.departureGate: '-'}
                <button className="btn btn-sm btn-primary-outline" data-bs-toggle="modal" data-bs-target="#departureGateUpdateModel" onClick={()=>{localStorage.setItem("flightToEdit", prop.row.id)}}>
                    <i className="bi bi-pencil-square"></i>
                </button>
            </td>
            <td>{prop.row.arrivalAirport}</td>
            <td>{prop.row.arrivalGate != null ? prop.row.arrivalGate: '-'}</td>
            <td>{prop.row.flightStatus}</td>
            <td>
                <button className="btn btn-sm btn-danger" onClick={()=>{cancelFlight(prop.row.id)}}>
                    <i className="bi bi-x"></i> Cancel Flight
                </button>
            </td>
        </tr>
    </>;
}


export default FlightInfoRow;