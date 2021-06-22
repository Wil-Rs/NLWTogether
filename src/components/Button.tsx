import { ButtonHTMLAttributes } from 'react'

import './../styles/button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLElement>

export const Button = (props: ButtonProps) => {
    return (
        <button className="button" {...props} />
    )
}