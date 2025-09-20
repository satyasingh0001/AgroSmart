import Card from "../components/Card/Card";
import Button from "../components/Button/Button";
import styles from "./styles/Crops.module.css";

const Crops = () => {
  const crops = [
    { name: "Rice", status: "Healthy" },
    { name: "Corn", status: "Needs Water" },
    { name: "Potato", status: "Healthy" },
  ];

  return (
    <div className={styles.crops}>
      {crops.map((c, idx) => (
        <Card key={idx} title={c.name}>
          <p>Status: {c.status}</p>
          <Button onClick={() => alert(`Viewing ${c.name}`)}>View</Button>
        </Card>
      ))}
    </div>
  );
};

export default Crops;
