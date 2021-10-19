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
  }, []);

  // deletePost
  const deletePostHandler = async (id) => {
    // не работает!
    await createRequest({ id, method: "DELETE" });
    const response = await createRequest({ method: "get" });
    setPosts([...response]);

    // работает!
    // fetch(`${process.env.REACT_APP_BASE_URL}${id}`, {
    //   method: "DELETE",
    // }).then(() => {
    //   setPosts((prevState) => {s
    //     const filteredPosts = prevState.filter((o) => o.id !== id);
    //     return [...filteredPosts];
    //   });
    // });
  };

  // addNewPost
  const addNewPostHandler = async (post) => {
    console.log(post);
    // try {
    //   const payload = {
    //     content: posts,
    //   };
    //   await createRequest({ payload, method: "post" });
    //   const response = await createRequest({ method: "get" });
    //   setPosts([...response]);
    // } catch (e) {
    //   return <p>Error: {e}</p>;
    // }
  };

  return (
    <Layout>
      <Switch>
        <Route
          path="/"
          render={() => (
            <Posts posts={posts} deletePostHandler={deletePostHandler} />
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
