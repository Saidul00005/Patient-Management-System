// import React, { useState, useEffect } from 'react';
// import axiosClient from "../axiosClient";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { useStateContext } from '../context/ContextProvider';

// const AssignedClientStatsByMonth = () => {
//   const [data, setData] = useState([]);
//   const [month, setMonth] = useState('');
//   const { user } = useStateContext();

//   useEffect(() => {
//     if (month) {
//       const [year, mon] = month.split('-');
//       axiosClient
//         .get(`api/assignedClientStats/month/${mon}-${year}/`, {
//           headers: {
//             Authorization: `Bearer ${user.token}`,
//           },
//         })
//         .then((response) => {
//           setData(response.data);
//         })
//         .catch((error) => {
//           console.error('Error fetching data:', error);
//         });
//     }
//   }, [month, user.token]);

//   return (
//     <div>
//       <h2>Assigned Client Stats by Month</h2>
//       <input
//         type="month"
//         value={month}
//         onChange={(e) => setMonth(e.target.value)}
//       />
//       {data.length > 0 ? (
//         <ResponsiveContainer width="100%" height={400}>
//           <BarChart
//             data={data}
//             margin={{
//               top: 5, right: 30, left: 20, bottom: 5,
//             }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="id" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="total" fill="#8884d8" />
//           </BarChart>
//         </ResponsiveContainer>
//       ) : (
//         <p>No data available for the selected month.</p>
//       )}
//     </div>
//   );
// };

// export default AssignedClientStatsByMonth;

// import React, { useState, useEffect } from 'react';
// import axiosClient from "../axiosClient";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { useStateContext } from '../context/ContextProvider';

// const AssignedClientStats = () => {
//   const [data, setData] = useState([]);
//   const [month, setMonth] = useState('');
//   const [year, setYear] = useState('');
//   const { user } = useStateContext();

//   useEffect(() => {
//     if (month) {
//       const [year, mon] = month.split('-');
//       axiosClient
//         .get(`api/assignedClientStats/month/${mon}-${year}/`, {
//           headers: {
//             Authorization: `Bearer ${user.token}`,
//           },
//         })
//         .then((response) => {
//           setData(response.data);
//         })
//         .catch((error) => {
//           console.error('Error fetching data:', error);
//         });
//     }
//   }, [month, user.token]);

//   useEffect(() => {
//     if (year) {
//       axiosClient
//         .get(`api/assignedClientStats/year/${year}/`, {
//           headers: {
//             Authorization: `Bearer ${user.token}`,
//           },
//         })
//         .then((response) => {
//           setData(response.data);
//         })
//         .catch((error) => {
//           console.error('Error fetching data:', error);
//         });
//     }
//   }, [year, user.token]);

//   return (
//     <div>
//       <h2>Assigned Client Stats by Month</h2>
//       <input
//         type="month"
//         value={month}
//         onChange={(e) => setMonth(e.target.value)}
//       />
//       <h2>Assigned Client Stats by Year</h2>
//       <input
//         type="number"
//         min="2000"
//         max="2100"
//         value={year}
//         onChange={(e) => setYear(e.target.value)}
//       />
//       {data.length > 0 ? (
//         <ResponsiveContainer width="100%" height={400}>
//           <BarChart
//             data={data}
//             margin={{
//               top: 5, right: 30, left: 20, bottom: 5,
//             }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="id" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="total" fill="#8884d8" />
//           </BarChart>
//         </ResponsiveContainer>
//       ) : (
//         <p>No data available for the selected period.</p>
//       )}
//     </div>
//   );
// };

// export default AssignedClientStats;

// import React, { useState, useEffect } from 'react';
// import axiosClient from "../axiosClient";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { useStateContext } from '../context/ContextProvider';

// const AssignedClientStats = () => {
//   const [data, setData] = useState([]);
//   const [month, setMonth] = useState('');
//   const [year, setYear] = useState('');
//   const [week, setWeek] = useState('');
//   const { user } = useStateContext();

