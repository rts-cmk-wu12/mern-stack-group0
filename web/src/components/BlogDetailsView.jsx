// eslint-disable-next-line react/prop-types
const BlogDetailsView = ({ blogDetails }) => {
  const { title, author, createdAt, content, coverImage, tags } = blogDetails;

  return (
    <div className="min-h-screen w-full py-10 px-4">
      <div className="  w-full overflow-hidden">
        {/* Blog Cover Image */}
        <div className="h-60 md:h-80 border rounded overflow-hidden">
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Blog Content */}
        <div className="p-6">
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-800">{title}</h1>

          {/* Author and Date */}
          <div className="mt-2 flex items-center space-x-3 text-gray-600 text-sm">
            <span>
              By <span className="font-medium">{author}</span>
            </span>
            <span>•</span>
            <span>{new Date(createdAt).toLocaleDateString()}</span>
          </div>

          {/* Tags */}
          {/* {tags && tags?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {tags?.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )} */}

          {/* Content */}
          <div className="mt-6 text-gray-700 leading-relaxed space-y-4">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsView;
