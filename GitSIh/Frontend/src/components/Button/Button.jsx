import styles from "./Button.module.css";

const Button = ({ children, onClick }) => (
  <button className={styles.btn} onClick={onClick}>
    {children}
  </button>
);

export default Button;
