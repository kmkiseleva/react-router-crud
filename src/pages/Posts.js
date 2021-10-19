import Post from "../components/Post";

const Posts = ({ posts, deletePostHandler }) => {
  return (
    <div className="mt-5">
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          content={post.content}
          deletePostHandler={deletePostHandler}
        />
      ))}
    </div>
  );
};

export default Posts;
