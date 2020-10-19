import React, { useState } from 'react'

// Create an order context
const OrderContext = React.createContext()

// Create a provider
export function OrderProvider({ children }) {
	// We need to add state in here
	const [order, setOrder] = useState([])
	return <OrderContext.Provider value={[order, setOrder]}>{children}</OrderContext.Provider>
}

export default OrderContext
