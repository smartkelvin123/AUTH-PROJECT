import React from "react";

const Oauth = () => {
  const handleGoogleClick = async () => {
    try {
    } catch (error) {}
  };

  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-red-700 text-white p-3 rounded-lg  uppercase hover:opacity-95"
    >
      continue with google
    </button>
  );
};

export default Oauth;
