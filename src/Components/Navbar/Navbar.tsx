import { clear } from "../../utils/utils";
import { useEffect, useState } from "react";
const ACCESS_TOKEN_KEY = "access_token";

const Navbar = () => {
  const [Login, setLogin] = useState(false);
  useEffect(() => {
    if (localStorage.getItem(ACCESS_TOKEN_KEY)) {
      setLogin(true);
    }
  }, []);
  return (
    <nav className="header">
      <div className="container-fluid">
        <h4 style={{ fontWeight: "bold" }}> LOGO</h4>
      </div>
      {Login ? (
        <button
          type="button"
          className="btn btn-note"
          style={{ borderRadius: "5px", marginRight: "3rem" }}
          onClick={clear}
        >
          Logout
        </button>
      ) : null}
    </nav>
  );
};

export default Navbar;
