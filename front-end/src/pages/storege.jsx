// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./AdminDashboard.css";

// function AdminDashboard() {
//   const [companies, setCompanies] = useState([]);
//   const [flights, setFlights] = useState([]);
//   const [users, setUsers] = useState([]);

//   // API Base URL
//   const user = JSON.parse(localStorage.getItem("user"));
//   const accessToken = user?.access;

//   useEffect(() => {
//     getCompanies();
//     getFlights();
//     getUsers();
//   }, []);

//   // =========================
//   // GET ALL AIRLINE COMPANIES
//   // =========================
//   const getCompanies = async () => {
//     try {
//       let res = await axios.get("http://127.0.0.1:8000/api/company/", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//         },
//       });
//       setCompanies(res.data);
//       console.log("Companies:", res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // =========================
//   // GET ALL FLIGHTS
//   // =========================
//   const getFlights = async () => {
//     try {
//       let res = await axios.get("http://127.0.0.1:8000/api/flights/", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//         },
//       });

//       setFlights(res.data);

//     } catch (err) {
//       console.log(err);
//     }
//   };


  
//   const getUsers = async () => {
//     try {
//       let res = await axios.get("http://127.0.0.1:8000/api/users/", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//         },
//       } );
//       setUsers(res.data);
//       console.log("Users:", res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="admin-dashboard">

//       {/* ================= HEADER ================= */}
//       <div className="top-header">
//         <h1>🛫 Admin Dashboard</h1>

//         <div className="admin-info">
//           <h3>{user?.username}</h3>
//           <p>Superuser Panel</p>
//         </div>
//       </div>

//       {/* ================= CARDS ================= */}
//       <div className="stats-container">

//         <div className="card">
//           <h3>Total Airlines</h3>
//           <h1>{companies.length}</h1>
//         </div>

//         <div className="card">
//           <h3>Total Flights</h3>
//           <h1>{flights.length}</h1>
//         </div>

//         <div className="card">
//           <h3>Total Users</h3>
//           <h1>{users.length}</h1>
//         </div>

//         <div className="card">
//           <h3>Active Flights</h3>
//           <h1>{flights.length}</h1>
//         </div>

//       </div>

//       {/* ================= AIRLINE COMPANIES ================= */}
//       <div className="table-box">
//         <div className="table-header">
//           <h2>Airline Companies</h2>
//         </div>

//         <table>
//           <thead>
//             <tr>
//               <th>Company</th>
//               <th>Email</th>
//               <th>Country</th>
//               <th>Total Flights</th>
//             </tr>
//           </thead>

//           <tbody>
//             {companies.map((company, index) => {

//               const totalCompanyFlights = flights.filter(
//                 (flight) =>
//                   flight.company === company.id ||
//                   flight.company_email === company.email
//               );

//               return (
//                 <tr key={index}>
//                   <td>{company.name}</td>
//                   <td>{company.email}</td>
//                   <td>{company.country}</td>
//                   <td>{totalCompanyFlights.length}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       {/* ================= FLIGHTS ================= */}
//       <div className="table-box">
//         <div className="table-header">
//           <h2>All Flights</h2>
//         </div>

//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Source</th>
//               <th>From</th>
//               <th>Destination</th>
//               <th>Date</th>
//               <th>Time</th>
//               <th>Company</th>
//             </tr>
//           </thead>

//           <tbody>
//             {flights.map((flight, index) => (
//               <tr key={index}>
//                 <td>{flight.name}</td>
//                 <td>{flight.source}</td>
//                 <td>{flight.from_location}</td>
//                 <td>{flight.destination}</td>
//                 <td>{flight.date}</td>
//                 <td>{flight.time}</td>
//                 <td>
//                   {flight.company_name ||
//                     flight.company_email ||
//                     "N/A"}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* ================= USERS ================= */}
//       <div className="table-box">
//         <div className="table-header">
//           <h2>All Users</h2>
//         </div>

//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Role</th>
//               <th>Company</th>
//             </tr>
//           </thead>

//           <tbody>
//             {users.map((user, index) => (
//               <tr key={index}>
//                 <td>{user.username}</td>
//                 <td>{user.email}</td>
//                 <td>
//                   {user.is_superuser
//                     ? "Admin"
//                     : user.role==="company"
//                     ? "Airline Staff"
//                     : "Customer"}
//                 </td>

//                 <td>
//                   {user.airline?.name || "N/A"}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//     </div>
//   );
// }

// export default AdminDashboard;



/* AdminDashboard.css */

// * {
//   margin: 0;
//   padding: 0;
//   box-sizing: border-box;
// }

// .admin-dashboard {
//   min-height: 100vh;
//   background: linear-gradient(to right, #0b1020, #1c2940);
//   padding: 30px;
//   color: white;
//   font-family: Arial, Helvetica, sans-serif;
// }

/* ================= HEADER ================= */

// .top-header {
//   background: #ffffff;
//   color: black;
//   padding: 25px;
//   border-radius: 10px;
//   margin-bottom: 25px;

//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// }

// .admin-info h3 {
//   color: #005cf0;
// }

// .admin-info p {
//   color: #666;
// }

// /* ================= CARDS ================= */

// .stats-container {
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   gap: 20px;

//   margin-bottom: 30px;
// }

// .card {
//   background: rgba(255,255,255,0.08);
//   padding: 25px;
//   border-radius: 15px;

//   box-shadow: 0px 0px 20px rgba(0,0,0,0.2);
// }

// .card h3 {
//   margin-bottom: 10px;
//   color: #ddd;
// }

// .card h1 {
//   font-size: 40px;
// }

// /* ================= TABLE ================= */

// .table-box {
//   background: rgba(255,255,255,0.08);
//   padding: 20px;
//   border-radius: 15px;
//   margin-bottom: 30px;

//   overflow-x: auto;
// }

// .table-header {
//   margin-bottom: 20px;
// }

// table {
//   width: 100%;
//   border-collapse: collapse;
// }

// thead {
//   background: rgba(255,255,255,0.08);
// }

// th {
//   padding: 15px;
//   text-align: left;
//   color: #ddd;
// }

// td {
//   padding: 15px;
//   border-bottom: 1px solid rgba(255,255,255,0.1);
// }

// tr:hover {
//   background: rgba(255,255,255,0.04);
// }

// /* ================= RESPONSIVE ================= */

// @media screen and (max-width: 1000px) {
//   .stats-container {
//     grid-template-columns: repeat(2, 1fr);
//   }
// }

// @media screen and (max-width: 600px) {

//   .stats-container {
//     grid-template-columns: 1fr;
//   }

//   .top-header {
//     flex-direction: column;
//     gap: 10px;
//     align-items: flex-start;
//   }

// }