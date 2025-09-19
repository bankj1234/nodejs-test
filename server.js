const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware สำหรับ parse JSON
app.use(express.json());


// เริ่มต้น server เฉพาะเมื่อไฟล์นี้ถูกรันโดยตรง (ไม่ใช่ require)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Access your API at: http://localhost:${PORT}`);
  });
}

module.exports = app;
