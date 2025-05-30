
import React from 'react';
import { StatsCards } from '@/components/StatsCards';
import { ThesesChart } from '@/components/ThesesChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User } from 'lucide-react';

const recentTheses = [
  {
    title: 'تطوير نظام ذكي لإدارة المعرفة في المؤسسات التعليمية',
    author: 'د. أحمد محمد علي',
    department: 'علوم الحاسوب',
    degree: 'دكتوراه',
    date: '2024-01-15',
    university: 'جامعة الملك سعود'
  },
  {
    title: 'استخدام الذكاء الاصطناعي في التشخيص الطبي',
    author: 'سارة أحمد الزهراني',
    department: 'الطب',
    degree: 'ماجستير',
    date: '2024-01-10',
    university: 'جامعة الملك عبدالعزيز'
  },
  {
    title: 'تحليل الأسواق المالية باستخدام التعلم العميق',
    author: 'محمد عبدالله القحطاني',
    department: 'إدارة الأعمال',
    degree: 'ماجستير',
    date: '2024-01-08',
    university: 'جامعة الإمام محمد بن سعود'
  }
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-right">لوحة التحكم</h1>
          <p className="text-muted-foreground text-right">
            مرحباً بك في نظام إدارة الرسائل البحثية
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          {new Date().toLocaleDateString('ar-SA')}
        </div>
      </div>

      <StatsCards />
      
      <ThesesChart />

      <Card className="research-card">
        <CardHeader>
          <CardTitle className="text-right">الرسائل المضافة حديثاً</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTheses.map((thesis, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 text-right">
                    <h3 className="font-semibold text-lg mb-2">{thesis.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {thesis.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {new Date(thesis.date).toLocaleDateString('ar-SA')}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Badge variant={thesis.degree === 'دكتوراه' ? 'default' : 'secondary'}>
                        {thesis.degree}
                      </Badge>
                      <span>{thesis.department}</span>
                      <span>•</span>
                      <span>{thesis.university}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
