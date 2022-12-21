import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { contextData } from '../App';
import Alert from '../widgets/alert';

const Notifications = () => {
    const {notifications, setNotifications} = useContext(contextData)
    
    return (
        <div className="notification">
            {notifications.map(e=>(
                <Alert key={e.id} e={e} setNotifications={setNotifications} notifications={notifications}/>
            ))}
        </div>
    )
}

export default Notifications;