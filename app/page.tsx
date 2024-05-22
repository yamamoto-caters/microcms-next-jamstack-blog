import Link from "next/link";
import { getBlog } from "@/libs/client";

export default async function Home() {
  const blogs = await getBlog();

  if (!blogs || blogs.length === 0) {
    return <h1>No contents</h1>;
  }

  return (
    <div>
      <ul>
        {blogs.map((blog) => {
          return (
            <li key={blog.id}>
              <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
