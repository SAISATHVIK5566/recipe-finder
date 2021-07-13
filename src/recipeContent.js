import React, {Component} from "react";
import Axios from "axios";
//import CSS file
import "./recipeContent.css";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

class RecipeContent extends Component{
        constructor(props){
                super(props);
                this.state={
                        meal: [],
                };
        }

        componentDidMount(){
                console.log(
                        "https://www.themealdb.com/api/json/v1/1/search.php?s=" +
                        this.props.recipe
                );
                if(this.props.recipe==="") alert("ENTER A VALID VALUE!!");
                        else {
                                Axios.get(
                                        "https://www.themealdb.com/api/json/v1/1/search.php?s=" +
                                          this.props.recipe
                                      ).then((resolve) => {
                                        console.log(resolve.data.meals);
                                        this.setState({
                                          meal: resolve.data.meals,
                                        });
                                      });
                        }
        }

        componentDidUpdate(prevProps) {
                if (this.props.recipe !== prevProps.recipe) {
                  if (this.props.recipe === "") alert("Enter a Dish!!");
                  else {
                    Axios.get(
                      "https://www.themealdb.com/api/json/v1/1/search.php?s=" +
                        this.props.recipe
                    ).then((resolve) => {
                      console.log(resolve.data.meals);
                      this.setState({
                        meal: resolve.data.meals,
                      });
                    });
                  }
                }
              }

        render(){
                const{meal} = this.state;
                if(meal !== null && meal.length>0){
                        var list = [];
                        let i = 1;

                        while (meal[0]["strIngredient"+i]!==""){

                                list.push(
                                        <li key={i}>
                                                {meal[0]["strIngredient" + i] + "----" + meal[0]["strMeasure" + i]}
                                        </li>
                                );
                                i++;
                        }
                        console.log(list);
                }

                const id = 
                meal !== null && meal.length > 0 ? (
                        <div className="recipeContainer">
                          <div className="title">
                            <h1>{meal[0].strMeal}</h1>
                            <FormControlLabel
        control={<Checkbox icon={<FavoriteBorder />} 
                  checkedIcon={<Favorite />}
          name="checkedH" />}/>
                          </div>
                          <div className="recipeData">
                            <img
                              src={meal[0].strMealThumb}
                              alt={"Your meal for " + meal[0].strMeal}
                            />
                            <div className="textInfo">
                              <p>
                                <em>Category of Meal:</em> {meal[0].strCategory}{" "}
                              </p>
                              <p>
                                <em>Area of the Meal:</em> {meal[0].strArea}{" "}
                              </p>
                              <h3>
                                      Ingredients<style></style></h3>
                              <ul className="ingredients">{list}</ul>
                              <h3>Recipes</h3>
                              <div className="recipes">{meal[0].strInstructions}</div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="nada">No Data has been received</div>
                      );
                    return <div>{id}</div>;
        }





}
export default RecipeContent;