import CartContext from "./cart-context";
import { useReducer } from "react";

// the starting state for the context object
const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    // if the action selected is 'ADD'
    if (action.type === 'ADD') {

        // create a temp variable to hold the updated total price
        const updatedTotalAmount = state.totalAmount + (action.item.price * action.item.amount)

        // look to see if the item we are adding already exists
        // if no item found will return -1
        const existingCartItemsIndex = state.items.findIndex(item => item.id === action.item.id)

        // grab the existing cart item
        const existingCartItem = state.items[existingCartItemsIndex]
        let updatedItems

        // if not found, will be undefined
        // if the item does exist then if stmt will procede
        if (existingCartItem) {
            // spread the item to be updated and add the amount requested by action item
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }

            // grab the current item list
            updatedItems = [...state.items]

            // replace the old item with the new one
            updatedItems[existingCartItemsIndex] = updatedItem

          // if the selected item doesn't exist then add the new item to the list
        } else {
            updatedItems = state.items.concat(action.item)
        }

        // return the updated list of items and the updated total
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if (action.type === 'REMOVE') {
        // grab item place in the existing list (should always exist)
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.id)
        // grab the actual item
        const existingItem = state.items[existingCartItemIndex]
        // decrease the total by the amount of the selected item
        const updatedTotalAmount = state.totalAmount - existingItem.price
        let updatedItems

        // if it's the last item, remove it from the cart
        if (existingItem.amount === 1) {
            // for filter: if the function returns true on the item it will be kept
            //             if the function returns false then the item will be removed
            updatedItems = state.items.filter(item => item.id !== action.id)
        } else {
            const updatedItem = {...existingItem, amount: existingItem.amount - 1}
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if (action.type === 'CLEAR') {
        return defaultCartState
    }

    return defaultCartState
}

const CartProvider = props => {
    // creating the state of the context object. Default = defaultCartState
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

    const addItemToCartHandler = item => {
        dispatchCartAction({type: 'ADD', item: item})
    }

    const removeItemFromCartHandler = id => {
        dispatchCartAction({type: 'REMOVE', id: id})
    }

    const clearCartHandler = () => {
        dispatchCartAction({type: 'CLEAR'})
    }

    // the actual starting context object
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider