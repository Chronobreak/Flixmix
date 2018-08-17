import React from 'react';
import { render } from 'react-dom';
import Gallery from 'react-grid-gallery';

const ExplorePlaylistEntry = ({collection}) =>  (
    <div key={collection.playlistID} style={{display: "block"}}>
            <container className="container is-fluid">
            <h1>{collection.playlistID}</h1>
            <div style={{
                    display: "block",
                    minHeight: "1px",
                    width: "100%",
                    marginRight: "20px",
                    overflow: "auto"}}>
                  <Gallery images={collection.movieImageArray}/>
            </div>
            </container>
    </div>
  )


export default ExplorePlaylistEntry;
