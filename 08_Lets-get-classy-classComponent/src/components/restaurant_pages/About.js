import UserCard from "../commn_components/UserCard";

function About() {
  const userProfile = {
    userName: "Parshant Singh",
    location: "Durgapur, West Bengal",
    contactDetails: {
      mobileNumber: "+918967838938",
      emailId: "parshantsingh0717@gmail.com",
    },
  };
  return (
    <div className="pageDecor about-section">
      <h1>This is about me!</h1>
      <UserCard userData={userProfile} />
    </div>
  );
}

export default About;
