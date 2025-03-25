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

  const handleRegister = async () => {
    try {
      await userRegister(name, email, tel, password);
      alert("ลงทะเบียนสำเร็จ!");
      router.push("/register");
    } catch (err: any) {
      setError(err.message || "สมัครสมาชิกไม่สำเร็จ");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h5">สมัครสมาชิก</Typography>
      </Box>
      <Box component="form" sx={{ mt: 2 }}>
        <TextField fullWidth label="ชื่อ-นามสกุล" variant="outlined" margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField fullWidth label="อีเมล" variant="outlined" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField fullWidth label="เบอร์โทร" variant="outlined" margin="normal" value={tel} onChange={(e) => setTel(e.target.value)} />
        <TextField fullWidth label="รหัสผ่าน" variant="outlined" margin="normal" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        {error && <Typography color="error">{error}</Typography>}

        <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleRegister}>
          สมัครสมาชิก
        </Button>
      </Box>
    </Container>
  );
}
