import styles from "./Layout.module.css";
import Chatbot from "../Chatbot";

const Layout = ({ children, loggedIn }) => {
  return (
    <main className={styles.layout}>
      {children}
      {loggedIn && <Chatbot />} {/*Show chatbot only after login */}
    </main>
  );
};

export default Layout;
