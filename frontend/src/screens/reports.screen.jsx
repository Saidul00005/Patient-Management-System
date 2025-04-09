////////////////////////////////////////////

// import React, { useState, useEffect } from 'react';
// import axiosClient from "../axiosClient";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { useStateContext } from '../context/ContextProvider';

// const Reports = () => {
//   const [data, setData] = useState([]);
//   const [month, setMonth] = useState('');
//   const [week, setWeek] = useState('');
//   const [year, setYear] = useState('');
//   const { user } = useStateContext();

//   useEffect(() => {
//     if (month) {
//       const [year, mon] = month.split('-');
//       axiosClient
//         .get(`api/appointmentStats/month/${mon}-${year}/`, {
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
//     if (week) {
//       axiosClient
//         .get(`api/appointmentStats/week/${week}/`, {
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

//   useEffect(() => {
//     if (year) {
//       axiosClient
//         .get(`api/appointmentStats/year/${year}/`, {
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
//       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
//         <div>
//           <h3>Appointment Stats by Month</h3>
//           <input
//             type="month"
//             value={month}
//             onChange={(e) => setMonth(e.target.value)}
//           />
//         </div>
//         <div>
//           <h3>Appointment Stats by Week</h3>
//           <input
//             type="date"
//             value={week}
//             onChange={(e) => setWeek(e.target.value)}
//           />
//         </div>
//         <div>
//           <h3>Appointment Stats by Year</h3>
//           <input
//             type="number"
//             min="2000"
//             max="2100"
//             step="1"
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
//               top: 50, right: 30, left: 30, bottom: 50,
//             }}
//           >
//             <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
//             <XAxis
//               dataKey="name"
//               interval={0}
//               angle={-45}
//               textAnchor="end"
//             />
//             <YAxis />
//             <Tooltip
//               contentStyle={{ backgroundColor: "#f5f5f5", border: "1px solid #ccc" }}
//               itemStyle={{ color: "#8884d8" }}
//               cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
//             />
//             <Legend
//               verticalAlign="top"
//               align="center"
//               iconType="circle"
//             />
//             <defs>
//               <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
//                 <stop offset="95%" stopColor="#8884d8" stopOpacity={0.3}/>
//               </linearGradient>
//             </defs>
//             <Bar
//               dataKey="total"
//               fill="url(#colorUv)"
//               barSize={60}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       ) : (
//         <p>No data available for the selected period.</p>
//       )}
//     </div>
//   );
// };

// export default Reports;

// import React, { useState, useEffect } from 'react';
// import axiosClient from "../axiosClient";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { useStateContext } from '../context/ContextProvider';

// const Reports = () => {
//   const [data, setData] = useState([]);
//   const [month, setMonth] = useState('');
//   const [week, setWeek] = useState('');
//   const [year, setYear] = useState('');
//   const { user } = useStateContext();

//   useEffect(() => {
//     if (month) {
//       const [year, mon] = month.split('-');
//       axiosClient
//         .get(`api/appointmentStats/month/${mon}-${year}/`, {
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
//     if (week) {
//       axiosClient
//         .get(`api/appointmentStats/week/${week}/`, {
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

//   useEffect(() => {
//     if (year) {
//       // Clear the selected month when a year is selected
//       setMonth('');
//       axiosClient
//         .get(`api/appointmentStats/year/${year}/`, {
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

//   const handleMonthChange = (e) => {
//     setMonth(e.target.value);
//     // Optionally, clear the year when a month is selected
//     setYear('');
//   };

//   const handleYearChange = (e) => {
//     setYear(e.target.value);
//     // Clear the selected month when a year is selected
//     setMonth('');
//   };

//   // Custom tick component to split names into two lines
//   const CustomTick = (props) => {
//     const { x, y, payload } = props;
//     const nameParts = payload.value.split(' ');
//     const firstName = nameParts[0];
//     const lastName = nameParts.slice(1).join(' ');

//     return (
//       <g transform={`translate(${x},${y})`}>
//         <text x={0} y={0} dy={16} textAnchor="middle" fill="#666">
//           <tspan x="0" dy="1.2em">{firstName}</tspan>
//           <tspan x="0" dy="1.2em">{lastName}</tspan>
//         </text>
//       </g>
//     );
//   };

