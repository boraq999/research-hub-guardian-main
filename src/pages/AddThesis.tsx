
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Save, 
  Upload, 
  Calendar,
  User,
  BookOpen,
  Building,
  GraduationCap
} from 'lucide-react';

export default function AddThesis() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    degree: '',
    department: '',
    university: '',
    college: '',
    year: new Date().getFullYear(),
    date: '',
    supervisor: '',
    abstract: '',
    keywords: '',
    status: 'قيد الإعداد'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // هنا يتم إرسال البيانات إلى الخادم
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-right">إضافة رسالة جديدة</h1>
          <p className="text-muted-foreground text-right">
            إضافة رسالة بحثية جديدة إلى النظام
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* المعلومات الأساسية */}
        <Card className="research-card">
          <CardHeader>
            <CardTitle className="text-right flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              المعلومات الأساسية
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-right block">عنوان الرسالة *</Label>
                <Textarea
                  id="title"
                  placeholder="أدخل عنوان الرسالة..."
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="text-right min-h-[100px]"
                  required
                />
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="author" className="text-right block">اسم الباحث *</Label>
                  <Input
                    id="author"
                    placeholder="أدخل اسم الباحث..."
                    value={formData.author}
                    onChange={(e) => handleInputChange('author', e.target.value)}
                    className="text-right"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="supervisor" className="text-right block">المشرف الرئيسي</Label>
                  <Input
                    id="supervisor"
                    placeholder="أدخل اسم المشرف..."
                    value={formData.supervisor}
                    onChange={(e) => handleInputChange('supervisor', e.target.value)}
                    className="text-right"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* معلومات الدرجة العلمية والقسم */}
        <Card className="research-card">
          <CardHeader>
            <CardTitle className="text-right flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              الدرجة العلمية والتخصص
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-right block">الدرجة العلمية *</Label>
                <Select value={formData.degree} onValueChange={(value) => handleInputChange('degree', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الدرجة العلمية" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ماجستير">ماجستير</SelectItem>
                    <SelectItem value="دكتوراه">دكتوراه</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label className="text-right block">القسم *</Label>
                <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر القسم" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="علوم الحاسوب">علوم الحاسوب</SelectItem>
                    <SelectItem value="الطب">الطب</SelectItem>
                    <SelectItem value="إدارة الأعمال">إدارة الأعمال</SelectItem>
                    <SelectItem value="تقنيات التعليم">تقنيات التعليم</SelectItem>
                    <SelectItem value="المناهج وطرق التدريس">المناهج وطرق التدريس</SelectItem>
                    <SelectItem value="الهندسة المدنية">الهندسة المدنية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label className="text-right block">السنة *</Label>
                <Input
                  type="number"
                  min="2000"
                  max="2030"
                  value={formData.year}
                  onChange={(e) => handleInputChange('year', parseInt(e.target.value))}
                  className="text-right"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* معلومات الجامعة والكلية */}
        <Card className="research-card">
          <CardHeader>
            <CardTitle className="text-right flex items-center gap-2">
              <Building className="w-5 h-5" />
              الجامعة والكلية
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-right block">الجامعة *</Label>
                <Select value={formData.university} onValueChange={(value) => handleInputChange('university', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الجامعة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="جامعة الملك سعود">جامعة الملك سعود</SelectItem>
                    <SelectItem value="جامعة الملك عبدالعزيز">جامعة الملك عبدالعزيز</SelectItem>
                    <SelectItem value="جامعة الإمام محمد بن سعود">جامعة الإمام محمد بن سعود</SelectItem>
                    <SelectItem value="جامعة الملك خالد">جامعة الملك خالد</SelectItem>
                    <SelectItem value="جامعة الملك فهد للبترول والمعادن">جامعة الملك فهد للبترول والمعادن</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="college" className="text-right block">الكلية *</Label>
                <Input
                  id="college"
                  placeholder="أدخل اسم الكلية..."
                  value={formData.college}
                  onChange={(e) => handleInputChange('college', e.target.value)}
                  className="text-right"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* التواريخ والحالة */}
        <Card className="research-card">
          <CardHeader>
            <CardTitle className="text-right flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              التواريخ والحالة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-right block">تاريخ المناقشة</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="text-right"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-right block">حالة الرسالة</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="قيد الإعداد">قيد الإعداد</SelectItem>
                    <SelectItem value="قيد المراجعة">قيد المراجعة</SelectItem>
                    <SelectItem value="مكتملة">مكتملة</SelectItem>
                    <SelectItem value="مؤجلة">مؤجلة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* الملخص والكلمات المفتاحية */}
        <Card className="research-card">
          <CardHeader>
            <CardTitle className="text-right">الملخص والكلمات المفتاحية</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="abstract" className="text-right block">ملخص الرسالة</Label>
              <Textarea
                id="abstract"
                placeholder="أدخل ملخص الرسالة..."
                value={formData.abstract}
                onChange={(e) => handleInputChange('abstract', e.target.value)}
                className="text-right min-h-[120px]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="keywords" className="text-right block">الكلمات المفتاحية</Label>
              <Input
                id="keywords"
                placeholder="أدخل الكلمات المفتاحية مفصولة بفواصل..."
                value={formData.keywords}
                onChange={(e) => handleInputChange('keywords', e.target.value)}
                className="text-right"
              />
            </div>
          </CardContent>
        </Card>

        {/* أزرار الحفظ */}
        <div className="flex items-center justify-end gap-4">
          <Button type="button" variant="outline">
            إلغاء
          </Button>
          <Button type="submit" className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            حفظ الرسالة
          </Button>
        </div>
      </form>
    </div>
  );
}
