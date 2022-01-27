import Card from "../UI/Card";
import classes from './AvailableMeals.module.css'
import MealItem from "./MealItem/MealItem";
import {useCallback, useEffect, useState} from "react";

// Allows a new meal to be pushed to the database
const putData = async (meals) => {

    const response = await fetch('https://react-http-4d9db-default-rtdb.firebaseio.com/meals.json',
        {
            method: 'POST',
            body: JSON.stringify(meals),
            headers: {
                'Content-type': 'application/json'
            }
        }
    )
    if (!response.ok) {
        throw new Error('Something went wrong')
    }
}


const AvailableMeals = () => {
    const [mealList, setMealList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [httpError, setHttpError] = useState(null)


    // fetch data on page/component load
    useEffect(() => {
        // Grab the meals from the database to be shown on the site
        const getMeals = async () => {

            // Get request to fetch meal data from Firebase
            const response = await fetch('https://react-http-4d9db-default-rtdb.firebaseio.com/meals.json')

            // Verify the response was successful. If not create an error message
            if (!response.ok) {
                throw new Error('Something went wrong')
            }

            // create JSON object from the response
            const data = await response.json()

            // temporary list to hold meals
            const tempList = []

            // due to structure of the db this improves readability
            const dataList = data['-Mtyc404kD3t90Mvrmwo']

            // loop through and grab meal data
            for (const key in dataList) {
                tempList.push({
                    id: dataList[key].id,
                    name: dataList[key].name,
                    description: dataList[key].description,
                    price: dataList[key].price
                })
            }

            // set state variable to the new list
            setIsLoading(false)
            setMealList(tempList)


        }
        getMeals().catch(error => {
            setIsLoading(false)
            setHttpError(error.message)
        })
    }, [])

    // show loading text while waiting for Firebase to return data
    if (isLoading) {
        return (
            <section className={classes.MealsLoading}>
                <p>Loading...</p>
            </section>
        )
    }

    if (httpError) {
         return (
            <section className={classes.HttpError}>
                <p>{httpError}</p>
            </section>
        )
    }

    // map meal data to MealItem components
    const mealsList = mealList.map(meal =>
        <MealItem
            id={meal.id}
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />)

    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    )
}

export default AvailableMeals