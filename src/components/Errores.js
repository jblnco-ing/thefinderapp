import React from 'react'
import { Alert } from 'antd'

export const Errors = ({message}) => {
    return (
        <Alert message={message} type="error"/>
    )
}
