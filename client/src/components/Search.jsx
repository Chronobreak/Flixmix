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
          placeholder="&#xf002;"
          onChange={props.updateUserInput}
        />
      </form>
    </div>
  );
};

export default Search;
