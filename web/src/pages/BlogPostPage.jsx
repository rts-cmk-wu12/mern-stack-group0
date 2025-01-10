import BlogPostForm from "../components/BlogPostForm";
import Navbar from "../components/Navbar";

export default function BlogPostPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <Navbar />

      <BlogPostForm />
    </div>
  );
}
