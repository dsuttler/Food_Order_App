import {useRef, useState} from "react";
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === ''
const isFiveChars = value => value.trim().length === 5

const Checkout = (props) => {

    // could replace with useReducer
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true
    })

    const nameInputRef = useRef()
    const streetInputRef = useRef()
    const postalCodeInputRef = useRef()
    const cityInputRef = useRef()

    // handles submission of form
    const confirmHandler = (event) => {
        event.preventDefault();

        // grab values if each ref on the form
        const enteredName = nameInputRef.current.value
        const enteredStreet = streetInputRef.current.value
        const enteredPostalCode = postalCodeInputRef.current.value
        const enteredCity = cityInputRef.current.value

        // verify individual values
        const enteredNameIsValid = !isEmpty(enteredName)
        const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode)
        const enteredCityIsValid = !isEmpty(enteredCity)
        const enteredStreetIsValid = !isEmpty(enteredStreet)

        setFormInputsValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postalCode: enteredPostalCodeIsValid
        })

        // check for overall form validity
        const formIsValid = (
            enteredNameIsValid &&
            enteredPostalCodeIsValid &&
            enteredCityIsValid &&
            enteredStreetIsValid
        )

        // handle invalid form
        if (!formIsValid) {
           return
        }

        // submit form

    };

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={classes.control}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef}/>
                {!formInputsValidity.name && <p>Please enter a valid name.</p>}
            </div>
            <div className={classes.control}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetInputRef}/>
            </div>
            <div className={classes.control}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postalCodeInputRef}/>
            </div>
            <div className={classes.control}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInputRef}/>
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;