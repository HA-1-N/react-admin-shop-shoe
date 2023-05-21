import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const FormProfile = () => {
  const navigate = useNavigate();
  const params = useParams();
  const paramId = params.id;
  const currentUser = useSelector((state) => state.auth.currentUser?.user);

  const handleEditProfile = () => {
    navigate(
      `/admin/edit-profile/${currentUser?._id ? currentUser?._id : paramId}`
    );
  };

  return (
    <>
      <div
        className="d-flex justify-content-between"
        style={{
          flexGrow: 1,
          marginLeft: "35px",
        }}
      >
        <article style={{ flexGrow: 1 }}>
          <div>
            <h2 style={{ color: "#475985" }}>
              {currentUser?.account ? currentUser?.account.split("@")[0] : ""}
            </h2>
            <p style={{ color: "#475985" }}>{currentUser?.aboutMe}</p>
          </div>

          <ul
            className="list-unstyled d-flex justify-content-between w-100 flex-wrap"
            style={{ gap: "16px", marginTop: "35px" }}
          >
            <li className="info-profile-item">
              <span className="font-weight-500">User name: </span>{" "}
              {currentUser?.userName}
            </li>
            <li className="info-profile-item">
              <span className="font-weight-500">Email: </span>{" "}
              {currentUser?.email}
            </li>
            <li className="info-profile-item">
              <span className="font-weight-500">Mobile Phone: </span>{" "}
              {currentUser?.phone}
            </li>
            <li className="info-profile-item">
              <span className="font-weight-500">Admin: </span>{" "}
              {currentUser?.isAdmin ? "True" : "False"}
            </li>
          </ul>
        </article>
        <div>
          <button
            className="info-profile-btn-edit"
            type="button"
            onClick={handleEditProfile}
          >
            Edit profile
          </button>
        </div>
      </div>
    </>
  );
};

export default FormProfile;
