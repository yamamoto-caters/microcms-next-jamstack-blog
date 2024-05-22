import Link from 'next/link';
import { getBlog } from '@/libs/client';

export default async function Home() {
  const { contents } = await getBlog();

  if (!contents || contents.length === 0) {
    return <h1>No contents</h1>;
  }

  return (
    <div>
      <ul>
        {contents.map((blog) => {
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
