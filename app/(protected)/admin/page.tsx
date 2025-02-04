'use client'

import { FC } from 'react'
import { useCurrentRole } from '../../../hooks/useCurrentRole'

const AdminPage: FC = () => {
    const role = useCurrentRole()
    return <div>Current role: {role}</div>
}

export default AdminPage
