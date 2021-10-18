import Post from "../components/Post";

const Posts = () => {
  return (
    <div className="mt-5">
      <Post id={Math.random()} content="content" />
      <Post id={Math.random()} content="content" />
    </div>
  );
};

export default Posts;
