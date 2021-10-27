import { Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import createRequest from "./api/createRequest";
import Layout from "./components/Layout";
import Posts from "./pages/Posts";
import Post from "./components/Post";
import singlePost from "./components/singlePost";
import AddNewPost from "./pages/AddNewPost";

export default function App() {
  const history = useHistory();
  const [posts, setPosts] = useState([]);
  const SinglePostHOC = singlePost(Post);

  // getting all posts
  useEffect(() => {
    const fetchData = async () => {
      const response = await createRequest({ method: "GET" });
      setPosts([...response]);
    };
    fetchData();
  }, []);

  // addNewPost
  const addNewPostHandler = async (payload) => {
    fetch(process.env.REACT_APP_BASE_URL, {
      method: "POST",
      body: JSON.stringify(payload),
    })
      .then(() => {
        setPosts((prevState) => [...prevState, payload]);
      })
      .then(() => history.replace("/"));
  };

  // deletePost
  const deletePostHandler = (id) => {
    createRequest({ id, method: "DELETE" });
    setPosts((prevState) => {
      const filteredPosts = prevState.filter((o) => o.id !== id);
      return [...filteredPosts];
    });
    history.replace("/");
  };

  // editPost
  const editPostHandler = (data) => {
    const { id, content } = data;
    createRequest({
      id,
      payload: content,
      method: "PUT",
    });
    setPosts((prevState) => {
      const filteredPosts = prevState.filter((o) => o.id !== id);
      const editPost = { id, content };
      return [...filteredPosts, editPost];
    });
    history.replace("/");
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
        <Route
          path="/posts/:id"
          render={() => (
            <SinglePostHOC
              deletePostHandler={deletePostHandler}
              editPostHandler={editPostHandler}
            />
          )}
        />
      </Switch>
    </Layout>
  );
}
