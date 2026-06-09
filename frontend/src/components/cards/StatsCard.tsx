import React from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  iconBg?: string;
}

const StatsCard = ({
  title,
  value,
  subtitle,
  icon,
  iconBg = "bg-violet-600",
}: StatsCardProps) => {
  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 hover:border-violet-500 transition-all">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-slate-400 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-white mt-2">
            {value}
          </h2>

          {subtitle && (
            <p className="text-slate-400 text-sm mt-2">
              {subtitle}
            </p>
          )}
        </div>

        <div
          className={`${iconBg} w-14 h-14 rounded-2xl flex items-center justify-center text-white`}
        >
          {icon}
        </div>

      </div>
    </div>
  );
};

export default StatsCard;
