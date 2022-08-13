import React from 'react';

const Home = () => {
    
    const myStyle={
        backgroundImage:"url('https://images.unsplash.com/photo-1456613820599-bfe244172af5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80')",
        height:'100vh',
        marginTop:'0px',
        fontSize:'50px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        color: 'white',
      };

    return (
        <div style={myStyle}> 
            
            <img source={"jackson-blackhurst-AezEmNkxXQg-unsplash.jpg"}/>
        </div>
    )
}

export default Home;

//<p align="center"> speed record holders for any given route </p>