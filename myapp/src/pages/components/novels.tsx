"use client";
import React, { FormEvent, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_NOVELS } from "@/graphql/queries";
import { DELETE_NOVEL } from "@/graphql/mutation";

import { ADD_NOVEL } from "@/graphql/mutation";
import { ViewNovel } from "./Novel";

export const Novels = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const { data, loading, error } = useQuery(GET_NOVELS);
  const [addNovel] = useMutation(ADD_NOVEL, {
    variables: { image, title },
    refetchQueries: [{ query: GET_NOVELS }],
  });
  const [deleteNovel] = useMutation(DELETE_NOVEL, {
    refetchQueries: [{ query: GET_NOVELS }],
  });

  console.log(data)

  const novels = data?.novels;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (image === "" || title === "") return alert("Enter fields");

    addNovel({ variables: { image, title } });
    setTitle("");
    setImage("");
  };

  if (loading)
    return (
      <p className="text-white flex items-center justify-center">
        Loading ....
      </p>
    );
  if (error)
    return (
      <p className="text-white flex items-center justify-center">
        Oops! Something went wrong ....
      </p>
    );

  return (
    <div className="mt-5">
      <form onSubmit={handleSubmit} className="flex my-5 space-x-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Enter title"
          className="bg-transparent border text-white p-2 rounded-lg"
        />
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          type="text"
          placeholder="Enter Image url"
          className="bg-transparent border text-white p-2 rounded-lg"
        />
        <button className="bg-yellow-500 p-2 rounded-lg ">
          Add Novel
        </button>
      </form>
      <div className="grid grid-cols-4 gap-2">
        {novels.map((n) => (
          <article className="flex flex-col p-4  bg-slate-200 dark:bg-zinc-800 hover:scale-110 shadow-sm hover:shadow-lg hover:bg-slate-300 transition duration-300 ease-out text-white ">
            {/* image */}
            {n.image && (
              <div>
                <img
                  src={n.image}
                  alt={n.title}
                  className="h-56 w-full object-contain rounded-t-lg shadow-md"
                />
              </div>
            )}

            {/*title  */}
            <h1 className="font-bold text-xl my-2">{n.title}</h1>
            {/* description */}
            <p className="text-xs my-2 line-clamp-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
              ab recusandae repudiandae ratione quia voluptatibus tempora
              dolores, veritatis cum, soluta numquam voluptatum earum
              obcaecati illum dolor. Fuga incidunt maxime culpa.
            </p>
            {/* source and date */}
            <div className="flex justify-between italic	 ß text-xs mt-auto  text-slate-500">
            </div>

            <button
              onClick={() => deleteNovel({ variables: { id: n.id } })}
              className="bg-red-500 mt-5 p-2 rounded-lg"
            >
              Delete
            </button>
          </article>

        ))}
      </div>
    </div>
  );
};