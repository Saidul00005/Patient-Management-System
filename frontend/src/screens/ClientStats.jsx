// import React, { useState, useEffect } from 'react';
// import axiosClient from "../axiosClient";
// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { useStateContext } from '../context/ContextProvider';

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// const ClientStatsByMonth = () => {
//   const [data, setData] = useState([]);
//   const [month, setMonth] = useState('');
//   const { user } = useStateContext();

//   useEffect(() => {
//     if (month) {
//       const [year, mon] = month.split('-');
//       axiosClient
//         .get(`api/clientStats/month/${mon}-${year}/`, {
//           headers: {
//             Authorization: `Bearer ${user.token}`,
//           },
//         })
//         .then((response) => {
//           const responseData = [
//             { name: 'All Clients', value: response.data.all },
//             { name: 'Male Clients', value: response.data.male },
//             { name: 'Female Clients', value: response.data.female },
//           ];
//           setData(responseData);
//         })
//         .catch((error) => {
//           console.error('Error fetching data:', error);
//         });
//     }
//   }, [month, user.token]);

//   return (
//     <div>
//       <h2>Client Stats by Month</h2>
//       <input
//         type="month"
//         value={month}
//         onChange={(e) => setMonth(e.target.value)}
//       />
//       {data.length > 0 ? (
//         <ResponsiveContainer width="100%" height={400}>
//           <PieChart>
//             <Pie
//               data={data}
//               cx="50%"
//               cy="50%"
//               labelLine={false}
//               label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//               outerRadius={150}
//               fill="#8884d8"
//               dataKey="value"
//             >
//               {data.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//             <Legend />
//           </PieChart>
//         </ResponsiveContainer>
//       ) : (
//         <p>No data available for the selected month.</p>
//       )}
//     </div>
//   );
// };

// export default ClientStatsByMonth;
// import React, { useState, useEffect } from 'react';
// import axiosClient from "../axiosClient";
// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { useStateContext } from '../context/ContextProvider';

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// const ClientStats = () => {
//   const [data, setData] = useState([]);
//   const [period, setPeriod] = useState(''); // This will hold either month or year
//   const [isMonth, setIsMonth] = useState(true); // Toggle between month and year
//   const { user } = useStateContext();

//   useEffect(() => {
//     if (period) {
//       const url = isMonth ? `api/clientStats/month/${period.split('-').reverse().join('-')}/` : `api/clientStats/year/${period}/`;
//       axiosClient
//         .get(url, {
//           headers: {
//             Authorization: `Bearer ${user.token}`,
//           },
//         })
//         .then((response) => {
//           const responseData = [
//             { name: 'All Clients', value: response.data.all },
//             { name: 'Male Clients', value: response.data.male },
//             { name: 'Female Clients', value: response.data.female },
//           ];
//           setData(responseData);
//         })
//         .catch((error) => {
//           console.error('Error fetching data:', error);
//         });
//     }
//   }, [period, isMonth, user.token]);

//   return (
//     <div>
//       <h2>Client Stats</h2>
//       <div>
//         <label>
//           <input
//             type="radio"
//             name="period"
//             value="month"
//             checked={isMonth}
//             onChange={() => setIsMonth(true)}
//           />
//           Month
//         </label>
//         <label>
//           <input
//             type="radio"
//             name="period"
//             value="year"
//             checked={!isMonth}
//             onChange={() => setIsMonth(false)}
//           />
//           Year
//         </label>
//       </div>
//       {isMonth ? (
//         <input
//           type="month"
//           value={period}
//           onChange={(e) => setPeriod(e.target.value)}
//         />
//       ) : (
//         <input
//           type="number"
//           min="2000"
//           max="2100"
//           value={period}
//           onChange={(e) => setPeriod(e.target.value)}
//         />
//       )}
//       {data.length > 0 ? (
//         <ResponsiveContainer width="100%" height={400}>
//           <PieChart>
//             <Pie
//               data={data}
//               cx="50%"
//               cy="50%"
//               labelLine={false}
//               label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//               outerRadius={150}
//               fill="#8884d8"
//               dataKey="value"
//             >
//               {data.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//             <Legend />
//           </PieChart>
//         </ResponsiveContainer>
//       ) : (
//         <p>No data available for the selected period.</p>
//       )}
//     </div>
//   );
// };

