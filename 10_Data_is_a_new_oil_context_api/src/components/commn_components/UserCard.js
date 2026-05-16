import React, { use } from "react";
import { GIT_API } from "../../utils/constant";

class UserCard extends React.Component {
  constructor(userData) {
    super(userData);
  }
  async componentDidMount() {
    try {
      const resData = await fetch(GIT_API);
      if (!resData.ok) {
        throw new Error("Something went wrong");
      }
      const jsonData = await resData.json();
    } catch (err) {
      console.error(err.message);
    }
  }

  render() {
    const { userData } = this.props;

    return (
      <div
        style={{
          marginBlock: "8px",
        }}
      >
        <div
          style={{
            marginBlock: "8px",
          }}
        >
          <p>
            {" "}
            <span className="font-bold">Name: </span>
            {userData?.userName}
          </p>
          <p>
            <span className="font-bold">Address: </span>
            {userData?.location}
          </p>
          <p>
            <span className="font-bold">Contact No: </span>
            {userData?.contactDetails?.mobileNumber}
          </p>
          <p>
            <span className="font-bold">Email: </span>
            {userData?.contactDetails?.emailId}
          </p>
        </div>
      </div>
    );
  }
}

export default UserCard;
