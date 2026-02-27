import { useRouteError } from "react-router";
const Error = () => {
  const err = useRouteError();
  console.log(err);

  return (
    <div className="err-container">
      <h1 className="err-heading">Oops....</h1>
      <p>Something Wents wrong!</p>
      <p>
        {err.status
          ? `${err.status} : ${err.statusText}`
          : err.message || "Unknown Error Occurred"}
      </p>
    </div>
  );
};

export default Error;
