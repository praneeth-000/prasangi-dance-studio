import { Users, AlertTriangle, UserCheck, UserX } from "lucide-react";

const Dashboard = () => {

  const stats = [
    {
      title: "Total Students",
      value: 1,
      icon: Users,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Active Students",
      value: 1,
      icon: UserCheck,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Expiring Soon",
      value: 0,
      icon: AlertTriangle,
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      title: "Expired",
      value: 0,
      icon: UserX,
      color: "bg-red-100 text-red-600"
    }
  ];

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Overview of your studio performance
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {stats.map((stat, index) => {

          const Icon = stat.icon;

          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border p-6 flex items-center justify-between"
            >

              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <h2 className="text-2xl font-bold mt-1">{stat.value}</h2>
              </div>

              <div className={`p-3 rounded-lg ${stat.color}`}>
                <Icon size={22} />
              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
};

export default Dashboard;