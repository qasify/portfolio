const MenuExpander: React.FC = () => {
  const itemStyle =
    "block h-[3px] bg-gray-2 transition-all duration-300 ease-in-out group-hover:bg-primary-light rounded-full";
  return (
    <div className="flex flex-col items-start justify-center hover:cursor-pointer group">
      <span className={`${itemStyle} w-5 mb-1 group-hover:w-6`}></span>
      <span className={`${itemStyle} w-6 mb-1`}></span>
      <span className={`${itemStyle} w-4 group-hover:w-6`}></span>
    </div>
  );
};

export default MenuExpander;
