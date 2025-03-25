"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import userRegister from "@/libs/userRegister";
import { TextField, Button, Typography, Container, Box } from "@mui/material";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
  
    // ตรวจสอบข้อมูลก่อนส่ง
    if (!name || !email || !tel || !password) {
      setError("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
  
    try {
      await userRegister(name, email, tel, password);
      alert("ลงทะเบียนสำเร็จ!");
      router.push("/login");
    } catch (err: any) {
      setError(err.message || "สมัครสมาชิกไม่สำเร็จ");
      console.error("Registration failed:", err);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h5">สมัครสมาชิก</Typography>
      </Box>
      <Box 
        component="form" 
        sx={{ mt: 2 }}
        onSubmit={handleSubmit} // ใช้ form onSubmit แทน
      >
        <TextField 
          fullWidth 
          label="ชื่อ-นามสกุล" 
          variant="outlined" 
          margin="normal" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required
        />
        <TextField 
          fullWidth 
          label="อีเมล" 
          variant="outlined" 
          margin="normal" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />
        <TextField 
          fullWidth 
          label="เบอร์โทร" 
          variant="outlined" 
          margin="normal" 
          value={tel} 
          onChange={(e) => setTel(e.target.value)}
          required
        />
        <TextField 
          fullWidth 
          label="รหัสผ่าน" 
          variant="outlined" 
          margin="normal" 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <Typography color="error">{error}</Typography>}

        <Button 
          type="submit" // เปลี่ยนเป็น type="submit"
          fullWidth 
          variant="contained" 
          color="primary" 
          sx={{ mt: 2 }}
        >
          สมัครสมาชิก
        </Button>
      </Box>
    </Container>
  );
}