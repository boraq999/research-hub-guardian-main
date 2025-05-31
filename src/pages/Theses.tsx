import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Download,
  Calendar,
  User,
  GraduationCap,
  Building
} from 'lucide-react';

export default function Theses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDegree, setSelectedDegree] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [theses, setTheses] = useState([]);

  useEffect(() => {
    // تعديل fetch لجلب الرسائل من API حقيقي
    fetch('http://localhost:5000/api/theses')
      .then((res) => res.json())
      .then((data) => setTheses(data));
  }, []);

  const filteredTheses = theses.filter(thesis => {
    return (
      thesis.title.includes(searchTerm) ||
      thesis.author.includes(searchTerm) ||
      thesis.department.includes(searchTerm)
    ) &&
    (selectedDegree === '' || selectedDegree === 'all' || thesis.degree === selectedDegree) &&
    (selectedUniversity === '' || selectedUniversity === 'all' || thesis.university === selectedUniversity) &&
    (selectedYear === '' || selectedYear === 'all' || thesis.year.toString() === selectedYear);
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-right">عرض الرسائل</h1>
          <p className="text-muted-foreground text-right">
            إدارة وعرض جميع الرسائل البحثية في النظام
          </p>
        </div>
      </div>

      {/* فلاتر البحث */}
      <Card className="research-card">
        <CardHeader>
          <CardTitle className="text-right flex items-center gap-2">
            <Filter className="w-5 h-5" />
            فلاتر البحث
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="البحث في العنوان أو الباحث أو القسم..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 text-right"
              />
            </div>
            <Select value={selectedDegree} onValueChange={setSelectedDegree}>
              <SelectTrigger>
                <SelectValue placeholder="الدرجة العلمية" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الدرجات</SelectItem>
                <SelectItem value="ماجستير">ماجستير</SelectItem>
                <SelectItem value="دكتوراه">دكتوراه</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
              <SelectTrigger>
                <SelectValue placeholder="الجامعة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الجامعات</SelectItem>
                <SelectItem value="جامعة الملك سعود">جامعة الملك سعود</SelectItem>
                <SelectItem value="جامعة الملك عبدالعزيز">جامعة الملك عبدالعزيز</SelectItem>
                <SelectItem value="جامعة الإمام محمد بن سعود">جامعة الإمام محمد بن سعود</SelectItem>
                <SelectItem value="جامعة الملك خالد">جامعة الملك خالد</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger>
                <SelectValue placeholder="السنة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع السنوات</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* عرض النتائج */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          عرض {filteredTheses.length} رسالة من أصل {theses.length}
        </p>
        <Button className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          تصدير البيانات
        </Button>
      </div>

      {/* قائمة الرسائل */}
      <div className="space-y-4">
        {filteredTheses.map((thesis) => (
          <Card key={thesis.id} className="research-card hover:scale-[1.02] transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 text-right">
                  <h3 className="font-bold text-xl mb-3 leading-relaxed">{thesis.title}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="w-4 h-4" />
                      <span className="font-medium">الباحث:</span>
                      <span>{thesis.author}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">تاريخ المناقشة:</span>
                      <span>{new Date(thesis.date).toLocaleDateString('ar-SA')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Building className="w-4 h-4" />
                      <span className="font-medium">الجامعة:</span>
                      <span>{thesis.university}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <GraduationCap className="w-4 h-4" />
                      <span className="font-medium">الكلية:</span>
                      <span>{thesis.college}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 flex-wrap mb-4">
                    <Badge variant={thesis.degree === 'دكتوراه' ? 'default' : 'secondary'} className="text-sm px-3 py-1">
                      {thesis.degree}
                    </Badge>
                    <Badge variant="outline" className="text-sm px-3 py-1">
                      {thesis.department}
                    </Badge>
                    <Badge variant="outline" className="text-sm px-3 py-1">
                      {thesis.year}
                    </Badge>
                    <Badge 
                      variant={thesis.status === 'مكتملة' ? 'default' : 'secondary'}
                      className="text-sm px-3 py-1"
                    >
                      {thesis.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Button size="sm" variant="outline" className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    عرض
                  </Button>
                  <Button size="sm" variant="outline" className="flex items-center gap-2">
                    <Edit className="w-4 h-4" />
                    تعديل
                  </Button>
                  <Button size="sm" variant="outline" className="flex items-center gap-2 text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                    حذف
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
