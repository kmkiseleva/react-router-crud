import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const singlePost = (Component) => {
  const Wrapper = (props) => {
    const [post, setPost] = useState({ id: "", content: "" });
    const params = useParams();
    useEffect(() => {
      fetch(`${process.env.REACT_APP_BASE_URL}${params.id}`)
        .then((response) => response.json())
        .then((data) =>
          setPost((prevState) => ({
            ...prevState,
            id: data.id,
            content: data.content,
          }))
        );
    }, [params.id]);

    return <Component {...props} id={post.id} content={post.content} />;
  };

  return Wrapper;
};

export default singlePost;
