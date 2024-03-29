import { Link, Route, Routes } from 'react-router-dom';
import CardLog from './CardLog';


function Menu() {

  return (
    <section className="inputBox">
      <h2 className="formTitle">Where are you?</h2>
      <Link to="/menu/iLab" className='reactLink'>
        <div className="menuButton" style={{backgroundColor: "#DB8B54"}}>
          <div className="logo" style={{backgroundImage: `url(https://res.cloudinary.com/djaym8qp6/image/upload/v1668641370/iLab_Logo_Only_White_rg7wrs.png)`}}></div>
          <h2>iLab</h2>
        </div>
      </Link>
      <Link to="/menu/MS" className='reactLink'>
        <div className="menuButton" style={{backgroundColor: "#7DC85F"}}>
          <div className="logo" style={{backgroundImage: `url(https://res.cloudinary.com/djaym8qp6/image/upload/v1668641454/MS_Logo_Only_White_romo0g.png)`}}></div>
          <h2>Maker Studio</h2>
        </div>
      </Link>
      <Link  to="/menu/IO" className='reactLink'>
        <div className="menuButton" style={{backgroundColor: "#416C86"}}>
          <div className="logo" style={{backgroundImage: `url(https://res.cloudinary.com/djaym8qp6/image/upload/v1668641448/IO_Logo_Only_White_t7shja.png)`}}></div>
          <h2>Innovation Orchard</h2>
        </div>
      </Link>
    </section>
  )
}

export default Menu