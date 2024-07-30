import React from "react";

class LoginForm extends React.Component {

    constructor(){
        super();
        this.state = {
            email: "",
            password: "",
        }
    }

    submitLoginForm(){
        const submitButton = document.getElementById("formSubmitButton");
        submitButton.disabled = true;
        const oldContent = submitButton.innerHTML;
        submitButton.innerHTML = '<span class="spinner-border text-white spinner-border-sm"></span>';

        const loginPayload = {
            email: this.state.email,
            password: this.state.password
        }


        fetch("http://127.0.0.1:9000/airlines/login", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(loginPayload),
        })
        .then((response) => {
            submitButton.disabled = false;
            submitButton.innerHTML = oldContent;
            return response.json();
        })
        .then( (data) => {
            if(data['status'] == "SUCCESS"){
                localStorage.setItem("access-token", data['data']['accessToken']);
                window.location.href = "/admin";
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
                            <h1 className="text-center display-5">Airlines Login</h1>
                            <form onSubmit={(evt)=>{evt.preventDefault();}} id="loginForm">
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-control py-2" onChange={(e)=>{this.setState({email:e.target.value})}}/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input type="password" className="form-control py-2" onChange={(e)=>{this.setState({password:e.target.value})}}/>
                                </div>
                                <button type="submit" className="btn btn-dark w-100 py-3" id="formSubmitButton" onClick={()=>{this.submitLoginForm()}} >Login</button>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}

export default LoginForm;