interface LoginResponse {
    success: boolean;
    token: string;
    user: {
      _id: string;
      name: string;
      email: string;
      role: string;
    };
  }
  
  export default async function userLogin(
    email: string, 
    password: string
  ): Promise<LoginResponse> {
    const response = await fetch("http://localhost:5003/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to login");
    }
  
    return await response.json();
  }