import { useState, useCallback } from "react";
import {useHistory, useParams} from 'react-router-dom';

const Post = ({ id, content, created, deletePostHandler, editPostHandler }) => {
  const [isEdit, setIsEdit] = useState(false);
  const history = useHistory();
  const params = useParams();

  const onViewPost = (e) => {
    if (params.id) {
      return;
    }    
    if (e.target.type === "button" || e.target.tagName === "P") {
      return;
    }
    history.push(`/posts/${id}`);
  }

  const onDeletePost = useCallback(() => deletePostHandler(id), [id]);
  const onEditPost = () => setIsEdit((prevState) => !prevState);

  const onSubmitHandler = (e) => {
    if (e.key === "Enter") {
      const data = {
        id: id,
        content: e.target.textContent,
      };
      editPostHandler(data);
      setIsEdit(false);
    }
  };

  return (
    <div
      className="card w-50 ml-auto mr-auto"
      style={{ position: "relative", margin: "0 auto 20px", cursor: "pointer" }}
      data-id={id}
      onClick={onViewPost}
    >
      <div className="card-body">
        <div>{created}</div>
        <div style={{ margin: "5px", textAlign: "center", fontWeight: "bold" }}>
          {isEdit ? "Editing..." : null}
        </div>
        <p
          style={
            isEdit
              ? {
                  border: "3px solid red",
                  padding: "10px",
                }
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
