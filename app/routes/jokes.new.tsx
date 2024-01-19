import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { db } from "~/utils/db.server";
import { useActionData } from "@remix-run/react";

function validateJokeName(name: string) {
  if (name.length < 3) {
    return "Joke name must be at least 3 characters long";
  }
}

function validateJokeContent(content: string) {
  if (content.length < 10) {
    return "Joke content must be at least 10 characters long";
  }
}

type ActionData = {
  fields?: {
    name: string;
    content: string;
  };
  fieldErrors?: {
    name?: string;
    content?: string;
  };
  formError?: string;
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = request.formData();
  const name = (await formData).get("name");
  const content = (await formData).get("content");

  if (typeof name !== "string" || typeof content !== "string") {
    return { formError: "Invalid form submission"};
  }

  const fieldErrors = {
    name: validateJokeName(name),
    content: validateJokeContent(content),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return { fieldErrors, fields: { name, content } };
  }

  const fields = { name, content };

  const joke = await db.joke.create({
    data: fields,
  });
  return redirect(`/jokes/${joke.id}`);
}

export default function NewJokeRoute() {
  const actionData = useActionData<ActionData | undefined>();
  return (
    <div>
      <p>Add your own hilarious joke</p>
      <form method="post">
        <div>
          <label>
            Name:{" "}
            <input
              defaultValue={actionData?.fields?.name}
              type="text"
              name="name"
            />
          </label>
          {actionData?.fieldErrors?.name ? (
            <p className="form-validation-error" id="name-error" role="alert">
              {actionData.fieldErrors.name}
            </p>
          ) : null}
        </div>
        <div>
          <label>
            Content: <textarea defaultValue={actionData?.fields?.content} name="content" />
          </label>
          {actionData?.fieldErrors?.content ? (
            <p className="form-validation-error" id="content-error" role="alert">
              {actionData.fieldErrors.content}
            </p>
          ) : null}
        </div>
        <div>
          <button type="submit" className="button">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
