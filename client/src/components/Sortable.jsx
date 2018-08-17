import React, { Component } from "react";
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from "react-sortable-hoc";

const DragHandle = SortableHandle(() => {
  return (
    <span className="icon is-small" style={{}}>
      <i
        className="fa fa-2x fa-bars"

      />
    </span>
  );
});

const SortableItem = SortableElement(props => {
  return (
    <div className="tile notification is-primary drag"  style={{
      cursor: "pointer",
      marginBottom: "1rem",

    }}>
      <DragHandle />
      <center
        style={{
          marginLeft: "20px"
        }}
      >
        {props.value}
      </center>
      <button
        className="delete"
        style={{
          marginTop: "15px",
          marginRight: "10px"
        }}
        onClick={() => props.deletePlaylist(props.what)}
      />
    </div>
  );
});

const SortableList = SortableContainer(({ items, deletePlaylist }) => {
  return (
    <div className="loost">
      {items.map((value, index) => {
        return (
          <SortableItem
            what={index}
            deletePlaylist={deletePlaylist}
            key={index}
            index={index}
            value={value}
          />
        );
      })}
    </div>
  );
});

let SortableComponent = props => {
  return (
    <SortableList
      useDragHandle={false}
      deletePlaylist={props.deletePlaylist}
      items={props.movies}
      onSortEnd={props.onSortEnd}
    />
  );
};
export default SortableComponent;