// export default ClientStats;

// import React, { useState, useEffect } from 'react';
// import axiosClient from "../axiosClient";
// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { useStateContext } from '../context/ContextProvider';

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// const ClientStats = () => {
//   const [data, setData] = useState([]);
//   const [month, setMonth] = useState('');
//   const [year, setYear] = useState('');
//   const [week, setWeek] = useState('');
//   const { user } = useStateContext();

//   const fetchData = (url) => {
//     axiosClient.get(url, {
//       headers: {
//         Authorization: `Bearer ${user.token}`,
//       },
//     })
//     .then((response) => {
//       const { all, male, female } = response.data;
//       setData([
//         { name: 'All', value: all },
//         { name: 'Male', value: male },
//         { name: 'Female', value: female },
//       ]);
//     })
//     .catch((error) => {
//       console.error('Error fetching data:', error);
//     });
//   };

//   useEffect(() => {
//     if (month) {
//       const [year, mon] = month.split('-');
//       fetchData(`api/clientStats/month/${mon}-${year}/`);
//     }
//   }, [month, user.token]);

//   useEffect(() => {
//     if (year) {
//       fetchData(`api/clientStats/year/${year}/`);
//     }
//   }, [year, user.token]);

//   useEffect(() => {
//     if (week) {
//       fetchData(`api/clientStats/week/${week}/`);
//     }
//   }, [week, user.token]);

//   return (
//     <div>
//       <h2>Client Stats</h2>
//       <div>
//         <label>
//           Month:
//           <input
//             type="month"
//             value={month}
//             onChange={(e) => setMonth(e.target.value)}
//           />
//         </label>
//       </div>
//       <div>
//         <label>
//           Year:
//           <input
//             type="number"
//             min="2000"
//             max="2100"
//             value={year}
//             onChange={(e) => setYear(e.target.value)}
//           />
//         </label>
//       </div>
//       <div>
//         <label>
//           Week:
//           <input
//             type="date"
//             value={week}
//             onChange={(e) => setWeek(e.target.value)}
//           />
//         </label>
//       </div>
//       {data.length > 0 ? (
//         <ResponsiveContainer width="100%" height={400}>
//           <PieChart>
//             <Pie
//               data={data}
//               dataKey="value"
//               nameKey="name"
//               cx="50%"
//               cy="50%"
//               outerRadius={150}
//               fill="#8884d8"
//               label
//             >
//               {data.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//             <Legend />
//           </PieChart>
//         </ResponsiveContainer>
//       ) : (
//         <p>No data available for the selected period.</p>
//       )}
//     </div>
//   );
// };

// export default ClientStats;

/////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState, useEffect } from 'react';
// import axiosClient from "../axiosClient";
// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { useStateContext } from '../context/ContextProvider';

// const COLORS = ['#00C49F', '#FFBB28']; // Colors for Male and Female

// const ClientStats = () => {
//   const [data, setData] = useState([]);
//   const [month, setMonth] = useState('');
//   const [year, setYear] = useState('');
//   const [week, setWeek] = useState('');
//   const { user } = useStateContext();

//   const fetchData = (url) => {
//     axiosClient.get(url, {
//       headers: {
//         Authorization: `Bearer ${user.token}`,
//       },
//     })
//     .then((response) => {
//       const { male, female } = response.data;
//       setData([
//         { name: 'Male', value: male },
//         { name: 'Female', value: female },
//       ]);
//     })
//     .catch((error) => {
//       console.error('Error fetching data:', error);
//     });
//   };

//   useEffect(() => {
//     if (month) {
//       const [year, mon] = month.split('-');
//       fetchData(`api/clientStats/month/${mon}-${year}/`);
//     }
//   }, [month, user.token]);

//   useEffect(() => {
//     if (year) {
//       fetchData(`api/clientStats/year/${year}/`);
//     }
//   }, [year, user.token]);

//   useEffect(() => {
//     if (week) {
//       fetchData(`api/clientStats/week/${week}/`);
//     }
//   }, [week, user.token]);

