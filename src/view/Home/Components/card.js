import React from "react";

const UserCard = ({ user }) => {
  return (
    <div className="max-w-sm bg-white text-gray-800 rounded-lg p-4">
      <div className="border-4 border-blue-500 p-2 mb-2 rounded">
        <h2 className="text-lg font-bold">{user.NAME}</h2>
      </div>
      <div className="border-4 border-yellow-500 p-2 mb-2 rounded">
        <p className="text-sm text-gray-600">Age: {user.AGE}</p>
      </div>
      <div className="border-4 border-blue-500 p-2 mb-2 rounded">
        <p className="text-sm text-gray-600">Description: {user.DISCRIPTION}</p>
      </div>
    </div>
  );
};

export default UserCard;
