import { Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import createRequest from "./api/createRequest";
import Layout from "./components/Layout";
import Posts from "./pages/Posts";
import AddNewPost from "./pages/AddNewPost";

export default function App() {
  const history = useHistory();
  const [posts, setPosts] = useState([]);

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
  };

  // editPost
  const editPostHandler = async (id, content) => {
    fetch(`${process.env.REACT_APP_BASE_URL}${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    })
      .then(() => {
        setPosts((prevState) => {
          const filteredPosts = prevState.filter((o) => o.id !== id);
          const editPost = { id, content };
          return [...filteredPosts, editPost];
        });
      })
      .then(() => history.replace("/"));

    // SyntaxError: Unexpected end of JSON input + баги после перезагрузки ???
    // await createRequest({
    //   id,
    //   payload: content,
    //   method: "PUT",
    // });
    // setPosts((prevState) => {
    //   const filteredPosts = prevState.filter((o) => o.id !== id);
    //   const editPost = { id, content };
    //   return [...filteredPosts, editPost];
    // });
    // history.replace("/");
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