//   return (
//     <div style={{ display: 'flex', alignItems: 'flex-start' }}>
//       <div style={{ marginRight: '20px' }}>
//         <h2>Client Stats</h2>
//         <div>
//           <label>
//             Month:
//             <input
//               type="month"
//               value={month}
//               onChange={(e) => {
//                 setMonth(e.target.value);
//                 setYear('');
//                 setWeek('');
//               }}
//             />
//           </label>
//         </div>
//         <div>
//           <label>
//             Year:
//             <input
//               type="number"
//               min="2000"
//               max="2100"
//               value={year}
//               onChange={(e) => {
//                 setYear(e.target.value);
//                 setMonth('');
//                 setWeek('');
//               }}
//             />
//           </label>
//         </div>
//         <div>
//           <label>
//             Week:
//             <input
//               type="date"
//               value={week}
//               onChange={(e) => {
//                 setWeek(e.target.value);
//                 setMonth('');
//                 setYear('');
//               }}
//             />
//           </label>
//         </div>
//       </div>
//       <div style={{ flex: 1 }}>
//         {data.length > 0 ? (
//           <ResponsiveContainer width="100%" height={400}>
//             <PieChart>
//               <Pie
//                 data={data}
//                 dataKey="value"
//                 nameKey="name"
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={150}
//                 fill="#8884d8"
//                 label
//               >
//                 {data.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         ) : (
//           <p>No data available for the selected period.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ClientStats;

//////////////////////////////////////////////////////////////////////
// import React, { useState, useEffect } from 'react';
// import axiosClient from "../axiosClient";
// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { useStateContext } from '../context/ContextProvider';

// const COLORS = ['#00C49F', '#FFBB28']; // Colors for Male and Female
// const AGE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28B0C', '#FF33D6', '#8B00FF']; // Colors for Age Groups

// const Statistics = () => {
//   const [genderData, setGenderData] = useState([]);
//   const [ageData, setAgeData] = useState([]);
//   const [genderMonth, setGenderMonth] = useState('');
//   const [genderYear, setGenderYear] = useState('');
//   const [genderWeek, setGenderWeek] = useState('');
//   const [ageMonth, setAgeMonth] = useState('');
//   const [ageYear, setAgeYear] = useState('');
//   const [ageWeek, setAgeWeek] = useState('');
//   const { user } = useStateContext();

//   const fetchGenderData = (url) => {
//     axiosClient.get(url, {
//       headers: {
//         Authorization: `Bearer ${user.token}`,
//       },
//     })
//     .then((response) => {
//       const { male, female } = response.data;
//       setGenderData([
//         { name: 'Male', value: male },
//         { name: 'Female', value: female },
//       ]);
//     })
//     .catch((error) => {
//       console.error('Error fetching gender data:', error);
//     });
//   };

//   const fetchAgeData = (url) => {
//     axiosClient.get(url, {
//       headers: {
//         Authorization: `Bearer ${user.token}`,
//       },
//     })
//     .then((response) => {
//       const ageDistribution = response.data.age_distribution;
//       const ageDataArray = Object.keys(ageDistribution).map((ageRange) => ({
//         name: ageRange,
//         value: ageDistribution[ageRange],
//       }));
//       setAgeData(ageDataArray);
//     })
//     .catch((error) => {
//       console.error('Error fetching age data:', error);
//     });
//   };

//   useEffect(() => {
//     if (genderMonth) {
//       const [year, mon] = genderMonth.split('-');
//       fetchGenderData(`api/clientStats/month/${mon}-${year}/`);
//     }
//   }, [genderMonth, user.token]);

//   useEffect(() => {
//     if (genderYear) {
//       fetchGenderData(`api/clientStats/year/${genderYear}/`);
//     }
//   }, [genderYear, user.token]);

//   useEffect(() => {
//     if (genderWeek) {
//       fetchGenderData(`api/clientStats/week/${genderWeek}/`);
//     }
//   }, [genderWeek, user.token]);

//   useEffect(() => {
//     if (ageMonth) {
//       const [year, mon] = ageMonth.split('-');
//       fetchAgeData(`api/clientAgeStats/month/${mon}-${year}/`);
//     }
//   }, [ageMonth, user.token]);

