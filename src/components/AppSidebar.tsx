import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Search, Users, ShoppingBag, MessageCircle, Calendar, BookOpen, Moon, Sun } from 'lucide-react';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
const menuItems = [{
  title: 'لوحة التحكم',
  url: '/',
  icon: BarChart3,
  description: 'عرض الإحصائيات العامة'
}, {
  title: 'البحث عن الرسائل',
  url: '/analytics',
  icon: Search,
  description: 'بحث متقدم في الرسائل'
}, {
  title: 'عرض الرسائل',
  url: '/theses',
  icon: Users,
  description: 'إدارة الرسائل البحثية'
}, {
  title: 'الأقسام',
  url: '/departments',
  icon: ShoppingBag,
  description: 'إدارة الأقسام الأكاديمية'
}, {
  title: 'الجامعات والكليات',
  url: '/universities',
  icon: MessageCircle,
  description: 'إدارة الجامعات والكليات'
}, {
  title: 'إضافة رسالة جديدة',
  url: '/add-thesis',
  icon: Calendar,
  description: 'إضافة رسالة بحثية جديدة'
}];
export function AppSidebar() {
  const location = useLocation();
  const {
    theme,
    toggleTheme
  } = useTheme();
  return <Sidebar className="border-r border-border/40 glass-effect">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-bold text-lg">إدارة الرسائل</h2>
            <p className="text-sm text-muted-foreground">نظام الرسائل البحثية</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground mb-2">
            القائمة الرئيسية
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map(item => <SidebarMenuItem key={item.title} className="">
                  <SidebarMenuButton asChild isActive={location.pathname === item.url} className="group relative overflow-hidden rounded-lg transition-all duration-200 hover:bg-primary/10 py-4 h-10">
                    <Link to={item.url} className="flex items-center gap-4 p-4 h-20">
                      <item.icon className="w-5 h-5 transition-colors group-hover:text-primary" />
                      <div className="flex-1 text-right">
                        <span className="font-medium text-base">{item.title}</span>
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <Button variant="outline" size="sm" onClick={toggleTheme} className="w-full flex items-center gap-2 research-card">
          {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          {theme === 'light' ? 'الوضع الليلي' : 'الوضع الفاتح'}
        </Button>
      </SidebarFooter>
    </Sidebar>;
}