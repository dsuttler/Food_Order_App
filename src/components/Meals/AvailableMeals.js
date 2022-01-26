import Card from "../UI/Card";
import classes from './AvailableMeals.module.css'
import MealItem from "./MealItem/MealItem";
import {useCallback, useEffect, useState} from "react";

// Allows a meal to be pushed to the database
const putData = async (meals) => {

        const response = await fetch ('https://react-http-4d9db-default-rtdb.firebaseio.com/meals.json',
            {
                method: 'POST',
                body: JSON.stringify(meals),
                headers: {
                    'Content-type': 'application/json'
                }
            }
        )
        if(!response.ok) {
            throw new Error('Something went wrong')
        }
}



const AvailableMeals = () => {
    const [mealList, setMealList] = useState([])


    // Grab the meals from the database to be shown on the site
    const getMeals = useCallback(async () => {
        try {
            const response = await fetch('https://react-http-4d9db-default-rtdb.firebaseio.com/meals.json')

            if(!response.ok) {
                throw new Error('Something went wrong')
            }

            const data = await response.json()

            const tempList = []

            console.log(data)

            for (const key in data) {
                for(let i = 0; i < data[key].length; i++) {
                    tempList.push({
                        id: data[key][i].id,
                        name: data[key][i].name,
                        description: data[key][i].description,
                        price: data[key][i].price
                    })
                    console.log(data[key][i].id)
                    console.log(data[key][i].name)
                    console.log(data[key][i].description)
                    console.log(data[key][i].price)
                }
            }

            setMealList(tempList)

        } catch (error) {console.log(error.message)}

    }, [])

    useEffect(() => {
        getMeals()
    },[getMeals])

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