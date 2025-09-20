import Card from "../components/Card/Card";
import Button from "../components/Button/Button";
import styles from "./styles/Alerts.module.css";

const Alerts = () => {
  const alerts = [
    { message: "Low soil moisture detected in Zone 2" },
    { message: "High temperature in greenhouse" },
  ];

  return (
    <div className={styles.alerts}>
      {alerts.map((a, idx) => (
        <Card key={idx} title={`Alert ${idx + 1}`}>
          <p>{a.message}</p>
          <Button onClick={() => alert("Alert dismissed")}>Dismiss</Button>
        </Card>
      ))}
    </div>
  );
};

export default Alerts;
