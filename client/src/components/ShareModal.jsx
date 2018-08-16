import React from "react";

let ShareModal = (props) => {
  var exit = false;
  return (
    <div className={exit ? "modal" : "modal is-active"}>
      <div className="modal-background" onClick={props.close}  />
      <div className="modal-content">
        <div className="message is-success">
          <div className="message-header">
            <p>Success!</p>
            <button className="delete" aria-label="delete" onClick={props.close}/>
          </div>
          <div className="message-body">
          Share your awesome playlist with this link:
          <pre><a href={`/?code=${props.url}`}>{props.url}</a></pre>
          </div>
        </div>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={props.close}  />
    </div>
  );
};
export default ShareModal;
