import React, {useState} from 'react';
import { Alert } from 'react-bootstrap'

const Message = ({ variant, children }) => {

    const [show, setShow] = useState(true)

    return (
        <Alert
            show={show}
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