import React, { useState } from 'react';
import Home from './assets/components/screens/home/home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from './assets/components/screens/auth/Auth';
import Vote from './assets/components/screens/vote/vote';
import User from './assets/components/screens/user/user';


const App = () => {
    const [currentUser, setCurrentUser] = useState(null);
    
    return ( 
        <div>
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<Auth user={currentUser} setCurrentUser={setCurrentUser}/>}/>
                <Route path="/home" element={<Home user={currentUser}/>}/>
                <Route path="/vote/:id" element={<Vote user={currentUser}/>}/>
                <Route path="/vote/:voteId/user/:userId" element={<User user={currentUser}/>}/>

                <Route path='*' element={<div>.................................Not Found.................................</div>} />
            </Routes> 
            </BrowserRouter>
        </div>
     );
}
 
export default App;