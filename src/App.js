import { Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import createRequest from "./api/createRequest";
import Layout from "./components/Layout";
import Posts from "./pages/Posts";
import AddNewPost from "./pages/AddNewPost";

export default function App() {
  const [posts, setPosts] = useState([]);

  // getting all posts
  useEffect(() => {
    const fetchData = async () => {
      const response = await createRequest({ method: "get" });
      setPosts([...response]);
    };
    fetchData();
  });

  // deletePost
  const deletePostHandler = async (id) => {
    // выкидывает ошибку Uncaught (in promise) SyntaxError: Unexpected end of JSON input
    await createRequest({ id, method: "DELETE" });
    setPosts((prevState) => {
      const filteredPosts = prevState.filter((o) => o.id !== id);
      return [...filteredPosts];
    });

    // работает без ошибки!
    // fetch(`${process.env.REACT_APP_BASE_URL}${id}`, {
    //   method: "DELETE",
    // }).then(() => {
    //   setPosts((prevState) => {
    //     const filteredPosts = prevState.filter((o) => o.id !== id);
    //     return [...filteredPosts];
    //   });
    // });
  };

  // editPost
  const editPostHandler = async (id, content) => {
    await createRequest({
      id,
      payload: content,
      method: "PUT",
    });

    setPosts((prevState) => {
      const filteredPosts = prevState.filter((o) => o.id !== id);
      const editPost = { id, content };
      return [...filteredPosts, editPost];
    });
  };

  // addNewPost
  const addNewPostHandler = async (post) => {
    try {
      const payload = {
        content: post,
      };
      await createRequest({ payload, method: "post" });
      const response = await createRequest({ method: "get" });
      setPosts([...response]);
    } catch (e) {
      return <p>Error: {e}</p>;
    }
  };

  return (
    <Layout>
      <Switch>
        <Route
          path="/"
          render={() => (
            <Posts
              posts={posts}
              deletePostHandler={deletePostHandler}
              editPostHandler={editPostHandler}
            />
          )}
          exact
        />
        <Route
          path="/posts/new"
          render={() => <AddNewPost addNewPostHandler={addNewPostHandler} />}
        />
      </Switch>
    </Layout>
  );
}
