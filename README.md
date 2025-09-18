# Node.js Express Students API

โปรเจค REST API สำหรับจัดการข้อมูลนักเรียน โดยใช้ Express.js และเก็บข้อมูลใน memory

## วิธีการรัน

### 1. ติดตั้ง dependencies
```bash
npm install
```

### 2. รัน server
```bash
# รันแบบปกติ
npm start

# รันแบบ development (auto-reload)
npm run dev
```

Server จะรันที่ `http://localhost:3000`

## API Endpoints

### GET /students
ดึงข้อมูลนักเรียนทั้งหมด

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "สมชาย ใจดี",
      "age": 20,
      "major": "วิทยาการคอมพิวเตอร์"
    }
  ],
  "total": 1
}
```

### GET /students/:id
ดึงข้อมูลนักเรียนตาม ID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "สมชาย ใจดี",
    "age": 20,
    "major": "วิทยาการคอมพิวเตอร์"
  }
}
```

### POST /students
เพิ่มนักเรียนใหม่

**Request Body:**
```json
{
  "name": "สมหญิง รักเรียน",
  "age": 19,
  "major": "วิศวกรรมซอฟต์แวร์"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "name": "สมหญิง รักเรียน",
    "age": 19,
    "major": "วิศวกรรมซอฟต์แวร์"
  },
  "message": "Student created successfully"
}
```

### PUT /students/:id
อัพเดทข้อมูลนักเรียน

**Request Body:**
```json
{
  "name": "สมชาย ใจดีมาก",
  "age": 21
}
```

### DELETE /students/:id
ลบนักเรียน

## ตัวอย่างการทดสอบด้วย curl

```bash
# ดึงข้อมูลทั้งหมด
curl http://localhost:3000/students

# ดึงข้อมูลตาม ID
curl http://localhost:3000/students/1

# เพิ่มนักเรียนใหม่
curl -X POST http://localhost:3000/students \
  -H "Content-Type: application/json" \
  -d '{"name":"สมศักดิ์ ขยัน","age":22,"major":"วิศวกรรมคอมพิวเตอร์"}'

# อัพเดทข้อมูล
curl -X PUT http://localhost:3000/students/1 \
  -H "Content-Type: application/json" \
  -d '{"age":21}'

# ลบนักเรียน
curl -X DELETE http://localhost:3000/students/1
```

## โครงสร้างโปรเจค

```
nodejs-test/
├── package.json        # ข้อมูลโปรเจคและ dependencies
├── server.js          # ไฟล์หลักของ Express server
├── tests/             # โฟลเดอร์สำหรับ test files
│   └── student.test.js
└── README.md          # เอกสารอธิบายโปรเจค
```

## Features

- ✅ GET /students - ดึงข้อมูลทั้งหมด
- ✅ GET /students/:id - ดึงข้อมูลตาม ID
- ✅ POST /students - เพิ่มข้อมูลใหม่
- ✅ PUT /students/:id - อัพเดทข้อมูล
- ✅ DELETE /students/:id - ลบข้อมูล
- ✅ Error handling
- ✅ Input validation
- ✅ เก็บข้อมูลใน memory
