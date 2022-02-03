import React, { useState } from 'react';
import axiosWithAuth from '../authentication/axiosWithAuth';
import "../styles/recipeForm.css"

const initialRecipe = {
    id: 0,
    title: '',
    familyMember: '',
    ingredients: '',
    instructions: '',
    category: '',
    image: '',
}

function RecipeForm() {
    const [recipe, setRecipe] = useState(initialRecipe)

    const handleChange = e => {
        setRecipe({
            ...recipe,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { title, familyMember, ingredients, instructions, category, image } = recipe;

        const newRecipe = {
            recipe_name: title,
            recipe_img_url: image,
            recipe_ingredients: ingredients,
            recipe_instructions: instructions,
            source_id: 1,
            category_id: 1
        }
        axiosWithAuth()
            .post('https://secret-family-recipes-8.herokuapp.com/api/recipes', newRecipe)
            .then(resp => {
                console.log(resp)
            }).catch(err => {
                console.log(err)
            })
    }
    
  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <form onSubmit={handleSubmit}>
                <h1>Add a recipe</h1>
                <div className='formInput'>
                    <label>Title</label>
                    <input value={recipe.title} id="title" name="title" onChange={handleChange} />
                </div>
                <div className='formInput'>
                    <label>Family Member</label>
                    <input value={recipe.familyMember} id="familyMember" name="familyMember" onChange={handleChange} />
                </div>
                <div className='formInput'>
                    <label>ingredients</label>
                    <input value={recipe.ingredients} id="ingredients" name="ingredients" onChange={handleChange} />
                </div>
                <div className='formInput'>
                    <label>Instructions</label>
                    <input value={recipe.instructions} id="instructions" name="instructions" onChange={handleChange} />
                </div>
                <div className='formInput'>
                    <label>Category</label>
                    <input value={recipe.category} id="category" name="category" onChange={handleChange} />
                </div>
                <div className='formInput'>
                    <label >Image</label>
                    <input type="file" value={recipe.image} id="image" name="image" onChange={handleChange} />
                </div>

            </form>
        </div>
  </div>);
}

export default RecipeForm;
