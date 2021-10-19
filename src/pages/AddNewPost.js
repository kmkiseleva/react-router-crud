import { useState } from "react";
import { useHistory } from "react-router-dom";

const AddNewPost = ({ addNewPostHandler }) => {
  const [inputValue, setInputValue] = useState("");
  const history = useHistory();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (inputValue === "") {
      return;
    }
    addNewPostHandler(inputValue);
    setInputValue("");
    history.push("/");
  };

  const onChangeHandler = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };

  return (
    <div
      className="card w-50"
      style={{ position: "relative", marginRight: "auto", marginLeft: "auto" }}
    >
      <div />
      <h5 className="card-header">Add new post</h5>
      <div className="card-body">
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3">
            <label htmlFor="post" className="form-label">
              Please enter your text
            </label>
            <input
              type="text"
              className="form-control"
              id={Math.random()}
              placeholder="Your text..."
              onChange={onChangeHandler}
              value={inputValue}
            />
          </div>
          <button type="submit" className="btn btn-warning">
            Add New Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewPost;
