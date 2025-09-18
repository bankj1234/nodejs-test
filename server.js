const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware สำหรับ parse JSON
app.use(express.json());

// ข้อมูล students ใน memory
let students = [
  {
    id: 1,
    name: "สมชาย ใจดี",
    age: 20,
    major: "วิทยาการคอมพิวเตอร์"
  },
  {
    id: 2,
    name: "สมหญิง รักเรียน",
    age: 19,
    major: "วิศวกรรมซอฟต์แวร์"
  }
];

// ตัวแปรสำหรับ ID ถัดไป
let nextId = 3;

// GET /students - ดึงข้อมูล students ทั้งหมด
app.get('/students', (req, res) => {
  res.json({
    success: true,
    data: students,
    total: students.length
  });
});

// GET /students/:id - ดึงข้อมูล student ตาม ID
app.get('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);
  
  if (!student) {
    return res.status(404).json({
      success: false,
      message: 'Student not found'
    });
  }
  
  res.json({
    success: true,
    data: student
  });
});

// POST /students - เพิ่ม student ใหม่
app.post('/students', (req, res) => {
  const { name, age, major } = req.body;
  
  // ตรวจสอบข้อมูลที่จำเป็น
  if (!name || !age || !major) {
    return res.status(400).json({
      success: false,
      message: 'name, age, and major are required'
    });
  }
  
  // สร้าง student ใหม่
  const newStudent = {
    id: nextId++,
    name,
    age: parseInt(age),
    major
  };
  
  students.push(newStudent);
  
  res.status(201).json({
    success: true,
    data: newStudent,
    message: 'Student created successfully'
  });
});

// PUT /students/:id - อัพเดท student
app.put('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const studentIndex = students.findIndex(s => s.id === id);
  
  if (studentIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Student not found'
    });
  }
  
  const { name, age, major } = req.body;
  
  // อัพเดทข้อมูล
  if (name) students[studentIndex].name = name;
  if (age) students[studentIndex].age = parseInt(age);
  if (major) students[studentIndex].major = major;
  
  res.json({
    success: true,
    data: students[studentIndex],
    message: 'Student updated successfully'
  });
});

// DELETE /students/:id - ลบ student
app.delete('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const studentIndex = students.findIndex(s => s.id === id);
  
  if (studentIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Student not found'
    });
  }
  
  const deletedStudent = students.splice(studentIndex, 1)[0];
  
  res.json({
    success: true,
    data: deletedStudent,
    message: 'Student deleted successfully'
  });
});

// Middleware สำหรับ handle route ที่ไม่มี
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// เริ่มต้น server เฉพาะเมื่อไฟล์นี้ถูกรันโดยตรง (ไม่ใช่ require)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Access your API at: http://localhost:${PORT}`);
  });
}

module.exports = app;
