import React from 'react'

function AirlineDashboard() {
    const data = JSON.parse(localStorage.getItem("user"));

  // company data
  const user = data?.user;
  const company = user.airline;

  // user data
   
  console.log("Airline Dashboard Data:", data);
  console.log("Company Data:", company);
  console.log("User Data:", user);


  return (
    <>
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial",
        background: "#f4f6f9",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>Airline Dashboard</h1>

      {/* Company Card */}
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          marginBottom: "20px",
        }}
      >
        <h2>Company Details</h2>

        <p>
          <strong>Company Name:</strong> {user?.name}
        </p>

        <p>
          <strong>Company Code:</strong> {company?.company_code}
        </p>

        <p>
          <strong>Email:</strong> {user?.email}
        </p>

        <p>
          <strong>Country:</strong> {company?.country}
        </p>

        <p>
          <strong>Address:</strong> {company?.address}
        </p>

        <p>
          <strong>Contact:</strong> {user?.contact}
        </p>

        <p>
          <strong>Username:</strong> {user?.username}
        </p>

        <p>
          <strong>Role:</strong> {user?.role}
        </p>

        <p>
          <strong>Last Login:</strong> {user?.last_login}
        </p>
      </div>

      {/* Stats Section */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            width: "220px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Total Flights</h3>
          <h1>120</h1>
        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            width: "220px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Active Flights</h3>
          <h1>98</h1>
        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            width: "220px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Cancelled</h3>
          <h1>5</h1>
        </div>
      </div>
    </div>
    </>
  )
}

export default AirlineDashboard