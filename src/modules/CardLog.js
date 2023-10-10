import axios from 'axios';
import React, { useEffect, useRef } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import SearchOutput from './SearchOutput';
import { UserInfo } from './UserInfoContext';
import UserSearch from './UserSearch';



function CardLog(props) {
  const [isCheckIn, setIsCheckIn] = React.useState(false);
  const [isCheckOut, setIsCheckOut] = React.useState(false)
  const [email, setEmail] = React.useState("")
  const location = useLocation();
  const navigate = useNavigate();
  const { accessToken } = UserInfo();
  const axiosPrivate = useAxiosPrivate();
  const emailRef = useRef();
  const checkInEmailRef = useRef();
  const[equipment, setEquipment] = React.useState([]);
  const [color, setColor] = React.useState(""); //Used to check the current page 
  const [selValue, setSelValue] = React.useState(""); //place contains a string with either iLab, IO, or MS representing the different spaces 
  const iLabColor = "#DB8B54";
  const MSColor = "#7DC85F";
  const IOColor = "#416C86";
  const [valid, setValid] = React.useState(true)
  const [badges, setBadges] = React.useState([]);
  const [name, setName] = React.useState("")

    const updateEmail = (e) => {
        e.preventDefault()
        setEmail(emailRef.current.value)
        emailSearch(emailRef.current.value)
    }

    const emailSearch = async (email) => {
        let controller = new AbortController();
        try {
            const response = await axiosPrivate.get(`/cert/${email}`, {
                signal: controller.signal
            })
            if(!response) {
                navigate('/login')
                return
            }
            console.log(response.data.badges)
            setValid(true)
            setBadges(response.data.badges)
            setName(response.data.name)
            if(!location.pathname.includes('active'))
            {
              navigate(location.pathname + '/active')
            }
            controller.abort()
        } catch(err) {
            console.error(err)
            setValid(false);
        }
    }

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
  }, [isCheckIn, isCheckOut])
  

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

  const turnOffModal = () => {
    setIsCheckIn(false)
    setIsCheckOut(false)
  }

  const formSubmit = async (e) => {
    e.preventDefault()

    if(selEquip.strip().length === 0)
    {
      
      return 
    }

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
        "email": checkInEmailRef.current.value,
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
      checkInUseEquipment()
      console.log(response)
    })
    .catch(function(error) {
      console.log(error)
    })
  }

  return (
    <>
      <div className='modalScreen' style={{display: isCheckIn || isCheckOut ? "flex": "none"}}>
        <div className='modal'>
          <header style={{backgroundColor: color}}>{isCheckIn ? "Check In": "Check Out"} - {props.place}</header>
          {isCheckIn ?
          (
            <>
              <form className="inputBox checkForm" onSubmit={formSubmit}>
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
            </>
          ) :
          (
            <>
              <form className="inputBox checkForm" onSubmit={formSubmit}>
                  <label>Equipment:</label>
                  <select type="text" onChange={(e) => setSelValue(e.target.value)}>
                  {equipment.map(equip => {
                      return <option key={equip.cardID}>{equip.name} - {equip.identifier}</option>
                  })
                  }
                  </select>
                  <label>Enter E-Mail:</label>
                  <input type="email" ref={checkInEmailRef} value={email} onChange={(input) => setEmail(input.target.value)}></input>
                  <button style={{backgroundColor: color}} className="button">Submit</button>
              </form>
            </>
          )
          }
        </div>
        <span className="exitButton" onClick={() => turnOffModal()}></span>
      </div>

      <form onSubmit={(e) => updateEmail(e)} id="userSearchBox" className="inputBox">
        <h2 className='formTitle'>Check Certification - {props.place}</h2>
        <label>Enter Student Email:</label>
        <input type="search" ref={emailRef} autoFocus></input>
        <p className="errorMessage" style={{display: `${!valid? "block" : "none"}`}}>Error: ID is invalid</p>
        <nav id="buttonRow">
          <div id="subButtonRow">
            <button id="checkIn" className="button" type="button" onClick={() => setIsCheckIn(true)}>Check In</button>
            <button id="checkOut" className="button" type="button" onClick={() => setIsCheckOut(true)}>Check Out</button>
          </div>
          <button className="button">Submit</button>
        </nav>
      </form>
      <Routes>
          <Route path="/active" element={<SearchOutput name={name} namebadges={badges}/>}/>   
      </Routes>
    </>
  )
}

export default CardLog;
