const AddNewPost = () => {
  return (
    <div
      className="card w-50"
      style={{ position: "relative", marginRight: "auto", marginLeft: "auto" }}
    >
      <div />
      <h5 className="card-header">Add new post</h5>
      <div className="card-body">
        <form>
          <div className="mb-3">
            <label htmlFor="post" className="form-label">
              Please enter your text
            </label>
            <input
              type="text"
              className="form-control"
              id="post"
              placeholder="Your text..."
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
