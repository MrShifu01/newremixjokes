import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";

import { db } from "~/utils/db.server";

export const loader = async ({
  params,
}: LoaderFunctionArgs) => {
  const joke = await db.joke.findUnique({
    where: { id: params.jokeId },
  });
  if (!joke) {
    throw new Error("Joke not found");
  }
  return json({ joke });
};

export const action = async({params}: ActionFunctionArgs) => {
  const jokeDelete = await db.joke.delete({
    where: {
      id: params.jokeId
    }
  })

  if(!jokeDelete) {
    throw new Error("Joke couldn't be deleted")
  }

  return redirect(`/jokes`)
}

export default function JokeRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <p>Here&apos;s your hilarious joke:</p>
      <p>{data.joke.content}</p>
      <Link to=".">{data.joke.name}; Permalink</Link>
      <Form method="post">
        <button type="submit" className="button">Delete</button>
      </Form>
    </div>
  );
}