//   useEffect(() => {
//     if (month) {
//       const [year, mon] = month.split('-');
//       axiosClient
//         .get(`api/assignedClientStats/month/${mon}-${year}/`, {
//           headers: {
//             Authorization: `Bearer ${user.token}`,
//           },
//         })
//         .then((response) => {
//           setData(response.data);
//         })
//         .catch((error) => {
//           console.error('Error fetching data:', error);
//         });
//     }
//   }, [month, user.token]);

//   useEffect(() => {
//     if (year) {
//       axiosClient
//         .get(`api/assignedClientStats/year/${year}/`, {
//           headers: {
//             Authorization: `Bearer ${user.token}`,
//           },
//         })
//         .then((response) => {
//           setData(response.data);
//         })
//         .catch((error) => {
//           console.error('Error fetching data:', error);
//         });
//     }
//   }, [year, user.token]);

//   useEffect(() => {
//     if (week) {
//       axiosClient
//         .get(`api/assignedClientStats/week/${week}/`, {
//           headers: {
//             Authorization: `Bearer ${user.token}`,
//           },
//         })
//         .then((response) => {
//           setData(response.data);
//         })
//         .catch((error) => {
//           console.error('Error fetching data:', error);
//         });
//     }
//   }, [week, user.token]);

//   return (
//     <div>
//       <h2>Assigned Client Stats by Week</h2>
//       <input
//         type="date"
//         value={week}
//         onChange={(e) => setWeek(e.target.value)}
//       />
//       <h2>Assigned Client Stats by Month</h2>
//       <input
//         type="month"
//         value={month}
//         onChange={(e) => setMonth(e.target.value)}
//       />
//       <h2>Assigned Client Stats by Year</h2>
//       <input
//         type="number"
//         min="2000"
//         max="2100"
//         value={year}
//         onChange={(e) => setYear(e.target.value)}
//       />
//       {data.length > 0 ? (
//         <ResponsiveContainer width="100%" height={400}>
//           <BarChart
//             data={data}
//             margin={{
//               top: 5, right: 30, left: 20, bottom: 5,
//             }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="id" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="total" fill="#8884d8" />
//           </BarChart>
//         </ResponsiveContainer>
//       ) : (
//         <p>No data available for the selected period.</p>
//       )}
//     </div>
//   );
// };

// export default AssignedClientStats;

// import React, { useState, useEffect, useCallback } from 'react';
// import axiosClient from "../axiosClient";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { useStateContext } from '../context/ContextProvider';

// const AssignedClientStats = () => {
//   const [data, setData] = useState([]);
//   const [month, setMonth] = useState('');
//   const [year, setYear] = useState('');
//   const [week, setWeek] = useState('');
//   const { user } = useStateContext();

//   const fetchData = useCallback((url) => {
//     axiosClient
//       .get(url, {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       })
//       .then((response) => {
//         // Validate and process the data here
//         if (response.data && Array.isArray(response.data)) {
//           console.log('Fetched Data:', response.data); // Log the data for debugging
//           setData(response.data);
//         } else {
//           console.error('Invalid data format:', response.data);
//           setData([]);
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//         setData([]);
//       });
//   }, [user.token]);

//   useEffect(() => {
//     if (month) {
//       const [year, mon] = month.split('-');
//       fetchData(`api/assignedClientStats/month/${mon}-${year}/`);
//     }
//   }, [month, fetchData]);

//   useEffect(() => {
//     if (year) {
//       fetchData(`api/assignedClientStats/year/${year}/`);
//     }
//   }, [year, fetchData]);

//   useEffect(() => {
//     if (week) {
//       fetchData(`api/assignedClientStats/week/${week}/`);
//     }
//   }, [week, fetchData]);

