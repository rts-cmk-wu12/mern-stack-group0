import { useParams } from "react-router-dom";
import BlogDetailsView from "../components/BlogDetailsView";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

export default function BlogDetailsPage() {
  const blog = {
    title: "How to Build a Blog with React and Tailwind CSS",
    author: "John Doe",
    date: "2025-01-05",
    coverImage:
      "https://via.placeholder.com/1200x600.png?text=Blog+Cover+Image",
    tags: ["React", "TailwindCSS", "Web Development"],
    content: [
      "Building a blog with React and Tailwind CSS is a great way to create modern, responsive, and aesthetically pleasing web pages.",
      "In this guide, we’ll go through the steps required to set up a React application and style it with Tailwind CSS.",
      "By the end of this tutorial, you'll have a fully functional blog page with dynamic content and a great design.",
    ],
  };
  const { blogId } = useParams();

  const [blogList, setBlogList] = useState({});
  console.log(blogList);

  //fetch blog Data
  const fetchData = async (id) => {
    const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
    if (res.status == 200) {
      setBlogList(res.data);
    }
    console.log(res);
  };

  useEffect(() => {
    fetchData(blogId);
  }, [blogId]);

  return (
    <div className="max-w-7xl mx-auto">
      <Navbar />
      <BlogDetailsView blogDetails={blogList} />
    </div>
  );
}
