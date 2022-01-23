import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import { CartState } from '../Context/Context';

const Cart = () => {
    const [total, setTotal] = useState(0.00);
    const { state: { cart, setCart } } = CartState();

    useEffect(() => {
        setTotal(cart.reduce((a, b) => a + Number(b.price) * Number(b.qty), 0))
    }, [cart])

      

    return (
        <div className='cart'>
            <h3>Cart</h3>
            <h4>{cart.length} Items</h4>
            <h5>Total: ${total}</h5>
            <Link to="/checkout"><button>Checkout</button></Link>
            <div className="product-container">
                {
                    cart.map((product, index) => (
                        <CartItem 
                            key={index} 
                            product={product} 
                            cart={cart} 
                            setCart={setCart}
                        />

                    ))
                }
            </div>
        </div>
    )
}


export default Cart