//   useEffect(() => {
//     if (ageYear) {
//       fetchAgeData(`api/clientAgeStats/year/${ageYear}/`);
//     }
//   }, [ageYear, user.token]);

//   useEffect(() => {
//     if (ageWeek) {
//       fetchAgeData(`api/clientAgeStats/week/${ageWeek}/`);
//     }
//   }, [ageWeek, user.token]);

//   return (
//     <div className="statistics-container">
//       <h2>Gender Statistic</h2>
//       <div className="input-section">
//         <div>
//           <label>
//             Month:
//             <input
//               type="month"
//               value={genderMonth}
//               onChange={(e) => {
//                 setGenderMonth(e.target.value);
//                 setGenderYear('');
//                 setGenderWeek('');
//               }}
//             />
//           </label>
//         </div>
//         <div>
//           <label>
//             Year:
//             <input
//               type="number"
//               min="2000"
//               max="2100"
//               value={genderYear}
//               onChange={(e) => {
//                 setGenderYear(e.target.value);
//                 setGenderMonth('');
//                 setGenderWeek('');
//               }}
//             />
//           </label>
//         </div>
//         <div>
//           <label>
//             Week:
//             <input
//               type="date"
//               value={genderWeek}
//               onChange={(e) => {
//                 setGenderWeek(e.target.value);
//                 setGenderMonth('');
//                 setGenderYear('');
//               }}
//             />
//           </label>
//         </div>
//       </div>
//       <div className="chart-section">
//         {genderData.length > 0 ? (
//           <ResponsiveContainer width="100%" height={400}>
//             <PieChart>
//               <Pie
//                 data={genderData}
//                 dataKey="value"
//                 nameKey="name"
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={150}
//                 fill="#8884d8"
//                 label
//               >
//                 {genderData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         ) : (
//           <p>No data available for the selected period.</p>
//         )}
//       </div>

//       <h2>Age Statistic</h2>
//       <div className="input-section">
//         <div>
//           <label>
//             Month:
//             <input
//               type="month"
//               value={ageMonth}
//               onChange={(e) => {
//                 setAgeMonth(e.target.value);
//                 setAgeYear('');
//                 setAgeWeek('');
//               }}
//             />
//           </label>
//         </div>
//         <div>
//           <label>
//             Year:
//             <input
//               type="number"
//               min="2000"
//               max="2100"
//               value={ageYear}
//               onChange={(e) => {
//                 setAgeYear(e.target.value);
//                 setAgeMonth('');
//                 setAgeWeek('');
//               }}
//             />
//           </label>
//         </div>
//         <div>
//           <label>
//             Week:
//             <input
//               type="date"
//               value={ageWeek}
//               onChange={(e) => {
//                 setAgeWeek(e.target.value);
//                 setAgeMonth('');
//                 setAgeYear('');
//               }}
//             />
//           </label>
//         </div>
//       </div>
//       <div className="chart-section">
//         {ageData.length > 0 ? (
//           <ResponsiveContainer width="100%" height={400}>
//             <PieChart>
//               <Pie
//                 data={ageData}
//                 dataKey="value"
//                 nameKey="name"
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={150}
//                 fill="#8884d8"
//                 label
//               >
//                 {ageData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={AGE_COLORS[index % AGE_COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         ) : (
//           <p>No data available for the selected period.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Statistics;
import React, { useState, useEffect } from "react";
import axiosClient from "../axiosClient";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Bar,
  BarChart,
  XAxis,
  YAxis,
} from "recharts";
import { useStateContext } from "../context/ContextProvider";

import { Box, Typography } from "@mui/material";

import { useTranslation } from "react-i18next";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const COLORS = ["#00C49F", "#FFBB28"]; // Colors for Male and Female
// const AGE_COLORS = [
//   "#0088FE",
//   "#00C49F",
//   "#FFBB28",
//   "#FF8042",
//   "#A28B0C",
//   "#FF33D6",
//   "#8B00FF",
// ]; // Colors for Age Groups

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {value}
    </text>
  );
};

