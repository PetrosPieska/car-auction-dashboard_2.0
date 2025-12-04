import { Routes, Route, Navigate, Link, NavLink } from "react-router-dom";
import { CarsListPage } from "./features/cars/pages/CarListPage";
import { CarDetailPage } from "./features/cars/pages/CarDetailPage";
import { DashboardPage } from "./features/dashboard/pages/DashboardPage";

function App() {
  return (
    <div className="min-h-screen bg-bg-main text-gray-100">
      <header className="border-b border-gray-800 bg-bg-main/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-accent flex items-center justify-center font-bold">
              A
            </div>
            <span className="font-semibold tracking-tight">
              Car Auction Dashboard
            </span>
          </Link>
          <nav className="flex gap-4 text-xs">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-accent" : "text-gray-300 hover:text-accent"
              }
              end
            >
              Cars
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "text-accent" : "text-gray-300 hover:text-accent"
              }
            >
              Dashboard
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<CarsListPage />} />
          <Route path="/cars/:id" element={<CarDetailPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