//   return (
//     <div>
//       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
//         <div>
//           <h3>Appointment Stats by Month</h3>
//           <input
//             type="month"
//             value={month}
//             onChange={handleMonthChange}
//           />
//         </div>
//         <div>
//           <h3>Appointment Stats by Week</h3>
//           <input
//             type="date"
//             value={week}
//             onChange={(e) => setWeek(e.target.value)}
//           />
//         </div>
//         <div>
//           <h3>Appointment Stats by Year</h3>
//           <input
//             type="number"
//             min="2000"
//             max="2100"
//             step="1"
//             value={year}
//             onChange={handleYearChange}
//           />
//         </div>
//       </div>
//       {data.length > 0 ? (
//         <ResponsiveContainer width="100%" height={400}>
//           <BarChart
//             data={data}
//             margin={{
//               top: 50, right: 30, left: 30, bottom: 50,
//             }}
//           >
//             <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
//             <XAxis
//               dataKey="name"
//               interval={0}
//               tick={<CustomTick />} // Use the custom tick component
//             />
//             <YAxis />
//             <Tooltip
//               contentStyle={{ backgroundColor: "#f5f5f5", border: "1px solid #ccc" }}
//               itemStyle={{ color: "#8884d8" }}
//               cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
//             />
//             <Legend
//               verticalAlign="top"
//               align="center"
//               iconType="circle"
//             />
//             <defs>
//               <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
//                 <stop offset="95%" stopColor="#8884d8" stopOpacity={0.3}/>
//               </linearGradient>
//             </defs>
//             <Bar
//               dataKey="total"
//               fill="url(#colorUv)"
//               barSize={20}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       ) : (
//         <p>No data available for the selected period.</p>
//       )}
//     </div>
//   );
// };

// export default Reports;

import React, { useState, useEffect } from "react";
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

const Reports = () => {
  const [data, setData] = useState([]);
  const [month, setMonth] = useState("");
  const [week, setWeek] = useState("");
  const [year, setYear] = useState("");
  const { user } = useStateContext();
  const { t } = useTranslation();

  useEffect(() => {
    if (month) {
      const [year, mon] = month.split("-");
      axiosClient
        .get(`api/appointmentStats/month/${mon}-${year}/`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          console.log(response.data); // Check for the 'name' field
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [month, user.token]);

  useEffect(() => {
    if (week) {
      setMonth(""); // Clear the month when a week is selected
      axiosClient
        .get(`api/appointmentStats/week/${week}/`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [week, user.token]);

  useEffect(() => {
    if (year) {
      setMonth(""); // Clear the month when a year is selected
      setWeek(""); // Clear the week when a year is selected
      axiosClient
        .get(`api/appointmentStats/year/${year}/`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [year, user.token]);

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
    setYear(""); // Clear the year when a month is selected
    setWeek(""); // Clear the week when a month is selected
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
    setMonth(""); // Clear the month when a year is selected
    setWeek(""); // Clear the week when a year is selected
  };

  const handleWeekChange = (e) => {
    setWeek(e.target.value);
    setMonth(""); // Clear the month when a week is selected
    setYear(""); // Clear the year when a week is selected
  };

  // Custom tick component to split names into two lines with a slight angle
  const CustomTick = (props) => {
    const { x, y, payload } = props;
    const nameParts = payload.value ? payload.value.split(" ") : ["No", "Name"];
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ");

    return (
      <g transform={`translate(${x},${y}) rotate(-15)`}>
        {" "}
        {/* Apply slight rotation */}
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666">
          <tspan x="0" dy="0">
            {firstName}
          </tspan>
          <tspan x="0" dy="1.2em">
            {lastName}
          </tspan>
        </text>
      </g>
    );
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <div>
          <h3>{t("Appointment Stats by Month")}</h3>
          <input type="month" value={month} onChange={handleMonthChange} />
        </div>
        <div>
          <h3>{t("Appointment Stats by Week")}</h3>
          <input type="date" value={week} onChange={handleWeekChange} />
        </div>
        <div>
          <h3>{t("Appointment Stats by Year")}</h3>
          <input
            type="number"
            min="2000"
            max="2100"
            step="1"
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
              top: 50,
              right: 30,
              left: 30,
              bottom: 50,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey="name" // Use the 'name' field directly
              interval={0}
              tick={<CustomTick />} // Use the custom tick component
              hide={false} // Ensure X-axis is always shown
            />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "#f5f5f5",
                border: "1px solid #ccc",
              }}
              itemStyle={{ color: "#8884d8" }}
              cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
            />
            <Legend verticalAlign="top" align="center" iconType="circle" />
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <Bar dataKey="total" fill="url(#colorUv)" barSize={60} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p>{t("No data available for the selected period")}.</p>
      )}
    </div>
  );
};

export default Reports;
