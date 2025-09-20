import styles from "./Card.module.css";

const Card = ({ title, children }) => (
  <div className={styles.card}>
    <h3>{title}</h3>
    <div>{children}</div>
  </div>
);

export default Card;
