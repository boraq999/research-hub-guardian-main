
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const monthlyData = [
  { month: 'يناير', masters: 45, phd: 20 },
  { month: 'فبراير', masters: 52, phd: 25 },
  { month: 'مارس', masters: 48, phd: 22 },
  { month: 'أبريل', masters: 61, phd: 30 },
  { month: 'مايو', masters: 55, phd: 28 },
  { month: 'يونيو', masters: 67, phd: 35 },
];

const departmentData = [
  { name: 'علوم الحاسوب', value: 35, color: '#3b82f6' },
  { name: 'الهندسة', value: 25, color: '#10b981' },
  { name: 'الطب', value: 20, color: '#f59e0b' },
  { name: 'إدارة الأعمال', value: 15, color: '#ef4444' },
  { name: 'أخرى', value: 5, color: '#8b5cf6' },
];

export function ThesesChart() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="research-card">
        <CardHeader>
          <CardTitle className="text-right">توزيع الرسائل الشهري</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="masters" fill="#3b82f6" name="ماجستير" />
              <Bar dataKey="phd" fill="#10b981" name="دكتوراه" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="research-card">
        <CardHeader>
          <CardTitle className="text-right">توزيع الرسائل حسب القسم</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={departmentData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {departmentData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm">{item.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
