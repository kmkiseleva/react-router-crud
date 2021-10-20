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
      const response = await createRequest({ method: "get" });
      setPosts([...response]);
    };
    fetchData();
  }, []);

  // deletePost
  const deletePostHandler = async (id) => {
    // выкидывает ошибку Uncaught (in promise) SyntaxError: Unexpected end of JSON input ???

    // await createRequest({ id, method: "DELETE" });
    // setPosts((prevState) => {
    //   const filteredPosts = prevState.filter((o) => o.id !== id);
    //   return [...filteredPosts];
    // });

    // работает без ошибки!
    fetch(`${process.env.REACT_APP_BASE_URL}${id}`, {
      method: "DELETE",
    }).then(() => {
      setPosts((prevState) => {
        const filteredPosts = prevState.filter((o) => o.id !== id);
        return [...filteredPosts];
      });
    });
  };

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

  // editPost
  const editPostHandler = async (id, content) => {
    // SyntaxError: Unexpected end of JSON input + баги после перезагрузки ???
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

    history.replace("/");

    // другой способ - тоже с ошибкой
    // fetch(`${process.env.REACT_APP_BASE_URL}${id}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ content }),
    // })
    //   .then(() => {
    //     setPosts((prevState) => {
    //       const filteredPosts = prevState.filter((o) => o.id !== id);
    //       const editPost = { id, content };
    //       return [...filteredPosts, editPost];
    //     });
    //   })
    //   .then(() => history.replace("/"));
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
