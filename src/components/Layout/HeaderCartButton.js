import classes from './HeaderCartButton.module.css'
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import { useContext, useEffect, useState } from "react";

const HeaderCartButton = props => {
    const [btnHighlighted, setBtnHighlighted] = useState(false)

    const cartCtx = useContext(CartContext)

    const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount
    }, 0)

    const { items } = cartCtx

    const btnClasses = `${classes.button} ${btnHighlighted ? classes.bump : ''}`

    useEffect(() => {
        if (items.length == 0) {
            return
        }
        setBtnHighlighted(true)

        // reset the bump animation
        const timer = setTimeout(() => {
            setBtnHighlighted(false)
        }, 300)

        // cleanup function to clear the timer
        return () => {
            clearTimeout(timer)
        }
    }, [items])

    return (
        <button className={btnClasses} onClick={props.onShowCart}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )
}

export default HeaderCartButton