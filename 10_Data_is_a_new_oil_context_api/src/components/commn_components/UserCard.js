import React, { use } from "react";
import { GIT_API } from "../../utils/constant";

class UserCard extends React.Component {
  constructor(userData) {
    super(userData);
    this.state = {
      count: 0,
    };
  }

  async componentDidMount() {
    try {
      const resData = await fetch(GIT_API);
      if (!resData.ok) {
        throw new Error("Something went wrong");
      }
      const jsonData = await resData.json();
      console.log(jsonData);
    } catch (err) {
      console.error(err.message);
    }
    this.timer = setInterval(() => {
      console.log("interval is calling.");
    }, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.count !== prevState.count) {
      console.log(prevState.count); // prevState is the previous count just before the current changed count.
      console.log(prevProps); // this is the props data.
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    const { userData } = this.props;
    const { count } = this.state;
    console.log(count);

    return (
      <div
        style={{
          marginBlock: "8px",
        }}
      >
        <p>{count}</p>
        <button
          onClick={() => {
            this.setState((prev) => {
              return {
                count: prev.count + 1,
              };
            });
          }}
        >
          click me!
        </button>
        <div
          style={{
            marginBlock: "8px",
          }}
        >
          <p>{`Name: ${userData?.userName}`}</p>
          <p>{userData?.location}</p>
          <p>{userData?.contactDetails?.mobileNumber}</p>
          <p>{userData?.contactDetails?.emailId}</p>
        </div>
      </div>
    );
  }
}

export default UserCard;
