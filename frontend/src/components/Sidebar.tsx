import {
  LayoutDashboard,
  PlusCircle,
  Receipt,

} from "lucide-react";

import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Add Expense",
      path: "/addexpense",
      icon: <PlusCircle size={20} />,
    },
    {
      name: "Transactions",
      path: "/expenses",
      icon: <Receipt size={20} />,
    }
  ];

  return (
    <aside className="w-64 min-h-screen bg-slate-950 text-white flex flex-col border-r border-slate-800">

      {/* Logo */}

      <div className="p-6 border-b border-slate-800">
        <h1 className="text-3xl font-bold text-violet-400">
          SmartSpend
        </h1>

        <p className="text-slate-400 text-sm mt-1">
          AI Expense Tracker
        </p>
      </div>

      {/* Navigation */}

      <nav className="flex-1 p-4">

        <ul className="space-y-2">

          {menuItems.map((item) => (
            <li key={item.name}>

              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                  ${
                    isActive
                      ? "bg-violet-600 text-white"
                      : "text-slate-300 hover:bg-slate-800"
                  }`
                }
              >
                {item.icon}

                <span>{item.name}</span>
              </NavLink>

            </li>
          ))}

        </ul>
      </nav>

      
    </aside>
  );
};

export default Sidebar;