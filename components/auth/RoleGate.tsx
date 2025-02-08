import { UserRole } from '@prisma/client'
import React from 'react'
import { useCurrentRole } from '../../hooks/useCurrentRole'
import { FormError } from './FormError'

interface RoleGateProps {
    children: React.ReactNode
    allowedRole: UserRole
}

const RoleGate: React.FC<RoleGateProps> = ({ children, allowedRole }) => {
    const role = useCurrentRole()

    if (role !== allowedRole) {
        return <FormError message="Permission denined" />
    }
    return <>{children}</>
}

export default RoleGate
