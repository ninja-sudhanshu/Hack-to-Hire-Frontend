import { dfToDateAndTime } from '../utils/DateFormater.js';



function FlightInfoRow({data, flightToUpdate}) {

    return <>
        <tr className="text-center">
            <td>{data.flightNumber}</td>
            <td>
                {dfToDateAndTime(new Date(data.departureDateTime))}
                <button className="btn btn-sm btn-primary-outline" data-bs-toggle="modal" data-bs-target="#departureDateTimeUpdateModel" onClick={() => { flightToUpdate(data.id) }}>
                    <i className="bi bi-pencil-square"></i>
                </button>
            </td>
            <td>{data.departureAirport}</td>
            <td>
                {data.departureGate != null ? data.departureGate : '-'}
                <button className="btn btn-sm btn-primary-outline" data-bs-toggle="modal" data-bs-target="#departureGateUpdateModel" onClick={() => { flightToUpdate(data.id) }}>
                    <i className="bi bi-pencil-square"></i>
                </button>
            </td>
            <td>{data.arrivalAirport}</td>
            <td>{data.arrivalGate != null ? data.arrivalGate : '-'}</td>
            <td>{data.flightStatus}</td>
            <td>
                <button className="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#cancelFlightModel" onClick={() => { flightToUpdate(data.id) }}>
                    <i className="bi bi-x"></i> Cancel Flight
                </button>
            </td>
        </tr>
    </>;
}


export default FlightInfoRow;