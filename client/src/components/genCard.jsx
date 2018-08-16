import React from "react";

let genCard = ({ poster_path, release_date, title, overview }) => {
  return (
    <div
      className="message card is-warning weird"
      style={{
        marginLeft: "10px"
      }}
    >
      <div className="media-content ">
        <div className="message-header">
          {title} <small>{release_date}</small>
        </div>
      </div>
      <div className="columns">
        <div className="card-image column is-2">
          <p className=" image">
            <img
              className="cardimg"
              src={"https://image.tmdb.org/t/p/w500" + poster_path}
            />
          </p>
        </div>
        <div className="message-body message-body-movie column is-8">
          <p style={{}}>
            <small>{overview.slice(0, 280)}</small>
          </p>
        </div>
      </div>
      <div
        className="media-right"
        style={{
          visibility: "hidden"
        }}
      />
    </div>
  );
};

export default genCard;