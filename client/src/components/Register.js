import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import {useNavigate} from "react-router-dom";


function Register() {
  
  const [fname, setFname] = useState("");
  const [file, setFile] = useState("");
  const history = useNavigate();

  function setName(event){
    const {value} = event.target
    setFname(value);
    console.log(fname);
  }
  function setImg(event){
    const file = event.target.files[0];
    setFile(file);
  }

  // adduser data
  const addUserData = async(e)=>{
    e.preventDefault();

    var formData = new FormData();
    formData.append("photo", file);
    formData.append("fname", fname);

    const config = {
      headers:{
        "Content-Type":"multipart/form-data"
      }
    }

    const res = await axios.post("/register", formData, config);
    
    if(res.data.status === 401 || !res.data){
      console.log("error...");
    }else{
      history("/");
    }
    
  }

  return (
    <>
      <div className="container mt-3">
        <h1>Upload your Img here</h1>
        <Form className="mt-3">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text" name="fname" onChange={setName} placeholder="" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Select your image</Form.Label>
            <Form.Control type="file" name="photo" onChange={setImg} placeholder="" />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={addUserData}>
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

export default Register;
