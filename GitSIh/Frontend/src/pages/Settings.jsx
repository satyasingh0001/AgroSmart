import Card from "../components/Card/Card";
import Button from "../components/Button/Button";
import styles from "./styles/Settings.module.css";

const Settings = () => {
  return (
    <div className={styles.settings}>
      <Card title="Profile Settings">
        <p>Update your information and preferences here.</p>
        <Button onClick={() => alert("Profile updated")}>Save</Button>
      </Card>
      <Card title="System Preferences">
        <p>Manage notifications and system behavior.</p>
        <Button onClick={() => alert("Preferences saved")}>Save</Button>
      </Card>
    </div>
  );
};

export default Settings;
