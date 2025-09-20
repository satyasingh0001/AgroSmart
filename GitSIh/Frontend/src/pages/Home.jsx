import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import styles from "./styles/Home.module.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const navigate = useNavigate();

  const images = [
    "/images/farm1.jpg",
    "/images/farm2.jpg",
    "/images/farm3.jpg",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className={styles.home}>
      <div className={styles.hero}>
        <Slider {...settings}>
          {images.map((img, idx) => (
            <div key={idx} className={styles.slide}>
              <img src={img} alt={`Slide ${idx}`} className={styles.image} />
              <div className={styles.overlay}>
                <h1>Welcome to AgroSmart</h1>
                <p>Smart Agriculture for Hilly Regions</p>
                <button
                  className={styles.cta}
                  onClick={() => navigate("/login")}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <section className={styles.features}>
        <div className={styles.card}>
          <h3>Smart Irrigation</h3>
          <p>Optimize water usage with automated irrigation systems.</p>
        </div>
        <div className={styles.card}>
          <h3>Crop Monitoring</h3>
          <p>Track crop growth, soil conditions, and weather patterns.</p>
        </div>
        <div className={styles.card}>
          <h3>Alerts & Notifications</h3>
          <p>Stay updated with real-time alerts and reports.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
