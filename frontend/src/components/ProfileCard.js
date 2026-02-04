const ProfileCard = ({ user }) => {
  if (!user) return null;

  return (
    <div style={{
      border: "1px solid #ddd",
      padding: "16px",
      borderRadius: "8px",
      marginBottom: "20px"
    }}>
      <h3>👤 Profile</h3>
      <p><b>Name:</b> {user.name}</p>
      <p><b>Email:</b> {user.email}</p>
    </div>
  );
};

export default ProfileCard;
