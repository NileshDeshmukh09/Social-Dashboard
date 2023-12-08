
import '../App.css';
import Login from '../Pages/login';
import Dashboard from '../Pages/Dashboard';
import { createBrowserRouter , RouterProvider } from 'react-router-dom';






const  Body: React.FC =() => {
 

    const appRouter = createBrowserRouter([
        {
          path : "/",
          element : <Login/>
        },
        {
          path : "/dashboard",
          element : <Dashboard/>
        }
      ])

    
  return (
    <div className="App">
      <RouterProvider router={appRouter} /> 
    </div>
  );
}





export default Body;
