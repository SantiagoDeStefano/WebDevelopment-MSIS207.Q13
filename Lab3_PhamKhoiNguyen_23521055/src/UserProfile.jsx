import PropTypes from "prop-types";

function UserProfile({ userData, theme = "light" }) {
  return (
    <div className={`profile-card theme-${theme}`}>
      <h2>User Profile</h2>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
}

UserProfile.propTypes = {
  userData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
  }).isRequired,
  theme: PropTypes.string,
};

export default UserProfile;
