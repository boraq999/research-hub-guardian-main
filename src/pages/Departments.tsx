
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  BookOpen,
  Users,
  GraduationCap
} from 'lucide-react';

const mockDepartments = [
  {
    id: 1,
    name: 'علوم الحاسوب',
    description: 'قسم علوم الحاسوب والمعلومات يهتم بتطوير التقنيات الحديثة والبرمجيات',
    thesesCount: 45,
    researchersCount: 12,
    college: 'كلية علوم الحاسوب والمعلومات',
    established: 2010
  },
  {
    id: 2,
    name: 'الطب',
    description: 'قسم الطب يركز على البحوث الطبية والعلوم الصحية المتقدمة',
    thesesCount: 67,
    researchersCount: 23,
    college: 'كلية الطب',
    established: 1980
  },
  {
    id: 3,
    name: 'إدارة الأعمال',
    description: 'قسم إدارة الأعمال يهتم بدراسة الاقتصاد والإدارة والأسواق المالية',
    thesesCount: 34,
    researchersCount: 8,
    college: 'كلية الاقتصاد والعلوم الإدارية',
    established: 1985
  },
  {
    id: 4,
    name: 'تقنيات التعليم',
    description: 'قسم تقنيات التعليم يركز على تطوير طرق التدريس الحديثة والتعلم الإلكتروني',
    thesesCount: 28,
    researchersCount: 15,
    college: 'كلية التربية',
    established: 1995
  },
  {
    id: 5,
    name: 'المناهج وطرق التدريس',
    description: 'قسم المناهج وطرق التدريس يهتم بتطوير المناهج التعليمية والأساليب التربوية',
    thesesCount: 52,
    researchersCount: 18,
    college: 'كلية التربية',
    established: 1975
  },
  {
    id: 6,
    name: 'الهندسة المدنية',
    description: 'قسم الهندسة المدنية يركز على البحوث في البنية التحتية والعمارة المستدامة',
    thesesCount: 39,
    researchersCount: 14,
    college: 'كلية الهندسة',
    established: 1970
  }
];

export default function Departments() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDepartments = mockDepartments.filter(dept =>
    dept.name.includes(searchTerm) ||
    dept.description.includes(searchTerm) ||
    dept.college.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-right">الأقسام الأكاديمية</h1>
          <p className="text-muted-foreground text-right">
            إدارة وعرض جميع الأقسام الأكاديمية في النظام
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          إضافة قسم جديد
        </Button>
      </div>

      {/* البحث */}
      <Card className="research-card">
        <CardContent className="p-4">
          <div className="relative max-w-md">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="البحث في الأقسام..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 text-right"
            />
          </div>
        </CardContent>
      </Card>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="research-card">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-primary">{mockDepartments.length}</div>
            <p className="text-sm text-muted-foreground">إجمالي الأقسام</p>
          </CardContent>
        </Card>
        <Card className="research-card">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600">
              {mockDepartments.reduce((sum, dept) => sum + dept.thesesCount, 0)}
            </div>
            <p className="text-sm text-muted-foreground">إجمالي الرسائل</p>
          </CardContent>
        </Card>
        <Card className="research-card">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {mockDepartments.reduce((sum, dept) => sum + dept.researchersCount, 0)}
            </div>
            <p className="text-sm text-muted-foreground">إجمالي الباحثين</p>
          </CardContent>
        </Card>
      </div>

      {/* عرض النتائج */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          عرض {filteredDepartments.length} قسم من أصل {mockDepartments.length}
        </p>
      </div>

      {/* قائمة الأقسام */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDepartments.map((department) => (
          <Card key={department.id} className="research-card hover:scale-[1.02] transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-xl text-right">{department.name}</CardTitle>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-4 text-right leading-relaxed">
                {department.description}
              </p>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">الكلية:</span>
                  <Badge variant="outline">{department.college}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">تأسس عام:</span>
                  <Badge variant="outline">{department.established}</Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    <span className="text-lg font-bold text-blue-600">{department.thesesCount}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">رسالة</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Users className="w-4 h-4 text-green-600" />
                    <span className="text-lg font-bold text-green-600">{department.researchersCount}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">باحث</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
