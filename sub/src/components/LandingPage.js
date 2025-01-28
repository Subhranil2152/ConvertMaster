import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../CSS/LandingPage.css";
 
function LandingPage(){
  const navigate = useNavigate();
 
  return (
    <div className="page-container">
      <header className="header">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          QC Data Board
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        Lab data into intelligence  with ease and precision.
        </motion.p>
        {/* <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="cta-button"
          onClick={handleExploreNow}
        >
          Explore Now
        </motion.button> */}
      </header>
      <section className="features-section">
                <motion.div
                    className="feature-card"
                    initial={{
                        x: -50,
                        opacity: 0
                    }}
                    animate={{
                        x: 0,
                        opacity: 1
                    }}
                    transition={{
                        delay: 0.5,
                        duration: 0.8
                    }}>
                    <h3>Data Visualization</h3>
                    <p>
                        <a href="http://localhost:3000/instrument-selection" className="text-blue-700 underline">Explore Now</a>
                    </p>
                </motion.div>
                <motion.div
                    className="feature-card"
                    initial={{
                        x: 50,
                        opacity: 0
                    }}
                    animate={{
                        x: 0,
                        opacity: 1
                    }}
                    transition={{
                        delay: 0.9,
                        duration: 0.8
                    }}>
                    <h3>LifeOps on GenAI</h3>
                    <p>
                    <a href="https://lab-sops-les-eln-ui-awbscaeeeqfkgbg3.eastus-01.azurewebsites.net/" className="text-blue-700 underline">ELN-LES Master Data Builder</a> 
                    </p>
                    <p>
                    <a href="https://stabilityreport-ui.azurewebsites.net/" className="text-blue-700 underline">Stability App</a> 
                    </p>
                </motion.div>
            </section>
            <footer className="footer">
                <p>&copy; 2024 LIMS Comparison Dashboard. All Rights Reserved.</p>
            </footer>
        </div>
  );
};
 
export default LandingPage;