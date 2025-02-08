'use client'

import { UserRole } from '@prisma/client'
import { FC } from 'react'
import { toast } from 'sonner'
import { admin } from '../../../actions/admin'
import { FormSuccess } from '../../../components/auth/FormSuccess'
import RoleGate from '../../../components/auth/RoleGate'
import { Button } from '../../../components/ui/button'
import { Card, CardContent, CardHeader } from '../../../components/ui/card'

const AdminPage: FC = () => {
    const onApiRouteClick = () => {
        console.log('click')
        fetch('/api/admin').then((response) => {
            if (response.ok) {
                toast.success('Allowed API Router')
                console.log('onApiRouteClick, ok')
            } else {
                console.error('onApiRouteClick FORBIDDEN')
                toast.error('Not Allowed API Router')
            }
        })
    }
    const onServerActionClick = () => {
        admin().then((data) => {
            if (data.success) {
                toast.success('Allowed API Router')
            }

            if (data.error) {
                toast.error('Not Allowed API Router')
            }
        })
    }

    return (
        <Card className="w-[600px]">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">Admin Page</p>
            </CardHeader>
            <CardContent className="space-y-4">
                <RoleGate allowedRole={UserRole.ADMIN}>
                    <FormSuccess message="You are allowed to see this content!" />
                </RoleGate>

                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-medium">Admin-only API Route</p>
                    <Button onClick={onApiRouteClick}>Click to test</Button>
                </div>

                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-medium">
                        Admin-only Server Action
                    </p>
                    <Button onClick={onServerActionClick}>Click to test</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default AdminPage
