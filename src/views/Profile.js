import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Profile = () => {

  const {
    authState: {
      username,
      email,
      balance,
    }
  } = useContext(AuthContext);

  return (
    <>
      <h1>Profile</h1>
      <h4>Username: {username}</h4>
      <h4>Email: {email}</h4>
      <h4>Balance: {balance}</h4>

    </>
  );
}

export default Profile;