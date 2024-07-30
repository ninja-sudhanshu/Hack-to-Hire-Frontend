import React from "react";

class SignupForm extends React.Component {

    constructor(){
        super();
        this.state = {
            name: "",
            iata: "", 
            email: "",
            password: "",
            logo: ""
        }
    }

    submitSignupForm(){
        const submitButton = document.getElementById("formSubmitButton");
        submitButton.disabled = true;
        const oldContent = submitButton.innerHTML;
        submitButton.innerHTML = '<span class="spinner-border text-white spinner-border-sm"></span>';

        const signupPayload = {
            name: this.state.name,
            iata: this.state.iata,
            email: this.state.email,
            password: this.state.password,
            logo: this.state.logo
        }


        fetch("http://127.0.0.1:9000/airlines/signup", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(signupPayload),
        })
        .then((response) => {
            submitButton.disabled = false;
            submitButton.innerHTML = oldContent;
            console.log(response);
            return response.json();
        })
        .then( (data) => {
            if(data['status'] == "SUCCESS"){
                document.getElementById("signupForm").reset();
                const messageBox = document.getElementById("messageBox");
                messageBox.innerText = "Signup successfull, Kindly login.";
                messageBox.classList.remove("d-none");
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            }else{
                alert(data['errors'][0]['message']);
            }
        }).catch((error) => {
            console.log(error);
        });

    }

    render() {
        return (
            <>
                <div className="container mx-auto mt-5">
                    <div className="row">
                        <div className="col-lg-5 col-md-8 col-12 mx-auto">
                            <div className="p-5 headerbar-bg rounded-4">
                            <h1 className="text-center display-5">Airlines Signup</h1>
                            <div id="messageBox" className="bg-success p-3 rounded-3 text-center text-white d-none"></div>
                            <form onSubmit={(evt)=>{evt.preventDefault();}} id="signupForm">
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input type="text" className="form-control py-2" onChange={(e)=>{this.setState({name:e.target.value})}}/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">IATA Code</label>
                                    <input type="text" className="form-control py-2" onChange={(e)=>{this.setState({iata:e.target.value})}}/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-control py-2" onChange={(e)=>{this.setState({email:e.target.value})}}/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input type="password" className="form-control py-2" onChange={(e)=>{this.setState({password:e.target.value})}}/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Logo</label>
                                    <input type="url" className="form-control py-2" onChange={(e)=>{this.setState({logo:e.target.value})}}/>
                                </div>
                                <button type="submit" className="btn btn-dark w-100 py-3" id="formSubmitButton" onClick={()=>{this.submitSignupForm()}} >Signup</button>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}

export default SignupForm;