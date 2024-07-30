function cancelFlight(id){
    console.log("Cancelling "+id);
}

function FlightInfoRow(prop){

    return <>
        <tr className="text-center">
            <td>{prop.row.flightNumber}</td> 
            <td>
                {prop.row.departureDateTime}
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