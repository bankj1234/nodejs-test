// tests/student.test.js
const request = require("supertest");
const app = require("../server"); // Express app

describe("Student API", () => {
  // ทำความสะอาดหลังจาก test ทั้งหมดเสร็จ
  afterAll(async () => {
    // รอให้ requests ทั้งหมดเสร็จสิ้น
    await new Promise(resolve => setTimeout(resolve, 100));
  });

  it("GET /students ควร return object with success และ data array", async () => {
    const res = await request(app).get("/students");
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.total).toBeGreaterThanOrEqual(0);
  });

  it("GET /students/:id ควร return student ตาม ID", async () => {
    const res = await request(app).get("/students/1");
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data).toHaveProperty('name');
    expect(res.body.data).toHaveProperty('age');
    expect(res.body.data).toHaveProperty('major');
  });

  it("GET /students/:id ที่ไม่มี ควร return 404", async () => {
    const res = await request(app).get("/students/999");
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Student not found');
  });

  it("POST /students ควรเพิ่มนักเรียนใหม่", async () => {
    const newStudent = {
      name: "Bank จากTest",
      age: 25,
      major: "วิทยาการคอมพิวเตอร์"
    };
    
    const res = await request(app)
      .post("/students")
      .send(newStudent);
      
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe(newStudent.name);
    expect(res.body.data.age).toBe(newStudent.age);
    expect(res.body.data.major).toBe(newStudent.major);
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.message).toBe('Student created successfully');
  });

  it("POST /students โดยไม่ส่งข้อมูลครบ ควร return 400", async () => {
    const incompleteStudent = {
      name: "Test Student"
      // ขาด age และ major
    };
    
    const res = await request(app)
      .post("/students")
      .send(incompleteStudent);
      
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('name, age, and major are required');
  });

  it("PUT /students/:id ควรอัพเดทข้อมูลนักเรียน", async () => {
    const updateData = {
      name: "Bank Updated",
      age: 26
    };
    
    const res = await request(app)
      .put("/students/1")
      .send(updateData);
      
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe(updateData.name);
    expect(res.body.data.age).toBe(updateData.age);
    expect(res.body.message).toBe('Student updated successfully');
  });

  it("DELETE /students/:id ควรลบนักเรียน", async () => {
    // สร้าง student ใหม่เพื่อลบ
    const newStudent = {
      name: "Test Delete",
      age: 20,
      major: "Test Major"
    };
    
    const createRes = await request(app)
      .post("/students")
      .send(newStudent);
    
    const studentId = createRes.body.data.id;
    
    // ลบ student
    const deleteRes = await request(app)
      .delete(`/students/${studentId}`);
      
    expect(deleteRes.statusCode).toBe(200);
    expect(deleteRes.body.success).toBe(true);
    expect(deleteRes.body.message).toBe('Student deleted successfully');
    
    // ตรวจสอบว่าลบแล้ว
    const getRes = await request(app)
      .get(`/students/${studentId}`);
    expect(getRes.statusCode).toBe(404);
  });
});