import { useCallback } from "react";

const Post = ({ id, content, deletePostHandler }) => {
  const onDeletePost = useCallback(() => deletePostHandler(id), [id]);

  return (
    <div
      className="card w-50 ml-auto mr-auto"
      style={{ position: "relative", margin: "0 auto 20px" }}
    >
      <div className="card-body">
        <p
          style={{ border: "1px solid black", padding: "10px" }}
          className="card-text"
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
            <button type="button" className="btn btn-info">
              Edit
            </button>
          </div>
        }
      </div>
    </div>
  );
};

export default Post;
