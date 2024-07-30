import DepartureDisplayRow from "./DepartureDisplayRow";
import '../components-style/DepartureDisplay.css'
import { Client } from '@stomp/stompjs';
import React from "react";

class DepartureDisplay extends React.Component{

    constructor(){
        super();
        this.state = {
            response:[]
        }
    }

    componentDidMount(){
        const client = new Client({
            brokerURL: 'ws://localhost:9001/flights-status',
            onConnect: () => {
                console.log("Connected");
                client.publish({
                    destination: "/app/departures",
                    body: JSON.stringify({'name': "Client"})
                });
                client.subscribe('/topic/departures', (message) =>
                    this.setState({
                        response: JSON.parse(message.body)
                    }),
                );
            },
        });
        client.activate();
    }

    render(){

        const { response } = this.state;

        return <>
            <div className="container mx-auto headerbar-bg mt-5 p-4 rounded-4">

                <div className="pb-5">
                    <h1 className="text-center display-5">Departures: Next 24 Hours</h1>
                </div>

                <table className="table bg-transparent-table">
                    <thead>
                        <tr className="text-center">
                            <th>Time</th>
                            <th>Flight</th>
                            <th>Airline</th>
                            <th>Destination</th>
                            <th>Gate</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            response.map(function(data, index){
                                return <DepartureDisplayRow key={index} row={data} />
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    }

}

export default DepartureDisplay;