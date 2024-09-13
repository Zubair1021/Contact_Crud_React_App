import React, { useState, useEffect } from "react";
import fireDb from "../firebase";
import { Link, useParams } from "react-router-dom";
import { ref, get } from "firebase/database";
import "./View.css";

const View = () => {
  const [user, setuser] = useState({});
  // Grab Id from URL
  const { id } = useParams();

  useEffect(
    () => {
      const contactsRef = ref(fireDb, `contacts/${id}`);

      get(contactsRef).then((snapshot) => {
        if (snapshot.exists()) {
          setuser({ ...snapshot.val() });
        } else {
          setuser({});
        }
      });
    },
    { id }
  );
  console.log(user);
  return (
    <div style={{ marginTop: "150px" }}>
      <div className="card">
        <div className="card-header">
          <p>User Contact Detail</p>
          </div>
          <div className="container">
            <strong>
              ID:
              <span>{id}</span>
            </strong>
            <br />
            <br />
            <strong>
              Name:
              <span>{user.name}</span>
            </strong>
            <br />
            <br />
            <strong>
              Email:
              <span>{user.email}</span>
            </strong>
            <br />
            <br />
            <strong>
              Contact:
              <span>{user.contact}</span>
            </strong>
            <br />
            <br />
            <Link to='/'>
            <button className="btn btn-edit">Go Back</button>
            </Link>
          </div>
        
      </div>
    </div>
  );
};

export default View;
