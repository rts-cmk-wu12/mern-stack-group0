import axios from "axios";
import { Link } from "react-router-dom";

export default function BlogCard({ blog, fetchData }) {
  const deleteFn = async (id) => {
    // Implement delete functionality here
    const res = await axios.delete(`http://localhost:5000/api/posts/${id}`);
    fetchData();
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="w-full h-[240px] bg-gray-300">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{blog.title}</h3>
        <p className="text-gray-600 text-sm mt-2">
          {blog.content.slice(0, 120)}
        </p>

        <div className="flex justify-between items-center">
          <Link
            to={`/blog-details/${blog._id}`}
            className="mt-4 inline-block bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Details
          </Link>

          <button
            onClick={() => deleteFn(blog._id)}
            className="mt-4 inline-block bg-red-500 text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
