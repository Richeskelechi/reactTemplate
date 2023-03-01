import { useState } from 'react';
 
export default function Form() {
 
  // States for registration
  const [name, setName] = useState('');
  const [errors, setErrors] = useState('');
  const [success, setSuccess] = useState('');
 
  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === '') {
        setSuccess("")
        setErrors("Solution Name is required")
        setError(true);
    }else if(name.length <5){
        setSuccess("")
        setErrors("Solution Name must be at least 5 characters")
        setError(true);
    } else {
        let body = {
            "userId": "rich23",
            "organizationId": "approovia22",
            "name": name
        }
        console.log(body);
        fetch('https://apprss.azurewebsites.net/api/Solution/CreateSolutionObject', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then(function (response) {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        }).then(function (data) {
            // console.log(data);
            setSuccess("Solution created successfully")
            setSubmitted(true);
            setError(false);
        }).catch(function (error) {
            console.log(error.message);
            setSuccess("")
            setErrors('Failed Try Again Later')
            // setSubmitted(true);
            setError(true);
        });
    }
  };
 
  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? '' : 'none',
        }}>
        <h1>{success}</h1>
      </div>
    );
  };
 
  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? '' : 'none',
        }}>
        <h1>{errors}</h1>
      </div>
    );
  };
 
  return (
    <div className="form">
      <div>
        <h1>Create A New Solution</h1>
      </div>
 
      {/* Calling to the methods */}
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>
 
      <form>
        {/* Labels and inputs for form data */}
        <label className="label">Solution Name</label>
        <input onChange={handleName} className="input"
          value={name} type="text" />
 
        <button onClick={handleSubmit} className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}