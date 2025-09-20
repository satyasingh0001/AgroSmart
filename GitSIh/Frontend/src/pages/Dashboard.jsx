import Card from "../components/Card/Card";
import styles from "./styles/Dashboard.module.css";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { time: "6AM", temp: 15, humidity: 80 },
  { time: "9AM", temp: 20, humidity: 70 },
  { time: "12PM", temp: 25, humidity: 60 },
  { time: "3PM", temp: 23, humidity: 65 },
  { time: "6PM", temp: 18, humidity: 75 },
];

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <Card title="Temperature & Humidity">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="temp" stroke="#00796b" />
            <Line type="monotone" dataKey="humidity" stroke="#ff5722" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <div className={styles.grid}>
        <Card title="Soil Moisture">45%</Card>
        <Card title="Rainfall Prediction">Low Chance</Card>
        <Card title="Wind Speed">12 km/h</Card>
      </div>
    </div>
  );
};

export default Dashboard;
