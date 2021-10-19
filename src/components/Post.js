import { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";

const Post = ({ id, content, created, deletePostHandler, editPostHandler }) => {
  const [isEdit, setIsEdit] = useState(false);
  const history = useHistory();

  const onDeletePost = useCallback(() => deletePostHandler(id), [id]);

  const onEditPost = () => {
    setIsEdit((prevState) => !prevState);
    history.replace("/");
  };

  const onSubmitHandler = (e) => {
    if (e.key === "Enter") {
      onEditPost(e.target.value);
      setIsEdit(false);
    }
  };

  return (
    <div
      className="card w-50 ml-auto mr-auto"
      style={{ position: "relative", margin: "0 auto 20px" }}
    >
      <div className="card-body">
        <div>{created}</div>
        <p
          style={
            isEdit
              ? { border: "1px solid red", padding: "10px" }
              : { border: "1px solid black", padding: "10px" }
          }
          className="card-text"
          contentEditable={isEdit}
          onKeyUp={onSubmitHandler}
          suppressContentEditableWarning={true}
        >
          {content}
        </p>
        {
          <div className="d-flex flex-row-reverse">
            <button
              type="button"
              className="btn btn-warning"
              style={{ marginLeft: 15 }}
              onClick={onDeletePost}
            >
              Delete
            </button>
            <button type="button" className="btn btn-info" onClick={onEditPost}>
              Edit
            </button>
          </div>
        }
      </div>
    </div>
  );
};

export default Post;
