import { useEffect, useState } from "react";
import { UISwitch } from "./components";
import NavCard from "./components/NavCard";

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
    <div className="bg-background-light dark:bg-background-dark w-full h-full flex flex-col gap-4 bg-[url('./assets/images/background.png')]"
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
      <UISwitch
        label=""
        checked={isDarkMode}
        onChange={toggleTheme}
      />
      {/* <div className="bg-orange-1 dark:bg-yellow-1">Home</div> */}
      <div className="h-84vh mx-0 md:mx-[3vh] lg:mx-[6vh] md:my-[8vw]"
        style={{
          position:'relative',
        }}>
        <NavCard />
      </div>
    </div>
  );
}

export default App;
