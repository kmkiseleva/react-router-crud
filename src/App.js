import { Switch, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Posts from "./pages/Posts";
import AddNewPost from "./pages/AddNewPost";

export default function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" render={() => <Posts />} exact />
        <Route path="/posts/new" component={AddNewPost} />
      </Switch>
    </Layout>
  );
}
