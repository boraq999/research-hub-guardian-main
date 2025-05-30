
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BookOpen, 
  GraduationCap, 
  Award, 
  TrendingUp,
  Users,
  Building
} from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: React.ReactNode;
  color: string;
}

function StatCard({ title, value, change, icon, color }: StatCardProps) {
  return (
    <Card className="research-card hover:scale-105 transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-right">{title}</CardTitle>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-right">{value}</div>
        {change && (
          <p className="text-xs text-muted-foreground text-right mt-1">
            <span className="text-green-600">↗ {change}</span> من الشهر الماضي
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export function StatsCards() {
  const stats = [
    {
      title: 'إجمالي الرسائل',
      value: '1,245',
      change: '+12%',
      icon: <BookOpen className="w-5 h-5 text-white" />,
      color: 'bg-blue-500'
    },
    {
      title: 'رسائل الماجستير',
      value: '789',
      change: '+8%',
      icon: <GraduationCap className="w-5 h-5 text-white" />,
      color: 'bg-green-500'
    },
    {
      title: 'رسائل الدكتوراه',
      value: '456',
      change: '+15%',
      icon: <Award className="w-5 h-5 text-white" />,
      color: 'bg-purple-500'
    },
    {
      title: 'الباحثين',
      value: '892',
      change: '+5%',
      icon: <Users className="w-5 h-5 text-white" />,
      color: 'bg-orange-500'
    },
    {
      title: 'الجامعات',
      value: '45',
      change: '+2%',
      icon: <Building className="w-5 h-5 text-white" />,
      color: 'bg-red-500'
    },
    {
      title: 'النمو السنوي',
      value: '+23%',
      change: '+3%',
      icon: <TrendingUp className="w-5 h-5 text-white" />,
      color: 'bg-teal-500'
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
