import React from "react";
import genCard from "./genCard.jsx"

let SearchResults = props => {
  console.log(genCard)
  return (
    <div>
      <ul className="loost">
        {props.movies.map(movie => {
          return (
            <li
              className="animate fadeInLeft"
              style={{
                marginBottom: "10px"
              }}
              onClick={() => {
                props.add(movie);
              }}
            >
              {genCard(movie)}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchResults;
