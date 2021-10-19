import Post from "../components/Post";
import moment from "moment";
import "moment/locale/ru";

const Posts = ({ posts, deletePostHandler, editPostHandler }) => {
  return (
    <div className="mt-5">
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          content={post.content}
          created={moment(post.created).fromNow()}
          deletePostHandler={deletePostHandler}
          editPostHandler={editPostHandler}
        />
      ))}
    </div>
  );
};

export default Posts;
