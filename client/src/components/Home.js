import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {NavLink} from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Alert from 'react-bootstrap/Alert';

function Home() {
  
  const [data, setData] = useState([]);

  const [show, setShow] = useState(false);

  
  const getUserData = async()=>{
    const res = await axios.get("/getdata",{
      headers:{
        "Content-Type":"application/json"
      }
    });

    if(res.data.status === 401 || !res.data){
      console.log("error...");
    }else{
      setData(res.data.getUser);
    }
    
  }

  const dltUser = async(id)=>{
    const res = await axios.delete(`/${id}`,{
      headers:{
        "Content-Type":"application/json"
      }
    });

    if(res.data.status === 401 || !res.data){
      console.log("error...");
    }else{
      console.log("user delete");
      setShow(true);
    }
  }
  
  useEffect(()=>{
    getUserData()
  },[dltUser]);
  // useEffect(() => {
  //   axios.get("https://keeper-5zd9.onrender.com/notes")
  //   .then((data) => {
  //     setNotes(data.data);
  //   })
  //   .catch( (err) => console.log(err));
  // }, []);

  return (
    <>
    {
      show ? <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          User deleted
      </Alert> : ""
    }
    <div className="container mt-2">
      <h1 className="text-center mt-2">MERN Image upload project</h1>
      <div className="text-end">
        <Button variant="primary"><NavLink to="/register" className={"text-decoration-none text-light"}>Add User</NavLink></Button>{" "}
      </div>
      <div className="row d-flex justify-content-between align-items-center mt-5">

      {
        data.length > 0 ? data.map((ele,i)=>{
          return(
            <>
            <Card style={{ width: "22rem", height: "18rem" }} className="align-items-center mb-3">
          <Card.Img variant="top" style={{ width: "100px", textAlign: "center", margin: "auto" }} src={`/uploads/${ele.imgpath}`} className="mt-2"/>
          <Card.Body className="text-center">
            <Card.Title>User Name: {ele.fname}</Card.Title>
            <Card.Text>
              Date: {moment(ele.date).format("L")}
            </Card.Text>
            <Button variant="danger" onClick={()=>dltUser(ele._id)} className="col-lg-8 text-center">Delete</Button>
          </Card.Body>
        </Card>

            </>
          )
        }):""


      }
        
      </div>
    </div>
    </>
    );
}

export default Home;
