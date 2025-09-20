import { useState } from "react";
import Card from "../components/Card/Card";
import Button from "../components/Button/Button";
import ToggleSwitch from "../components/ToggleSwitch/ToggleSwitch";
import styles from "./styles/Irrigation.module.css";

const Irrigation = () => {
  const [auto, setAuto] = useState(false);

  return (
    <div className={styles.irrigation}>
      <Card title="Irrigation Control">
        <div className={styles.controls}>
          <Button onClick={() => alert("Zone 1 Started")}>Start Zone 1</Button>
          <Button onClick={() => alert("Zone 2 Started")}>Start Zone 2</Button>
          <Button onClick={() => alert("Stop All")}>Stop</Button>
        </div>
        <div className={styles.toggle}>
          <span>Automatic Mode</span>
          <ToggleSwitch checked={auto} onChange={() => setAuto(!auto)} />
        </div>
      </Card>
    </div>
  );
};

export default Irrigation;
