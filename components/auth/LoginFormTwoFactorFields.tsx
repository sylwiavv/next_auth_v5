import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoginFormFieldsProps } from './LoginFormFields'

const LoginFormTwoFactorFields = ({
    form,
    isPending,
}: LoginFormFieldsProps) => {
    return (
        <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Two Factor</FormLabel>
                    <FormControl>
                        <Input
                            disabled={isPending}
                            {...field}
                            placeholder="123456"
                            type="number"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default LoginFormTwoFactorFields