const Statistics = () => {
  const [genderData, setGenderData] = useState([]);
  const [ageData, setAgeData] = useState([]);
  const [smsData, setSmsData] = useState([]);
  const [genderMonth, setGenderMonth] = useState("");
  const [genderYear, setGenderYear] = useState("");
  const [genderWeek, setGenderWeek] = useState("");
  const [ageMonth, setAgeMonth] = useState("");
  const [ageYear, setAgeYear] = useState("");
  const [ageWeek, setAgeWeek] = useState("");

  const [smsMonth, setSmsMonth] = useState("");
  const [smsYear, setSmsYear] = useState("");
  const [smsWeek, setSmsWeek] = useState("");

  const [statistics, setStatistics] = useState("GENDER");

  const { user } = useStateContext();
  const { t } = useTranslation();

  const statisticsChoices = [
    { label: `${t("Gender")}`, value: "GENDER" },
    { label: `${t("Age")}`, value: "AGE" },
    { label: `${t("SMS")}`, value: "SMS" },
  ];

  const fetchGenderData = (url) => {
    axiosClient
      .get(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        const { male, female } = response.data;
        setGenderData([
          { name: "Male", value: male },
          { name: "Female", value: female },
        ]);
      })
      .catch((error) => {
        console.error("Error fetching gender data:", error);
      });
  };

  const fetchAgeData = (url) => {
    axiosClient
      .get(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        const ageDistribution = response.data.age_distribution;
        const ageDataArray = Object.keys(ageDistribution).map((ageRange) => ({
          name: ageRange,
          value: ageDistribution[ageRange],
        }));
        setAgeData(ageDataArray);
      })
      .catch((error) => {
        console.error("Error fetching age data:", error);
      });
  };

  const fetchSmsData = (url) => {
    axiosClient
      .get(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        const formattedData = response.data.map((item) => ({
          name: item.period,
          value: item.sends_count,
        }));

        setSmsData(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching age data:", error);
      });
  };

  useEffect(() => {
    if (genderMonth) {
      const [year, mon] = genderMonth.split("-");
      fetchGenderData(`api/clientStats/month/${mon}-${year}/`);
    }
    // eslint-disable-next-line
  }, [genderMonth, user.token]);

  useEffect(() => {
    if (genderYear) {
      fetchGenderData(`api/clientStats/year/${genderYear}/`);
    }
    // eslint-disable-next-line
  }, [genderYear, user.token]);

  useEffect(() => {
    if (genderWeek) {
      fetchGenderData(`api/clientStats/week/${genderWeek}/`);
    }
    // eslint-disable-next-line
  }, [genderWeek, user.token]);

  useEffect(() => {
    if (ageMonth) {
      const [year, mon] = ageMonth.split("-");
      fetchAgeData(`api/clientAgeStats/month/${mon}-${year}/`);
    }
    // eslint-disable-next-line
  }, [ageMonth, user.token]);

  useEffect(() => {
    if (ageYear) {
      fetchAgeData(`api/clientAgeStats/year/${ageYear}/`);
    }
    // eslint-disable-next-line
  }, [ageYear, user.token]);

  useEffect(() => {
    if (ageWeek) {
      fetchAgeData(`api/clientAgeStats/week/${ageWeek}/`);
    }
    // eslint-disable-next-line
  }, [ageWeek, user.token]);

  // SMS
  useEffect(() => {
    if (smsMonth) {
      const [year, mon] = smsMonth.split("-");
      fetchSmsData(
        `api/appointment-send-info/stats/?year=${year}&month=${mon}`
      );
    }
    // eslint-disable-next-line
  }, [smsMonth, user.token]);

  useEffect(() => {
    if (smsYear) {
      fetchSmsData(`api/appointment-send-info/stats/?year=${smsYear}`);
    }
    // eslint-disable-next-line
  }, [smsYear, user.token]);

  useEffect(() => {
    if (smsWeek) {
      const [year, week] = smsWeek.split("-");
      fetchSmsData(
        `api/appointment-send-info/stats/?year=${year}&week=${week}`
      );
    }
    // eslint-disable-next-line
  }, [smsWeek, user.token]);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
        <Box sx={{ width: "100%", flexBasis: "35%" }}>
          <Typography
            variant="body1"
            sx={{ textAlign: "left", mb: 2, fontWeight: "bold" }}
          >
            {t("Show statstics for")}
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="Statistics-select-label">
                {t("Statistics")}
              </InputLabel>
              <Select
                labelId="Statistics-select-label"
                id="Statistics-select"
                value={statistics}
                label={t("Statistics")}
                onChange={(e) => setStatistics(e.target.value)}
                sx={{ textAlign: "left" }}
              >
                {statisticsChoices.map((stats, idx) => (
                  <MenuItem key={idx} value={stats.value}>
                    {stats.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Box sx={{ width: "100%", flexBasis: "65%" }}>
          {statistics === "GENDER" && (
            <>
              <Box>
                <Typography
                  variant="body1"
                  sx={{ textAlign: "left", fontWeight: "bold" }}
                >
                  {t("Gender Statistic")}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ width: "100%", mt: 2 }}>
                    <input
                      style={{
                        width: "100%",
                        padding: "17px 7px",
                        borderRadius: "5px",
                        border: "2px solid #ddd",
                      }}
                      type="number"
                      min="2000"
                      max="2100"
                      placeholder={t("Year")}
                      value={genderYear}
                      onChange={(e) => {
                        setGenderYear(e.target.value);
                        setGenderMonth("");
                        setGenderWeek("");
                      }}
                    />
                  </Box>
                  <Box sx={{ width: "100%", mt: "-15px" }}>
                    <label
                      style={{
                        display: "block",
                        textAlign: "left",
                        marginBottom: 5,
                      }}
                    >
                      {t("Month")}
                    </label>
                    <input
                      style={{
                        width: "100%",
                        padding: "17px 7px",
                        borderRadius: "5px",
                        border: "2px solid #ddd",
                      }}
                      type="month"
                      value={genderMonth}
                      onChange={(e) => {
                        setGenderMonth(e.target.value);
                        setGenderYear("");
                        setGenderWeek("");
                      }}
                    />
                  </Box>
                  <Box sx={{ width: "100%", mt: "-15px" }}>
                    <label
                      style={{
                        display: "block",
                        textAlign: "left",
                        marginBottom: 5,
                      }}
                    >
                      {t("Week")}
                    </label>
                    <input
                      style={{
                        width: "100%",
                        padding: "17px 7px",
                        borderRadius: "5px",
                        border: "2px solid #ddd",
                      }}
                      type="date"
                      value={genderWeek}
                      onChange={(e) => {
                        setGenderWeek(e.target.value);
                        setGenderMonth("");
                        setGenderYear("");
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </>
          )}

          {statistics === "AGE" && (
            <>
              <Box>
                <Typography
                  variant="body1"
                  sx={{ textAlign: "left", fontWeight: "bold" }}
                >
                  {t("Age Statistic")}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ width: "100%", mt: 2 }}>
                    <input
                      style={{
                        width: "100%",
                        padding: "17px 7px",
                        borderRadius: "5px",
                        border: "2px solid #ddd",
                      }}
                      type="number"
                      min="2000"
                      max="2100"
                      placeholder={t("Year")}
                      value={ageYear}
                      onChange={(e) => {
                        setAgeYear(e.target.value);
                        setAgeMonth("");
                        setAgeWeek("");
                      }}
                    />
                  </Box>
                  <Box sx={{ width: "100%", mt: "-15px" }}>
                    <label
                      style={{
                        display: "block",
                        textAlign: "left",
                        marginBottom: 5,
                      }}
                    >
                      {t("Month")}
                    </label>
                    <input
                      style={{
                        width: "100%",
                        padding: "17px 7px",
                        borderRadius: "5px",
                        border: "2px solid #ddd",
                      }}
                      type="month"
                      value={ageMonth}
                      onChange={(e) => {
                        setAgeMonth(e.target.value);
                        setAgeYear("");
                        setAgeWeek("");
                      }}
                    />
                  </Box>
                  <Box sx={{ width: "100%", mt: "-15px" }}>
                    <label
                      style={{
                        display: "block",
                        textAlign: "left",
                        marginBottom: 5,
                      }}
                    >
                      {t("Week")}
                    </label>
                    <input
                      style={{
                        width: "100%",
                        padding: "17px 7px",
                        borderRadius: "5px",
                        border: "2px solid #ddd",
                      }}
                      type="date"
                      value={ageWeek}
                      onChange={(e) => {
                        setAgeWeek(e.target.value);
                        setAgeMonth("");
                        setAgeYear("");
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </>
          )}

          {statistics === "SMS" && (
            <>
              <Box>
                <Typography
                  variant="body1"
                  sx={{ textAlign: "left", fontWeight: "bold" }}
                >
                  {t("SMS Statistic")}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ width: "100%", mt: 2 }}>
                    <input
                      style={{
                        width: "100%",
                        padding: "17px 7px",
                        borderRadius: "5px",
                        border: "2px solid #ddd",
                      }}
                      type="number"
                      min="2000"
                      max="2100"
                      placeholder={t("Year")}
                      value={smsYear}
                      onChange={(e) => {
                        setSmsYear(e.target.value);
                        setSmsMonth("");
                        setSmsWeek("");
                      }}
                    />
                  </Box>
                  <Box sx={{ width: "100%", mt: "-15px" }}>
                    <label
                      style={{
                        display: "block",
                        textAlign: "left",
                        marginBottom: 5,
                      }}
                    >
                      {t("Month")}
                    </label>
                    <input
                      style={{
                        width: "100%",
                        padding: "17px 7px",
                        borderRadius: "5px",
                        border: "2px solid #ddd",
                      }}
                      type="month"
                      value={smsMonth}
                      onChange={(e) => {
                        setSmsMonth(e.target.value);
                        setSmsYear("");
                        setSmsWeek("");
                      }}
                    />
                  </Box>
                  <Box sx={{ width: "100%", mt: "-15px" }}>
                    <label
                      style={{
                        display: "block",
                        textAlign: "left",
                        marginBottom: 5,
                      }}
                    >
                      {t("Week")}
                    </label>
                    <input
                      style={{
                        width: "100%",
                        padding: "17px 7px",
                        borderRadius: "5px",
                        border: "2px solid #ddd",
                      }}
                      type="date"
                      value={smsWeek}
                      onChange={(e) => {
                        setSmsWeek(e.target.value);
                        setSmsMonth("");
                        setSmsYear("");
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Box>

      <Box>
        {statistics === "GENDER" && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 10,
              border: "2px solid #ddd",
              borderRadius: "4px",
              width: "50%",
              mx: "auto",
              p: 5,
            }}
          >
            {genderData && genderData.length > 0 ? (
              <PieChart width={800} height={200}>
                <Legend
                  height={36}
                  iconType="circle"
                  layout="vertical"
                  verticalAlign="middle"
                  iconSize={10}
                  padding={5}
                />
                <Pie
                  data={genderData}
                  cx="200"
                  cy="100"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={150}
                  paddingAngle={0}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {genderData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            ) : (
              <p style={{ marginTop: "150px" }}>
                {t("No data available for the selected period")}.
              </p>
            )}
          </Box>
        )}
        {statistics === "AGE" && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 10,
              border: "2px solid #ddd",
              borderRadius: "4px",
              width: "50%",
              mx: "auto",
              p: 5,
            }}
          >
            {ageData.length > 0 ? (
              <BarChart width={800} height={400} data={ageData}>
                <Bar fill="#8884d8" dataKey="value" />
                <XAxis dataKey="name" />
                <YAxis />
                {/* <Tooltip /> */}
              </BarChart>
            ) : (
              <p style={{ marginTop: "150px" }}>
                {t("No data available for the selected period")}.
              </p>
            )}
          </Box>
        )}
        {statistics === "SMS" && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 10,
              border: "2px solid #ddd",
              borderRadius: "4px",
              width: "50%",
              mx: "auto",
              p: 5,
            }}
          >
            {smsData.length > 0 ? (
              <BarChart width={800} height={400} data={smsData}>
                <Bar fill="#8884d8" dataKey="value" />
                <XAxis dataKey="name" />
                <YAxis />
                {/* <Tooltip /> */}
              </BarChart>
            ) : (
              <p style={{ marginTop: "150px" }}>
                {t("No data available for the selected period")}.
              </p>
            )}
          </Box>
        )}
      </Box>
    </>
  );
};

export default Statistics;
