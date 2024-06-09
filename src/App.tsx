import { useEffect, useState } from "react";
import { UISwitch } from "./components";

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
    <div className="w-full h-full flex flex-col p-16 gap-4">
      <UISwitch
        label="Dark Theme"
        checked={isDarkMode}
        onChange={toggleTheme}
      />
      <div className="bg-orange-1 dark:bg-yellow-1">Home</div>
    </div>
  );
}

export default App;
