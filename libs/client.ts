import { createClient } from "microcms-js-sdk";
import type {
  MicroCMSQueries,
  MicroCMSImage,
  MicroCMSDate,
} from "microcms-js-sdk";

// ブログの型定義
export type Blog = {
  id: string;
  title: string;
  body: string;
  eyecatch?: MicroCMSImage;
} & MicroCMSDate;

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if (!process.env.API_KEY) {
  throw new Error("API_KEY is required");
}

// API取得用のクライアントを作成
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.API_KEY,
});

/**
 * ブログの一覧を取得
 * @param queries
 * @returns blogArr: Blog[]
 */
export const getBlog = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<Blog>({
    endpoint: "blog",
    queries,
  });

  // 取得したデータをBlog型の形に整形して配列に格納 → 返却
  const blogArr: Blog[] = [];
  const { contents } = listData;
  for (const content of contents) {
    const blog: Blog = {
      id: content.id,
      title: content.title,
      body: content.body,
      createdAt: content.createdAt,
      updatedAt: content.updatedAt,
    };
    blogArr.push(blog);
  }

  return blogArr;
};

/**
 * ブログの詳細記事を取得
 * @param blogId, queries?
 * @return detailData: <Blog> || null
 */
export const getBlogDetail = async (
  blogId: string,
  queries?: MicroCMSQueries
) => {
  // 指定した blogId の記事が存在しなければエラーをキャッチして null を返却
  try {
    const detailData = await client.getListDetail<Blog>({
      endpoint: "blog",
      contentId: blogId,
      queries,
    });

    return detailData;
  } catch (error) {
    // 指定した blogId 記事が該当しなかった場合、nullを返却
    return null;
  }
};
