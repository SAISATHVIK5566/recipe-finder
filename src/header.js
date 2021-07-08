import React, {Component} from "react";

class Header extends Component{
        constructor(props){
                super(props);
                this.state = {
                        searched: false,
                        recipe: "",
                };
        }

        getRecipe = (e) => {e.preventDefault();
        

                var item = document.getElementById("text").value;

                this.setState({
                        searched: true,
                        recipe: item,
                });
        };
 
        render() {
                return (
                  <div>
                    <div className="header-cont">
                      <h1 className="heading">Recipe Finder</h1>
                      <form className="input-form">
                        <input
                          type="text"
                          placeholder="Enter the name of the dish"
                          id="text"
                        />
                        <input
                          type="submit"
                          value="Get Ingredients"
                          onClick={this.getRecipe}
                        />
                      </form>
                    </div>
                    {this.state.searched ? (
                      <RecipeContent recipe={this.state.recipe} />
                    ) : (
                      <h2 className="center">
                        Type a Dish Name to search for its ingredients
                      </h2>
                    )}
                  </div>
                );
              }
}

export default Header;