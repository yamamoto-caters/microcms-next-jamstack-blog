import Link from 'next/link';
import { notFound } from 'next/navigation';
import parse from 'html-react-parser';
import { getBlogDetail, getBlog } from '@/libs/client';

import styles from '@/app/styles/blog/Blog.detail.module.scss';

// ブログ一覧から各Pathの情報を抜き出して、別途配列を作成
// generateStaticParams あらかじめ用意されているメソッドで、ここでURLの中身を定義している
export async function generateStaticParams() {
  const { contents } = await getBlog();

  const paths = contents.map((blog) => {
    return {
      blogId: blog.id,
    };
  });

  return [...paths];
}

// ページを作成する処理（引数としてblogIdを受け取る）
export default async function StaticDetailPage({
  params: { blogId },
}: {
  params: { blogId: string };
}) {
  const post = await getBlogDetail(blogId);

  //  記事が返却されてなければ404
  if (!post) {
    notFound();
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{post.title}</h1>
      {post.category && (
        <p className={styles.category}>
          Category:&emsp;<span>{post.category.name}</span>
        </p>
      )}
      <div className={styles.post}>{parse(post.body)}</div>
      <Link href="/">TOP</Link>
    </div>
  );
}
