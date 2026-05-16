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
    <div className="pageDecor about-section border-t">
      <UserCard userData={userProfile} />
      <div className="border-t">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse beatae
        expedita sunt laboriosam ex nihil magni saepe illum id. Vero, blanditiis
        consectetur quibusdam error a explicabo earum quae id architecto! Lorem
        ipsum dolor, sit amet consectetur adipisicing elit. Tenetur at quidem
        exercitationem voluptate aut reprehenderit veritatis dolores ipsa
        adipisci, voluptatem consequuntur eveniet. Quidem iste fugiat magnam
        pariatur voluptatibus rerum repellendus? Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Reprehenderit dolor blanditiis temporibus
        quae neque, adipisci laboriosam dolores expedita non recusandae incidunt
        animi dolorum enim, sed velit? Cupiditate similique dicta fugiat.
      </div>
    </div>
  );
}

export default About;
