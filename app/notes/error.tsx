"use client";

const Error = ({ error }: { error: Error }) => {
  return (
    <p className={"text-error"}>
      Could not fetch notes details. {error.message}
    </p>
  );
};

export default Error;
