
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
  Building,
  MapPin,
  Calendar,
  Users,
  BookOpen
} from 'lucide-react';

const mockUniversities = [
  {
    id: 1,
    name: 'جامعة الملك سعود',
    location: 'الرياض',
    established: 1957,
    website: 'https://ksu.edu.sa',
    collegesCount: 21,
    thesesCount: 156,
    colleges: [
      'كلية علوم الحاسوب والمعلومات',
      'كلية الطب',
      'كلية الهندسة',
      'كلية التربية',
      'كلية الآداب'
    ]
  },
  {
    id: 2,
    name: 'جامعة الملك عبدالعزيز',
    location: 'جدة',
    established: 1967,
    website: 'https://kau.edu.sa',
    collegesCount: 24,
    thesesCount: 134,
    colleges: [
      'كلية الطب',
      'كلية الهندسة',
      'كلية الاقتصاد والإدارة',
      'كلية العلوم',
      'كلية الآداب والعلوم الإنسانية'
    ]
  },
  {
    id: 3,
    name: 'جامعة الإمام محمد بن سعود الإسلامية',
    location: 'الرياض',
    established: 1953,
    website: 'https://imamu.edu.sa',
    collegesCount: 13,
    thesesCount: 89,
    colleges: [
      'كلية الشريعة',
      'كلية اللغة العربية',
      'كلية أصول الدين',
      'كلية العلوم الاجتماعية',
      'كلية الاقتصاد والعلوم الإدارية'
    ]
  },
  {
    id: 4,
    name: 'جامعة الملك خالد',
    location: 'أبها',
    established: 1998,
    website: 'https://kku.edu.sa',
    collegesCount: 18,
    thesesCount: 76,
    colleges: [
      'كلية التربية',
      'كلية الطب',
      'كلية الهندسة',
      'كلية العلوم',
      'كلية الشريعة وأصول الدين'
    ]
  },
  {
    id: 5,
    name: 'جامعة الملك فهد للبترول والمعادن',
    location: 'الظهران',
    established: 1963,
    website: 'https://kfupm.edu.sa',
    collegesCount: 7,
    thesesCount: 92,
    colleges: [
      'كلية الهندسة',
      'كلية العلوم',
      'كلية علوم الحاسب والمعلومات',
      'كلية إدارة الأعمال',
      'كلية التصاميم البيئية'
    ]
  }
];

export default function Universities() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState(null);

  const filteredUniversities = mockUniversities.filter(uni =>
    uni.name.includes(searchTerm) ||
    uni.location.includes(searchTerm) ||
    uni.colleges.some(college => college.includes(searchTerm))
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-right">الجامعات والكليات</h1>
          <p className="text-muted-foreground text-right">
            إدارة وعرض جميع الجامعات والكليات في النظام
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          إضافة جامعة جديدة
        </Button>
      </div>

      {/* البحث */}
      <Card className="research-card">
        <CardContent className="p-4">
          <div className="relative max-w-md">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="البحث في الجامعات والكليات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 text-right"
            />
          </div>
        </CardContent>
      </Card>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="research-card">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-primary">{mockUniversities.length}</div>
            <p className="text-sm text-muted-foreground">إجمالي الجامعات</p>
          </CardContent>
        </Card>
        <Card className="research-card">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600">
              {mockUniversities.reduce((sum, uni) => sum + uni.collegesCount, 0)}
            </div>
            <p className="text-sm text-muted-foreground">إجمالي الكليات</p>
          </CardContent>
        </Card>
        <Card className="research-card">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {mockUniversities.reduce((sum, uni) => sum + uni.thesesCount, 0)}
            </div>
            <p className="text-sm text-muted-foreground">إجمالي الرسائل</p>
          </CardContent>
        </Card>
        <Card className="research-card">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(mockUniversities.reduce((sum, uni) => sum + uni.established, 0) / mockUniversities.length)}
            </div>
            <p className="text-sm text-muted-foreground">متوسط سنة التأسيس</p>
          </CardContent>
        </Card>
      </div>

      {/* قائمة الجامعات */}
      <div className="space-y-6">
        {filteredUniversities.map((university) => (
          <Card key={university.id} className="research-card hover:scale-[1.01] transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="text-right flex-1">
                  <CardTitle className="text-2xl mb-2">{university.name}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {university.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      تأسست عام {university.established}
                    </div>
                  </div>
                </div>
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
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* إحصائيات الجامعة */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-right">الإحصائيات</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-blue-600" />
                        <span className="font-bold text-blue-600">{university.collegesCount}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">كلية</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-green-600" />
                        <span className="font-bold text-green-600">{university.thesesCount}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">رسالة</span>
                    </div>
                  </div>
                </div>

                {/* قائمة الكليات */}
                <div className="lg:col-span-2 space-y-4">
                  <h4 className="font-semibold text-right">الكليات التابعة</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {university.colleges.map((college, index) => (
                      <div key={index} className="p-3 border rounded-lg bg-background/50">
                        <div className="text-sm text-right">{college}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <Button variant="outline" size="sm">
                    عرض تفاصيل أكثر
                  </Button>
                  <a 
                    href={university.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    الموقع الرسمي
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
