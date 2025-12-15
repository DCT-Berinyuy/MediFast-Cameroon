import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
      <div className="text-center p-8 rounded-2xl bg-white shadow-xl max-w-md mx-4">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="text-red-500" size={40} />
        </div>
        <h1 className="text-6xl font-bold mb-4 text-green-600">404</h1>
        <p className="text-xl text-gray-700 mb-2">Page non trouvée</p>
        <p className="text-gray-500 mb-6">Page not found</p>
        <Link to="/" className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition">
          <Home size={20} /> Retour / Home
        </Link>
        <div className="mt-6 pt-6 border-t">
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-green-700 font-semibold">MboaMed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
