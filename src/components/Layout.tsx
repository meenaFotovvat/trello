import { Link } from "react-router-dom";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-blue-600 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">Trello Clone</h1>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-white hover:text-gray-200">
                Home
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="text-white hover:text-gray-200">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main content area */}
      <main className="flex-grow container mx-auto p-6">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>
          &copy; {new Date().getFullYear()} Trello Clone. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Layout;
