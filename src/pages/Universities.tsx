import React, { useState, useEffect } from 'react';
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

export default function Universities() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    fetch('/mock-data/universities.json')
      .then((res) => res.json())
      .then((data) => setUniversities(data));
  }, []);

  const filteredUniversities = universities.filter(uni =>
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
            <div className="text-2xl font-bold text-primary">{universities.length}</div>
            <p className="text-sm text-muted-foreground">إجمالي الجامعات</p>
          </CardContent>
        </Card>
        <Card className="research-card">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600">
              {universities.reduce((sum, uni) => sum + uni.collegesCount, 0)}
            </div>
            <p className="text-sm text-muted-foreground">إجمالي الكليات</p>
          </CardContent>
        </Card>
        <Card className="research-card">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {universities.reduce((sum, uni) => sum + uni.thesesCount, 0)}
            </div>
            <p className="text-sm text-muted-foreground">إجمالي الرسائل</p>
          </CardContent>
        </Card>
        <Card className="research-card">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {universities.length > 0 ? Math.round(universities.reduce((sum, uni) => sum + uni.established, 0) / universities.length) : 0}
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
