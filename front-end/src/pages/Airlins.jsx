import React, { useEffect, useState } from "react";
import "./Airlins.css";
// import axios from "axios";
import axios from "../Untils/axiosInstance";
const Airlins = () => {
  const [companies, setCompanies] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // STEP CONTROL 👇
  const [step, setStep] = useState(1);

  // FORM 1 (USER)
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    role: "company",
  });

  // FORM 2 (COMPANY)
  const [companyForm, setCompanyForm] = useState({
    company_code: "",
    country: "",
    address: "",
  });

    console.log("User Form: ", userForm);
    console.log("Company Form: ", companyForm);
  useEffect(() => {
    getCompanies();
  }, []);

  const getCompanies = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/company/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setCompanies(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  

  // ---------------- USER FORM ----------------
  const handleUserChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const submitUser = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/users/",
        userForm
      );

      alert("User Created ✅ Now create company");
      localStorage.setItem("newUserEmail", userForm.email); // 👉 store email to link with company form
      setStep(2); // 👉 NEXT FORM OPEN
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.email || "something went wrong creating user ❌");
    }
  };

  // ---------------- COMPANY FORM ----------------
  const handleCompanyChange = (e) => {
    setCompanyForm({ ...companyForm, [e.target.name]: e.target.value });
  };

  const submitCompany = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/company/",{
          ...companyForm,
          useremail: localStorage.getItem("newUserEmail") || "",
        },
      );

      alert("Company Created ✅");

      setShowForm(false);
      setStep(1);

      // reset both forms
      setUserForm({
        name: "",
        email: "",
        contact: "",
        password: "",
        role: "company",
      });

      setCompanyForm({
        company_code: "",
        country: "",
        address: "",
        useremail: localStorage.getItem("newUserEmail") || "", // 👉 pre-fill email for convenience
      });

      getCompanies();
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data || "Error creating company ❌");

    }
  };

  return (
    <>
      <div className="airlines-page">
        <div className="table-header">
          <div>
            <h1>✈ Airlines Management</h1>
            <p>Manage all airlines from dashboard</p>
          </div>

          <button className="add-airline-btn" onClick={() => setShowForm(true)}>
            + Add Airline
          </button>
        </div>

        {/* TABLE */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Airline Code</th>
                <th>Country</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {companies.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>✈ {c.company_code}</td>
                  <td>{c.country}</td>
                  <td>{c.status || "Active"}</td>
                    <td>
              <button
                className="delete-btn"
                onClick={() => handleDelete(c.id)}
              >
                Delete
              </button>
            </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ---------------- MODAL ---------------- */}
      {showForm && (
        <div className="form-container">
          <div className="modal-box">

            {/* STEP INDICATOR */}
            <div className="step-bar">
              <div className={step === 1 ? "active-step" : ""}>User</div>
              <div className={step === 2 ? "active-step" : ""}>Company</div>
            </div>

            {/* STEP 1 */}
            {step === 1 && (
              <form onSubmit={submitUser} className="form">
                <h2>Create User</h2>

                <input name="name" placeholder="Name" onChange={handleUserChange}  required/>
                <input name="email" placeholder="Email" onChange={handleUserChange} required />
                <input name="contact" placeholder="Contact" onChange={handleUserChange}  required />
                <input name="password" placeholder="Login Code" type="password" onChange={handleUserChange} required />

                <button type="submit">Next ➜</button>
              </form>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <form onSubmit={submitCompany} className="form">
                <h2>Create Company</h2>

                <input
                  name="company_code"
                  placeholder="Company Code"
                  onChange={handleCompanyChange}
                  required
                />

                <input
                  name="country"
                  placeholder="Country"
                  onChange={handleCompanyChange}
                  required
                />

                <textarea
                  name="address"
                  placeholder="Address"
                  onChange={handleCompanyChange}
                  required
                />


                <button type="submit">Create Company 🚀</button>
              </form>
            )}

            {/* CLOSE */}
            <button
              className="close-btn"
              onClick={() => {
                setShowForm(false);
                setStep(1);
              }}
            >
              ✕
            </button>

          </div>
        </div>
      )}
    </>
  );
};

export default Airlins;