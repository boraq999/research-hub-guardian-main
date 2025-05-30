
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Download, FileText } from 'lucide-react';

const sampleTheses = [
  {
    id: 1,
    title: 'تطوير نظام ذكي لإدارة المعرفة في المؤسسات التعليمية',
    author: 'د. أحمد محمد علي',
    department: 'علوم الحاسوب',
    degree: 'دكتوراه',
    year: '2024',
    university: 'جامعة الملك سعود',
    college: 'كلية علوم الحاسوب والمعلومات'
  },
  {
    id: 2,
    title: 'استخدام الذكاء الاصطناعي في التشخيص الطبي',
    author: 'سارة أحمد الزهراني',
    department: 'الطب',
    degree: 'ماجستير',
    year: '2023',
    university: 'جامعة الملك عبدالعزيز',
    college: 'كلية الطب'
  },
  {
    id: 3,
    title: 'تحليل الأسواق المالية باستخدام التعلم العميق',
    author: 'محمد عبدالله القحطاني',
    department: 'إدارة الأعمال',
    degree: 'ماجستير',
    year: '2024',
    university: 'جامعة الإمام محمد بن سعود',
    college: 'كلية إدارة الأعمال'
  }
];

export default function Analytics() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDegree, setSelectedDegree] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const filteredTheses = sampleTheses.filter(thesis => {
    return (
      thesis.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      thesis.author.toLowerCase().includes(searchTerm.toLowerCase())
    ) &&
    (selectedDegree === '' || thesis.degree === selectedDegree) &&
    (selectedYear === '' || thesis.year === selectedYear) &&
    (selectedDepartment === '' || thesis.department === selectedDepartment);
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-right">البحث عن الرسائل</h1>
        <Button className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          تصدير النتائج
        </Button>
      </div>

      <Card className="research-card">
        <CardHeader>
          <CardTitle className="text-right flex items-center gap-2">
            <Filter className="w-5 h-5" />
            البحث والفلترة
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="البحث في العنوان أو اسم الباحث..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 text-right"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={selectedDegree} onValueChange={setSelectedDegree}>
              <SelectTrigger>
                <SelectValue placeholder="الدرجة العلمية" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">جميع الدرجات</SelectItem>
                <SelectItem value="ماجستير">ماجستير</SelectItem>
                <SelectItem value="دكتوراه">دكتوراه</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger>
                <SelectValue placeholder="السنة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">جميع السنوات</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="القسم" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">جميع الأقسام</SelectItem>
                <SelectItem value="علوم الحاسوب">علوم الحاسوب</SelectItem>
                <SelectItem value="الطب">الطب</SelectItem>
                <SelectItem value="إدارة الأعمال">إدارة الأعمال</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="research-card">
        <CardHeader>
          <CardTitle className="text-right">
            نتائج البحث ({filteredTheses.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTheses.map((thesis) => (
              <div key={thesis.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <FileText className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex-1 text-right">
                    <h3 className="font-semibold text-lg mb-2">{thesis.title}</h3>
                    <p className="text-muted-foreground mb-2">الباحث: {thesis.author}</p>
                    <div className="flex items-center gap-2 justify-end">
                      <Badge variant={thesis.degree === 'دكتوراه' ? 'default' : 'secondary'}>
                        {thesis.degree}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{thesis.year}</span>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{thesis.department}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {thesis.university} - {thesis.college}
                    </p>
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
