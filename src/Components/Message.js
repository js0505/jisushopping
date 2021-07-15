import React from 'react';
import { Alert } from 'react-bootstrap'

const Message = ({ variant, children, setShow }) => {
    return (
        <Alert
            onClose={() => setShow(false)}
            variant={variant}
            dismissible
        >
            {children}
        </Alert>
    );
};

Message.defaultProps = {
    variant: 'info',
}

export default Message;