//   return (
//     <div>
//       <div className="input-container">
//         <div>
//           <h2>Assigned Client Stats by Week</h2>
//           <input
//             type="date"
//             value={week}
//             onChange={(e) => setWeek(e.target.value)}
//           />
//         </div>
//         <div>
//           <h2>Assigned Client Stats by Month</h2>
//           <input
//             type="month"
//             value={month}
//             onChange={(e) => setMonth(e.target.value)}
//           />
//         </div>
//         <div>
//           <h2>Assigned Client Stats by Year</h2>
//           <input
//             type="number"
//             min="2000"
//             max="2100"
//             value={year}
//             onChange={(e) => setYear(e.target.value)}
//           />
//         </div>
//       </div>
//       {data.length > 0 ? (
//         <ResponsiveContainer width="100%" height={400}>
//           <BarChart
//             data={data}
//             margin={{
//               top: 5, right: 30, left: 20, bottom: 5,
//             }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="id" label={{ value: 'ID', position: 'insideBottomRight', offset: -5 }} />
//             <YAxis label={{ value: 'Total', angle: -90, position: 'insideLeft' }} />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="total" fill="#8884d8" barSize={50} />
//           </BarChart>
//         </ResponsiveContainer>
//       ) : (
//         <p>No data available for the selected period.</p>
//       )}
//     </div>
//   );
// };

// export default AssignedClientStats;

// import React, { useState, useEffect, useCallback } from 'react';
// import axiosClient from "../axiosClient";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { useStateContext } from '../context/ContextProvider';

// const AssignedClientStats = () => {
//   const [data, setData] = useState([]);
//   const [month, setMonth] = useState('');
//   const [year, setYear] = useState('');
//   const [week, setWeek] = useState('');
//   const { user } = useStateContext();

//   const fetchData = useCallback((url) => {
//     axiosClient
//       .get(url, {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       })
//       .then((response) => {
//         // Validate and process the data here
//         if (response.data && Array.isArray(response.data)) {
//           console.log('Fetched Data:', response.data); // Log the data for debugging
//           setData(response.data);
//         } else {
//           console.error('Invalid data format:', response.data);
//           setData([]);
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//         setData([]);
//       });
//   }, [user.token]);

//   useEffect(() => {
//     if (month) {
//       const [year, mon] = month.split('-');
//       fetchData(`api/assignedClientStats/month/${mon}-${year}/`);
//     }
//   }, [month, fetchData]);

//   useEffect(() => {
//     if (year) {
//       fetchData(`api/assignedClientStats/year/${year}/`);
//     }
//   }, [year, fetchData]);

//   useEffect(() => {
//     if (week) {
//       fetchData(`api/assignedClientStats/week/${week}/`);
//     }
//   }, [week, fetchData]);

//   return (
//     <div>
//       <div className="input-container">
//         <div>
//           <h2>Assigned Client Stats by Week</h2>
//           <input
//             type="date"
//             value={week}
//             onChange={(e) => setWeek(e.target.value)}
//           />
//         </div>
//         <div>
//           <h2>Assigned Client Stats by Month</h2>
//           <input
//             type="month"
//             value={month}
//             onChange={(e) => setMonth(e.target.value)}
//           />
//         </div>
//         <div>
//           <h2>Assigned Client Stats by Year</h2>
//           <input
//             type="number"
//             min="2000"
//             max="2100"
//             value={year}
//             onChange={(e) => setYear(e.target.value)}
//           />
//         </div>
//       </div>
//       {data.length > 0 ? (
//         <ResponsiveContainer width="100%" height={400}>
//           <BarChart
//             data={data}
//             margin={{
//               top: 5, right: 30, left: 20, bottom: 5,
//             }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="staffName" label={{ value: 'Staff Name', position: 'insideBottomRight', offset: -5 }} />
//             <YAxis label={{ value: 'Total', angle: -90, position: 'insideLeft' }} />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="total" fill="#8884d8" barSize={50} />
//           </BarChart>
//         </ResponsiveContainer>
//       ) : (
//         <p>No data available for the selected period.</p>
//       )}
//     </div>
//   );
// };

