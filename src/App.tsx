import { useEffect, useState } from "react";
import NavCard from "./components/Layout/NavCard";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className="min-h-screen h-full w-full overflow-auto bg-cover bg-center bg-no-repeat bg-background-light dark:bg-background-dark bg-[url('./assets/images/background.png')]"
    >
      <div className="min-h-full flex justify-center items-center"> 
        <NavCard isDarkTheme={isDarkMode} onThemeChange={toggleTheme} />
      </div>
    </div>
  );
}

export default App;
