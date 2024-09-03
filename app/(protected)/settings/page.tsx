import React from 'react';
import {auth} from '@/auth'

const Settings = async () => {
    const session = await auth()

    console.log(session, "SESSION");
    return (
        <div>Settings</div>
    );
}

export default Settings