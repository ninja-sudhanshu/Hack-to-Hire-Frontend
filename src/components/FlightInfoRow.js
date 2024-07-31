import React, {useState} from 'react';
import { dfToDateAndTime } from '../utils/DateFormater.js';



function FlightInfoRow(prop) {

    const [flightNumber, setFlightNumber] = useState(prop.row.flightNumber);
    const [departureDateTime, setDepartureDateTime] = useState(prop.row.departureDateTime);
    const [departureAirport, setDepartureAirport] = useState( prop.row.departureAirport);
    const [departureGate, setDepartureGate] = useState( prop.row.departureGate);
    const [arrivalAirport, setArrivalAirport] = useState( prop.row.arrivalAirport);
    const [arrivalGate, setArrivalGate] = useState( prop.row.arrivalGate);
    const [flightStatus, setFlightStatus] = useState( prop.row.flightStatus);

    function cancelFlight(id) {
        fetch("http://127.0.0.1:9000/flights/" + id + "/cancel", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("access-token"),
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data['status'] == "SUCCESS") {
                    setFlightStatus(data['data']['flightStatus'])
                } else {
                    alert(data['errors'][0]['message']);
                }
            }).catch((error) => {
                console.log(error);
            });
    }

    return <>
        <tr className="text-center">
            <td>{flightNumber}</td>
            <td>
                {dfToDateAndTime(new Date(departureDateTime))}
                <button className="btn btn-sm btn-primary-outline" data-bs-toggle="modal" data-bs-target="#departureDateTimeUpdateModel" onClick={() => { localStorage.setItem("flightToEdit", prop.row.id) }}>
                    <i className="bi bi-pencil-square"></i>
                </button>
            </td>
            <td>{departureAirport}</td>
            <td>
                {departureGate != null ? departureGate : '-'}
                <button className="btn btn-sm btn-primary-outline" data-bs-toggle="modal" data-bs-target="#departureGateUpdateModel" onClick={() => { localStorage.setItem("flightToEdit", prop.row.id) }}>
                    <i className="bi bi-pencil-square"></i>
                </button>
            </td>
            <td>{arrivalAirport}</td>
            <td>{arrivalGate != null ? arrivalGate : '-'}</td>
            <td>{flightStatus}</td>
            <td>
                <button className="btn btn-sm btn-danger" onClick={() => { cancelFlight(prop.row.id) }}>
                    <i className="bi bi-x"></i> Cancel Flight
                </button>
            </td>
        </tr>
    </>;
}


export default FlightInfoRow;