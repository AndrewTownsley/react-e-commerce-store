import React, { useEffect, useState } from 'react'
import { CartState } from '../../Context/Context';


const ShippingForm = ({ total, setTotal, setPaymentFormActive, shipFormData, setShipFormData }) => {
    const { state: { cart, setCart, states }} = CartState();
    const [shipFormSubmit, setShipFormSubmit] = useState(false);
    const [shipTotal, setShipTotal] = useState(0)
    const [groundShipping, setGroundShipping] = useState(true);
  

    const handleShipFormSubmit = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setShipFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }



    const shipMethodChange = (e) => {
      
        console.log(e.target.value);

        if(e.target.value === "10" && shipTotal === 0) {
            console.log("Next Day");
            setTotal(total + 10)
            setShipTotal(10)
        } else if(e.target.value === "0" && shipTotal === 0) {
            console.log("Ground");
            setTotal(total)
            setShipTotal(0)
        } else if(e.target.value === "0" && shipTotal === 10) {
            console.log("Ground");
            setTotal(total - 10)
            setShipTotal(0)
        }
        setPaymentFormActive(true)
        console.log("total: ", total);
    }

        
    return (
        <section 
            onSubmit={(e) => e.preventDefault}
            className='checkout-form' 
            action="submit"
        >
                            <section className="user-info">
                {/* <h3>Ship To:</h3> */}
                <p><strong>Contact:</strong> {shipFormData.firstName} {shipFormData.lastName}</p>
                <p>{shipFormData.email}</p>
                <p><strong>Ship to:</strong> {shipFormData.address} 
                </p>
                <p>{shipFormData.city} {shipFormData.state} {shipFormData.zipCode}
                </p>
            </section>
                            <h3>Contact Information</h3>
                        <label htmlFor="email">
                            <input 
                                placeholder="Email" 
                                type="email"
                                name="email"
                                onChange={handleShipFormSubmit} 
                            />
                        </label>
                        <h3>Shipping Information</h3>
                        <label htmlFor="firstName">
                            <input 
                                placeholder="First name" 
                                id="firstName" 
                                type="text"
                                name="firstName"
                                onChange={handleShipFormSubmit} 
                            />
                        </label>
                        <label htmlFor="lastName">
                            <input 
                                placeholder="Last name" 
                                id="lastName" 
                                type="text"
                                name="lastName" 
                                onChange={handleShipFormSubmit}
                            />
                        </label>
                        <label htmlFor="address">
                            <input 
                                placeholder="Address" 
                                id="address" 
                                type="text"
                                name="address"
                                onChange={handleShipFormSubmit} 
                            />
                        </label>
                        <label htmlFor="apartment">
                            <input 
                                placeholder="Apartment" 
                                id="apartment" 
                                type="text"
                                name="apartment" 
                                onChange={handleShipFormSubmit}
                            />
                        </label>
                        <label htmlFor="city">
                            <input 
                                placeholder="City" 
                                id="city" 
                                type="text"
                                name="city"
                                onChange={handleShipFormSubmit} 
                            />
                        </label>
                        <label htmlFor="zipCode">
                            <input 
                                placeholder="Zip code" 
                                id="zipCode" 
                                type="text"
                                name="zipCode"
                                onChange={handleShipFormSubmit} 
                            />
                        </label>
                        {/* <select name="country" id="country">
                            <option value="usa">United States</option>
                            <option value="canada">Canada</option>
                            <option value="Mexico">Mexico</option>
                        </select> */}
                        <select 
                            id="state"
                            name="state"
                            onChange={handleShipFormSubmit} 
                        >
                            {
                                states.map((state) => (
                                    <option 
                                        key={state} 
                                        value={state}  
                                    >
                                        {state}
                                    </option>
                                ))
                            }
                        </select>
                        <button 
                            type="button"
                            onClick={() => setShipFormSubmit(true)}
                        >
                            Submit
                        </button>
                        {
                            shipFormSubmit && 
                        <section className='ship-options'>
                            <h3>Shipping Options</h3>
                            <label htmlFor="nextDay">
                                Next Day Shipping -- $10
                                <input 
                                    onChange={shipMethodChange}
                                    value="10"
                                    type="radio" 
                                    name="shipMethod" 
                                    id="nextDay" />
                            </label>
                            <label htmlFor="standard">
                                Standard Ground Shipping (5 days) -- Free
                                <input 
                                    onChange={shipMethodChange}
                                    value="0"
                                    type="radio" 
                                    name="shipMethod" 
                                    id="ground" />
                            </label>
                        </section>
                        }
                    </section>
    )
}

export default ShippingForm
