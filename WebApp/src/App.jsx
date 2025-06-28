import './App.css';
import Header from './Header.jsx';

function App() {
  return (
    <>
      <Header />
      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold">Welcome to the POS System</h1>
        <p className="text-lg mt-4">Please log in or register to continue.</p>
      </div>
    </>
  );
}

export default App;
