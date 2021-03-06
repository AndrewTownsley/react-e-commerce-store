import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { CartState } from '../../Context/Context';
import { Button, COLORS, STYLES, BORDERS } from '../../StyleProps'

const ConfirmationWrapper = styled.section`
        height: calc(100vh - 95px);
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${COLORS.white};
        div {
            margin: 0 auto;
            text-align: center;
            h1 {
                color ${COLORS.textDark}
            }
            a {
                display: flex;
                justify-content: center;
                align-items: center;
                button {
                    padding: 1rem;
                }
            }
        }
`

const ConformationContent = styled.div`
        width: 50vw;
        height: 40%;
        margin: 2rem auto;
        padding: ${STYLES.paddingLayout};
        border: ${BORDERS.borderSecondary};
        border-radius: ${BORDERS.radiusSecondary};
        box-shadow: ${STYLES.boxShadow};
        background: ${COLORS.textWhite};
` 


const ConfirmationModal = ({ shipFormData, setShipFormData, paymentFormActive, setPaymentFormActive, setOrderConfirmation}) => {
    const { state: { cart, setCart, groundShipping, setCartTotal, setCartQuantity },  productQty,
    setProductQty,
    dispatch  } = CartState();
    const randomNumber = Math.floor(Math.random() * 100000)
    console.log("Confirmation ship data:", shipFormData);
    
    const date = Date.now()
    const shipDate = new Date(date);
    const shipDateString = shipDate.toDateString();
    const groundDeliveryDate = new Date(shipDate.setDate(shipDate.getDate() + 35));
    
    const resetAllState = () => {
        setShipFormData({
            name: "",
            address: "",
            city: "",
            state: "",
            zip: "",
            phone: "",
            email: "",
            groundShipping: false,
            groundDeliveryDate: "",
            groundDeliveryTime: "", 

    })
        setPaymentFormActive(false)
        // setCart([]);
        // setCartTotal(0);
        // setCartQuantity(0);
        console.log(cart);
        console.log(paymentFormActive);
        setOrderConfirmation(false)
    }


return (
    <ConfirmationWrapper>
        <ConformationContent>
            <div>

                <h1>Order Confirmation</h1>
                <p>confirmation #{randomNumber}</p>

                <h4>Estimated delivery date:
                {
                    groundShipping ? 
                    groundDeliveryDate.toDateString()
                    :
                    shipDateString
                }
                </h4>
                <p><strong>Shipping to:</strong> {shipFormData.address}</p>
                <p>{shipFormData.city} {shipFormData.state} {shipFormData.zipCode}
                </p>   
                    <Link to="/">
                        <Button 
                        onClick={() => {
                            dispatch({
                                type: "CLEAR_CART",
                                payload: []
                            })
                            resetAllState()}
                        }
                        >
                        Continue Shopping...
                        </Button>
                    </Link>
            </div>
        </ConformationContent>
    </ConfirmationWrapper>
)
};

export default ConfirmationModal;