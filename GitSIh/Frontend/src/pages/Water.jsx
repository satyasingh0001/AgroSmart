import Card from "../components/Card/Card";
import styles from "./styles/Water.module.css";

const Water = () => {
  return (
    <div className={styles.water}>
      <Card title="Water Tank Level">
        <p>65% Full</p>
      </Card>
      <Card title="Water Usage Today">
        <p>120 L</p>
      </Card>
      <Card title="Average Daily Usage">
        <p>100 L</p>
      </Card>
    </div>
  );
};

export default Water;
