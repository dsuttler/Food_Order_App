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
        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postalCode: enteredPostalCode
        })
    };

    // improve code readability
    const injectInvalidClass = formItem => {
        return `${classes.control} ${formItem ? '' : classes.invalid}`
    }

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={injectInvalidClass(formInputsValidity.name)}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef}/>
                {!formInputsValidity.name && <p>Please enter a valid name.</p>}
            </div>
            <div className={injectInvalidClass(formInputsValidity.street)}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetInputRef}/>
                {!formInputsValidity.street && <p>Please enter a valid street.</p>}
            </div>
            <div className={injectInvalidClass(formInputsValidity.postalCode)}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postalCodeInputRef}/>
                {!formInputsValidity.postalCode && <p>Please enter a valid postal code.</p>}
            </div>
            <div className={injectInvalidClass(formInputsValidity.city)}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInputRef}/>
                {!formInputsValidity.city && <p>Please enter a valid city.</p>}
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