import { useEffect, useState } from "react";
import io from "socket.io-client";
import Card from "../components/Card/Card";
import styles from "./styles/Sensors.module.css";

// Replace with your PC LAN IP
const LAN_IP = "172.16.20.240";
const socket = io(`http://${LAN_IP}:5000`);

const Sensors = () => {
  const [sensors, setSensors] = useState([]);
  const [commands, setCommands] = useState({ motor: "OFF", led: "OFF" });

  useEffect(() => {
    socket.on("sensorData", (data) => {
      setSensors([
        { name: "Temperature", value: data.Temperature + " °C" },
        { name: "Humidity", value: data.Humidity + " %" },
        { name: "Soil Moisture", value: data.Moisture + " %" },
        { name: "Water Level", value: data.WaterLevel },
      ]);
      setCommands(data.commands);
    });

    return () => socket.off("sensorData");
  }, []);

  const toggleDevice = async (device) => {
    const newState = commands[device] === "ON" ? "OFF" : "ON";

    await fetch(`http://${LAN_IP}:5000/api/control`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ device, state: newState }),
    });

    setCommands((prev) => ({ ...prev, [device]: newState }));
  };

  return (
    <div className={styles.sensors}>
      {sensors.map((s, idx) => (
        <Card key={idx} title={s.name}>
          <p>{s.value}</p>
        </Card>
      ))}

      <div className={styles.controls}>
        <button
          onClick={() => toggleDevice("motor")}
          className={`${styles.controlButton} ${
            commands.motor === "ON" ? styles.motorOn : styles.motorOff
          }`}
        >
          Motor: {commands.motor}
        </button>
        <button
          onClick={() => toggleDevice("led")}
          className={`${styles.controlButton} ${
            commands.led === "ON" ? styles.ledOn : styles.ledOff
          }`}
        >
          LED: {commands.led}
        </button>
      </div>
    </div>
  );
};

export default Sensors;
