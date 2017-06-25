import React from 'react';
import "./css/subscription.css"

const SubscriptionMenu = ({link}) => {
    return (
        <div className="subscription-item">
            {link}
        </div>
    );
};

export default SubscriptionMenu;