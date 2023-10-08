import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import PaginationUser from "./PaginationUser";
import axios from "axios";

function UserAdmin() {
  let token = localStorage.getItem("token");

  const [user, setUser] = useState([]);
  const [total, setTotal] = useState(0);

  // const [lockedUsers, setLockedUsers] = useState([]);

  const fetchUser = async (pageIndex, pageNumber) => {
    await axios
      .get(
        `http://localhost:3000/api/v1/users?page_index=${pageIndex}&page_number=${pageNumber}`
      )
      .then((res) => {
        setUser(res.data.data);
        setTotal(res.data.length);
      })
      .catch((err) => console.log(err));
  };

  console.log(user);
  useEffect(() => {
    fetchUser(1, 5);
  }, []);

  // delete
  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(baseURL + `/users/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          })
          .then(() => {
            setArchitects((prev) => {
              let architectClone = [...prev];
              let findIndex = architectClone.findIndex((e) => e.id === id);
              architectClone.splice(findIndex, 1);
              return [...architectClone];
            });
          })
          .catch((err) => console.log(err));
      }
    });
  };

  // Lock user
  const handleLockUser = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/api/v1/users/${id}`, {
        status: 1,
      });

      const updatedUsers = user.map((u) =>
        u.users_id === id ? { ...u, status: 1 } : u
      );
      setUser(updatedUsers);
      console.log("User locked successfully");
    } catch (err) {
      console.error("Failed to lock user:", err);
    }
  };

  const handleUnLockUser = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/api/v1/users/${id}`, {
        status: 0,
      });
      const updatedUsers = user.map((u) =>
        u.users_id === id ? { ...u, status: 0 } : u
      );
      setUser(updatedUsers);
      console.log("User unlocked successfully");
    } catch (err) {
      console.error("Failed to lock user:", err);
    }
  };
  console.log(user);

 

  return (
    <div>
      <div className="row mb-3">
        <h1>Admin User</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Password</th>
              <th scope="col">Role</th>
              <th scope="col">Status</th>
              <th scope="col" colSpan={3}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {user?.map((e, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{e.users_id}</td>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.password}</td>
                <td>{e.role}</td>
                {e.status == 0 ? (
                  <td>
                    <button className="btn btn-outline-success">
                      UnLock
                    </button>
                  </td>
                ) : (
                  <td>
                    <button className="btn btn-outline-danger">
                      Lock
                    </button>
                  </td>
                )}
                <td>
                  {e?.status == 0 ? (
                    <button
                      className="btn btn-success"
                      onClick={() => handleLockUser(e.users_id)}
                    >
                      Lock
                    </button>
                  ) : (
                    <button
                      className="btn btn-danger"
                      onClick={() => handleUnLockUser(e.users_id)}
                    >
                      UnLock
                    </button>
                  )}
                  {/* <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(e.users_id)}
                  >
                    Delete
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <PaginationUser total={total} pageNumber={5} fetchUser={fetchUser} />
      </div>
    </div>
  );
}

export default UserAdmin;
