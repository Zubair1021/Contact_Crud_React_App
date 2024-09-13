import React, { useState, useEffect } from "react";
import { ref, onValue,remove } from "firebase/database"; 
import fireDb from "../firebase"; 
import { Link } from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";

const Home = () => {
  const [data, setData] = useState({});

  // Load Data from Firebase Realtime Database

  useEffect(() => {
    const contactsRef = ref(fireDb, "contacts"); 

    onValue(contactsRef, (snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val()); 
      } else {
        setData({}); 
      }
    });
    return () => {
      setData({});
    };
  }, []);

  // Delete Contact Method
  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      const contactRef = ref(fireDb, `contacts/${id}`); 
      remove(contactRef)
        .then(() => {
          toast.success("Contact deleted successfully!");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  }

  return (
    <div style={{ marginTop: "100px" }}>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Contact</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((id, index) => {
            return (
              <tr key={id}>
                <th scope="row">{index + 1}</th>
                <td>{data[id].name}</td>
                <td>{data[id].email}</td>
                <td>{data[id].contact}</td>
                <td>
                  <Link to={`/update/${id}`}>
                  <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button className="btn btn-delete" onClick={()=>onDelete(id)}>Delete</button>
                  <Link to={`/view/${id}`}>
                  <button className="btn btn-view">View</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
