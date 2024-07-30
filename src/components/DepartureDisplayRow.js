function DepartureDisplayRow(prop){
    return <>
        <tr className="text-center">
            <td>{prop.row.time}</td> 
            <td>{prop.row.flightNumber}</td> 
            <td className="text-nowrap"><img src={prop.row.logo_url} height="30px"/></td>    
            <td>{prop.row.destination}</td> 
            <td>{prop.row.gate}</td>    
            <td>{prop.row.status}</td>
        </tr>
    </>;
}

export default DepartureDisplayRow;