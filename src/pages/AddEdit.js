import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./AddEdit.css";
import fireDb from "../firebase";
import { toast } from "react-toastify";
import {ref,push,onValue,set} from "firebase/database";

const initialState = {
  name: "",
  email: "",
  contact: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  const { name, email, contact } = state;

  const Navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      return toast.error("Please fill in all fields!");
    } else {
      if(!id){
        const contactsRef = ref(fireDb, "contacts"); 
  
        push(contactsRef, state) 
          .then(() => {
            toast.success("Contact added successfully!");
          })
          .catch((err) => {
            toast.error(err.message);
          });
      }else{
        const contactsRef = ref(fireDb, `contacts/${id}`); 
  
        set(contactsRef, state) 
          .then(() => {
            toast.success("Contact Updated successfully!");
          })
          .catch((err) => {
            toast.error(err.message);
          });
      }

  
      setTimeout(() => Navigate("/"), 600); 

    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  // Update Contact Id Grab
  const { id } = useParams();
 //Useeffect from data fetching , Run only when have an ID
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
  }, [id]);
// This will run when we have an ID and data
  useEffect(() => {
      if (id) {
        setState({...data[id]});
      }
      else{
        setState({ ...initialState });
      }

      return () => {
        setState({ ...initialState });
      };
  },[id,data]);


  return (
    <div style={{ marginTop: "100px" }}>
      <form
        action=""
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your name"
          value={name|| ""}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Your Email"
          value={email|| ""}
          onChange={handleInputChange}
        />
        <label htmlFor="contact">Contact</label>
        <input
          type="text"
          id="contact"
          name="contact"
          placeholder="Your Contact No."
          value={contact|| " "}
          onChange={handleInputChange}
        />
        <input type="submit" value={id? "Update": "Save"} />
      </form>
    </div>
  );
};

export default AddEdit;
