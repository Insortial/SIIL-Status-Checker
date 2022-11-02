import axios from 'axios';
import React, { useEffect, useRef } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { UserInfo } from './UserInfoContext';



function CardLog(props) {
  const [isCheckIn, setIsCheckIn] = React.useState(false);
  const navigate = useNavigate();
  const { accessToken } = UserInfo();
  const axiosPrivate = useAxiosPrivate();
  const emailRef = useRef();
  const[equipment, setEquipment] = React.useState([]);
  const [color, setColor] = React.useState(""); //Used to check the current page 
  const [selValue, setSelValue] = React.useState(""); //place contains a string with either iLab, IO, or MS representing the different spaces 
  const iLabColor = "#DB8B54";
  const MSColor = "#7DC85F";
  const IOColor = "#416C86";

  useEffect(() => {
    checkInUseEquipment();
    switch(props.place) {
      case "iLab":
        setColor(iLabColor);
        break;
      case "IO":
        setColor(IOColor);
        break;
      case "MS":
        setColor(MSColor);
        break;
      default:
        break;
    }
  }, [isCheckIn])
  

  const checkInUseEquipment = async () => {
    let controller = new AbortController();
    try {
      const response = await axiosPrivate.get(`http://localhost:3000/equipment/${props.place}/${isCheckIn ? "":"in"}active`, {
          signal: controller.signal
      })
      if(!response) {
          navigate('/login')
          return
      }
      console.log(JSON.stringify(response.data));
      let equipList = response.data.list;

      if(equipList.length !== 0)
        setSelValue(`${equipList[0].name} - ${equipList[0].identifier}`);
      else
        setSelValue("Empty")

      setEquipment(response.data.list);
      controller.abort()
    } catch(err) {
        console.error(err)
    }
  }

  const formSubmit = async (e) => {
    e.preventDefault()
    let controller = new AbortController();
    let decodedSel = selValue.split(" - ");
    let selEquip = equipment.find((e) => e.name == decodedSel[0] && e.identifier == decodedSel[1]);

    let config = {
      method: isCheckIn ? "delete" : "post",
      url: 'http://localhost:3000/equipment-log/' + (isCheckIn ? selEquip.cardID : ""),
      headers: { 
          'Content-Type': 'application/json'
      }
    };

    if(!isCheckIn) {
      let data = JSON.stringify({
        "email": emailRef.current.value,
        "id": selEquip.cardID,
        "type": selEquip.type,
        "location": props.place
      })
      config.data = data;
    } else {
      config.headers = {}
    }

    axiosPrivate(config)
    .then(function (response) {
        console.log(response)
    })
    .catch(function (error) {
        console.log(error);
    });

    config.method = "patch"
    config.url = `http://localhost:3000/equipment/${selEquip.cardID}`
    config.data = { "inUse": !isCheckIn }

    axiosPrivate(config)
    .then(function (response) {
      console.log(response)
    })
    .catch(function(error) {
      console.log(error)
    })
  }

  return (
    <>
        {isCheckIn ?
        (
          <>
            <form className="inputBox checkForm" onSubmit={formSubmit}>
                <h2 className="formTitle">Check In - {props.place}</h2>
                <label>Equipment:</label>
                <select type="text" value={selValue} onChange={(e) => setSelValue(e.target.value)}>
                {equipment.map(equip => {
                    return <option key={equip.cardID}>{equip.name} - {equip.identifier}</option>
                })
                }
                </select>
                <label>{"Enter Hours Completed (Optional)"}</label>
                <section className="timeRow">
                  <div>
                    <label>Hours</label>
                    <input></input>
                  </div>
                  <div>
                    <label>Minutes</label>
                    <input></input>
                  </div>
                </section>
                <button style={{backgroundColor: color}} className="button">Submit</button>
            </form>
            <section className="menuNav">
              <button style={{backgroundColor: color}} className="button" onClick={() => setIsCheckIn(true)}>Check In</button>
              <button style={{backgroundColor: color}} className="button" onClick={() => setIsCheckIn(false)}>Check Out</button>
            </section>
          </>
        ) :
        (
          <>
            <form className="inputBox checkForm" onSubmit={formSubmit}>
                <h2 className="formTitle">Check Out - {props.place}</h2>
                <label>Equipment:</label>
                <select type="text" onChange={(e) => setSelValue(e.target.value)}>
                {equipment.map(equip => {
                    return <option key={equip.cardID}>{equip.name} - {equip.identifier}</option>
                })
                }
                </select>
                <label>Enter E-Mail:</label>
                <input type="email" ref={emailRef}></input>
                <button style={{backgroundColor: color}} className="button">Submit</button>
            </form>
            <section className="menuNav">
              <button style={{backgroundColor: color}}className="button" onClick={() => setIsCheckIn(true)}>Check In</button>
              <button style={{backgroundColor: color}} className="button" onClick={() => setIsCheckIn(false)}>Check Out</button>
            </section>
          </>
        )
        }
    </>
  )
}

export default CardLog;
