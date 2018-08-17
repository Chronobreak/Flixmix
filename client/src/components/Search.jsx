import React from "react";

let Search = props => {
  return (
    <div
      style={{
        marginTop: "10px",
        marginLeft: "10px"
      }}
    >
      <form onSubmit={props.searchOnSubmit}>
        <input
          className="input is-primary fa"
          style={{
            fontFamily: "FontAwesome;",
            backgroundColor: "#fdf6e3"
            // backgroundColor: "#e4e4e4"
          }}
          placeholder="Search for movies here!"
          onChange={props.updateUserInput}
        />
      </form>
    </div>
  );
};

export default Search;
