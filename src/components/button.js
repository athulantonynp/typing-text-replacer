const Button = ({ text, onClick }) => {
  return (
    <button
      className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300
      text-white font-bold py-2 px-8 rounded-3xl cursor-pointer me-4"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
