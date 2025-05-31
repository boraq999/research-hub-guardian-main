// ملف README مختصر لتوضيح تشغيل الباك اند

# Backend

## التشغيل

1. تثبيت الحزم:
   ```powershell
   npm install express mysql2 cors
   ```
2. تهيئة قاعدة البيانات:
   - نفذ ملف universities.sql في MySQL Workbench أو أي أداة قواعد بيانات.
   - أو شغل السكريبت:
   ```powershell
   node backend/seed-universities.cjs
   ```
3. تشغيل السيرفر:
   ```powershell
   node backend/server.cjs
   ```

## الملفات
- `server.cjs` : السيرفر (API)
- `seed-universities.cjs` : سكريبت تعبئة البيانات
- `universities.sql` : سكريبت إنشاء الجدول والبيانات
