import React, { useState } from "react";
import RecipeDetails from "./RecipeDetails";
import { useStateValue } from "../../../contextAPI/StateProvider";

const Recipe = ({ recipe, removeBtn }) => {
  const [show, setShow] = useState(false);
  const { label, image, url, ingredients } = recipe;
  const [buttonText, setButtonText] = useState("Add to favorites");
  const [{}, dispatch] = useStateValue();

  const changeText = (text) => setButtonText(text);

  const addToFav = () => {
    dispatch({
      type: "ADD_FAV_LIST",
      item: {
        label: label,
        image: image,
        url: url,
        ingredients: ingredients,
      },
    });
    changeText("Added to favorites");
    console.log(buttonText);
  };

  const remove = () => {
    dispatch({
      type: "REMOVE_FAV_LIST",
      label: label,
    });
  };

  return (
    <>
      {removeBtn ? (
        <div className="recipe">
          <h2>{label}</h2>

          <a href={url} target="_blank" rel="noopener noreferrer">
            <img src={image} alt={label} />
          </a>
          <button onClick={() => setShow(!show)}>Ingredients</button>
          {show && <RecipeDetails ingredients={ingredients} />}
          <button onClick={remove}>Remove from favorites</button>
        </div>
      ) : (
        <div className="recipe">
          <h2>{label}</h2>

          <a href={url} target="_blank" rel="noopener noreferrer">
            <img src={image} alt={label} />
          </a>
          <button onClick={() => setShow(!show)}>Ingredients</button>
          {show && <RecipeDetails ingredients={ingredients} />}
          <button onClick={addToFav}>{buttonText}</button>
        </div>
      )}
    </>
  );
};

export default Recipe;
