import { json, useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

export async function loader() {
 const count = await db.joke.count();
 const randomRowNumber = Math.floor(Math.random() * count);
 const [randomJoke] = await db.joke.findMany({
   skip: randomRowNumber,
   take: 1,
 });
 return json({ randomJoke });
}

export default function JokesIndexRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <strong>Here&apos;s a random joke:</strong>
      <p>
        {data.randomJoke.content}
      </p>
    </div>
  );
}
