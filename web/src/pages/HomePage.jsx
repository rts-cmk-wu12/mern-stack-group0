import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import Navbar from "../components/Navbar";
import axios from "axios";
export default function HomePage() {
  const [blogList, setBlogList] = useState([]);
  //fetch blog Data
  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/api/posts");
    if (res.status == 200) {
      setBlogList(res.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <Navbar />
      <div className="grid mt-12 grid-cols-3 gap-4">
        {blogList.map((blog, index) => (
          <BlogCard fetchData={fetchData} key={index} blog={blog} />
        ))}
      </div>
    </div>
  );
}
