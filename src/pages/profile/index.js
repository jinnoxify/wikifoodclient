import React from "react";
import "./style.scss";
import { useStateValue } from "../../contextAPI/StateProvider";
import Header from "../../components/Header";
import Recipe from "../home/components/Recipe";

function Profile() {
  const [{ user, recipeId }] = useStateValue();
  return (
    <div>
      <Header fav />
      <h1 className="favSection__header">Wiki Food</h1>
      {recipeId?.length === 0 ? (
        <div className="favSection">
          <h2 className="favSection__title">
            {" "}
            Your favorite recipes section is empty
          </h2>
          <p>
            You have no favorite recipes in this section. To put some recipes
            here, you have to add them by clicking on add to favorites in the
            main section of the page.
          </p>
        </div>
      ) : (
        <div className="favSection">
          <h2 className="favSection__title">
            Hello {user?.username}, this is your favorite recipes section
          </h2>
          <div className="recipes">
            {" "}
            {recipeId.map((recipe) => (
              <Recipe removeBtn recipe={recipe} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
