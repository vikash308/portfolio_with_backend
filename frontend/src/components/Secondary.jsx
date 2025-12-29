import React, { useEffect, useState } from 'react'
import About from './About';
import Projects from './Projects';
import Contact from './Contact';
import Information from './Information';
import Navbar from './Navbar';
import server from '../Api';
import axios from 'axios'

const Secondary = () => {
   const [portfolio, setPortfolio] = useState({
     about: "",
     image: "",
     skills: [],
     project: [],
   });
   useEffect(() => {
     const fetchPortfolio = async () => {
       try {
         const res = await axios.get(`${server}/portfolio`);
         console.log(res.data);
          setPortfolio(res.data);
       } catch (error) {
         console.error(error);
       }
     };

     fetchPortfolio();
   }, []);

  return (
    <div className='main'>
        <Navbar/>
        <Information image={portfolio.image}/>
        <div className="content">
      <About about={portfolio.about} skills={portfolio.skills}/>
      <Projects projects={portfolio.project} />
      <Contact />
        </div>
    </div>
  );
}

export default Secondary