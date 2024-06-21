import { Navigate, useLocation } from "react-router-dom";
import useAuth from './../Hooks/useAuth';



const PrivateRoute = ({children}) => {
    const { user, loading } = useAuth(); 
    const location = useLocation(); 

    if (loading) {
      
      return <div className="flex items-center my-4 justify-center w-full  space-x-2">
     
      <div className="py-4 rounded shadow-md w-full  animate-pulse dark:bg-gray-50">
	<div className="flex p-4 space-x-4 sm:px-8">
		<div className="flex-shrink-0 w-16 h-16 rounded-full dark:bg-gray-300"></div>
		<div className="flex-1 py-2 space-y-4">
			<div className="w-full h-3 rounded dark:bg-gray-300"></div>
			<div className="w-5/6 h-3 rounded dark:bg-gray-300"></div>
		</div>
	</div>
	<div className="p-4  space-y-4 sm:px-8">
		<div className="w-full h-4 rounded dark:bg-gray-300"></div>
		<div className="w-full h-4 rounded dark:bg-gray-300"></div>
		<div className="w-3/4 h-4 rounded dark:bg-gray-300"></div>
		<div className="w-full h-4 rounded dark:bg-gray-300"></div>
		<div className="w-full h-4 rounded dark:bg-gray-300"></div>
		<div className="w-full h-4 rounded dark:bg-gray-300"></div>
		<div className="w-full h-4 rounded dark:bg-gray-300"></div>
		<div className="flex-1 py-2 space-y-4">
			<div className="w-full h-3 rounded dark:bg-gray-300"></div>
			<div className="w-5/6 h-3 rounded dark:bg-gray-300"></div>
		</div>
		
	</div>
	<div className="flex-shrink-0  w-16 h-16 rounded-full mx-10 dark:bg-gray-300"></div>
		<div className="flex-1 p-8 space-y-4">
			<div className="w-full h-3 rounded dark:bg-gray-300"></div>
			<div className="w-5/6 h-3 rounded dark:bg-gray-300"></div>
		</div>
	
	<div className="p-4 space-y-4 sm:px-8">
	<div className="w-full h-4 rounded dark:bg-gray-300"></div>
		<div className="w-full h-4 rounded dark:bg-gray-300"></div>
		<div className="w-3/4 h-4 rounded dark:bg-gray-300"></div>
		<div className="w-full h-4 rounded dark:bg-gray-300"></div>
		<div className="w-full h-4 rounded dark:bg-gray-300"></div>
		<div className="w-full h-4 rounded dark:bg-gray-300"></div>
		<div className="w-full h-4 rounded dark:bg-gray-300"></div>

	</div>
</div>
    </div>
    }
    
    if (!user) {
   
      return <Navigate to="/login" state={{ from: location }} />;
    }
    
    
    return <>{children}</>;
}

export default PrivateRoute;