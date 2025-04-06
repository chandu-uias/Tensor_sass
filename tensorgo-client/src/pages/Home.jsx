const route=import.meta.env.VITE_REACT_APP_SERVER_DOMAIN 
console.log("Home ",route);
const Home = () => {
    return (
      <section className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold">Welcome to TensorGo</h1>
        <p className="text-lg text-gray-600 mt-4">Best SaaS platform for your needs.</p>
        <p> {route}</p>
        console.log("Home Page Loaded",import.meta.env.VITE_REACT_APP_SERVER_DOMAIN );
      </section>
    );
  };
  
  export default Home;
  