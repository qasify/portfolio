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
      className="bg-background-light dark:bg-background-dark w-full h-full flex flex-col gap-4 bg-[url('./assets/images/background.png')]"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="h-[60%] mx-0 md:mx-[3%] lg:mx-[6%] md:my-[8%]"
        style={{
          position: "relative",
        }}
      >
        <NavCard isDarkTheme={isDarkMode} onThemeChange={toggleTheme} />
      </div>
    </div>
  );
}

export default App;