// export default AssignedClientStats;

import React, { useState, useEffect, useCallback } from "react";
import axiosClient from "../axiosClient";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useStateContext } from "../context/ContextProvider";
import { useTranslation } from "react-i18next";

const AssignedClientStats = () => {
  const [data, setData] = useState([]);
  const [missingData, setDataMissingData] = useState([]);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [week, setWeek] = useState("");
  const { user } = useStateContext();
  const { t } = useTranslation();

  const fetchData = useCallback(
    (url) => {
      axiosClient
        .get(url, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          if (response.data && Array.isArray(response.data)) {
            setData(response.data);
          } else {
            console.error("Invalid data format:", response.data);
            setData([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setData([]);
        });
    },
    [user.token]
  );

  const fetchDataMissingAppointment = useCallback(
    (url) => {
      axiosClient
        .get(url, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          if (response.data && Array.isArray(response.data)) {
            setDataMissingData(response.data);
          } else {
            console.error("Invalid data format:", response.data);
            setData([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setData([]);
        });
    },
    [user.token]
  );

  useEffect(() => {
    if (month) {
      const [year, mon] = month.split("-");
      fetchData(`api/assignedClientStats/month/${mon}-${year}/`);
      fetchDataMissingAppointment(
        `api/missing-appointment/month/${mon}-${year}/`
      );
    }
  }, [month, fetchData, fetchDataMissingAppointment]);

  useEffect(() => {
    if (year) {
      fetchData(`api/assignedClientStats/year/${year}/`);
      fetchDataMissingAppointment(`api/missing-appointment/year/${year}/`);
    }
  }, [year, fetchData, fetchDataMissingAppointment]);

  useEffect(() => {
    if (week) {
      fetchData(`api/assignedClientStats/week/${week}/`);
      fetchDataMissingAppointment(`api/missing-appointment/week/${week}/`);
    }
  }, [week, fetchData, fetchDataMissingAppointment]);

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
    setYear(""); // Clear year selection
    setWeek(""); // Clear week selection
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
    setMonth(""); // Clear month selection
    setWeek(""); // Clear week selection
  };

  const handleWeekChange = (e) => {
    setWeek(e.target.value);
    setMonth(""); // Clear month selection
    setYear(""); // Clear year selection
  };

  return (
    <div>
      <div
        className="input-container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <div>
          <h2>{t("Assigned Client Stats by Week")}</h2>
          <input type="date" value={week} onChange={handleWeekChange} />
        </div>
        <div>
          <h2>{t("Assigned Client Stats by Month")}</h2>
          <input type="month" value={month} onChange={handleMonthChange} />
        </div>
        <div>
          <h2>{t("Assigned Client Stats by Year")}</h2>
          <input
            type="number"
            min="2000"
            max="2100"
            value={year}
            onChange={handleYearChange}
          />
        </div>
      </div>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              label={{
                value: "Staff Name",
                position: "insideBottomRight",
                offset: -5,
              }}
            />
            <YAxis
              label={{ value: "Total", angle: -90, position: "insideLeft" }}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#8884d8" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p>{t("No data available for the selected period")}.</p>
      )}

      {missingData.length > 0 ? (
        <ResponsiveContainer
          width="100%"
          style={{ marginTop: "50px" }}
          height={400}
        >
          <hr />
          <h3>Missing Appointment by Patients</h3>
          <BarChart
            data={missingData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              label={{
                value: "Staff Name",
                position: "insideBottomRight",
                offset: -5,
              }}
            />
            <YAxis
              label={{ value: "Total", angle: -90, position: "insideLeft" }}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#8884d8" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p>
          {t("No Missing Appointment data available for the selected period")}.
        </p>
      )}
    </div>
  );
};

export default AssignedClientStats;
