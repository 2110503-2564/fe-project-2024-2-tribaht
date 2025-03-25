export default async function userRegister(
      name: string, 
      email: string, 
      tel: string, 
      password: string
    ) {
      try {
        const response = await fetch("http://localhost:5003/api/v1/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            tel,
            password,
            role: 'user'
          }),
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
      } catch (error) {
        console.error("Registration error:", error);
        throw new Error("การเชื่อมต่อล้มเหลว โปรดตรวจสอบเครือข่ายของคุณ");
      }
    }