import { Link } from 'react-router-dom';

export default function Home({ isLoggedIn, setIsLoggedIn }) {
  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  return (
    <div className="bg-black text-white">
      {/* Navbar */}
      <nav className="bg-gray-900/50 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              MyApp
            </Link>
            
            <div className="flex gap-4">
              {!isLoggedIn ?
              <div>
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-gray-300 hover:text-primary-400 transition-colors"
                >
                  Đăng nhập
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg text-black"
                >
                  Đăng ký
                </Link>
              </div> :
              <Link 
                to="/" 
                className="px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors text-black"
                onClick = {handleLogout}
              >
                Đăng xuất
              </Link>
  }
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="flex items-center justify-center" style={{height: 'calc(100vh - 64px)'}}>
        <div className="text-center">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent mb-4">
            Hello World
          </h1>
          <p className="text-gray-400 text-xl">
            Welcome to our application
          </p>
        </div>
      </div>
    </div>
  );
}