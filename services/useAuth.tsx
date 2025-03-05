import { useAuthContext } from "@/hooks/useContext/AuthProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function useAuth() {
  const { setIsLoading, setIsLoggedIn } = useAuthContext();

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/api/v1/user/login`,
        {
          email,
          pass: password,
        }
      );
      if (response.data.status === "error") {
        throw new Error("Login error from server");
      }
      if (!response.data.payload) {
        throw new Error("Token is missing in the response");
      }
      await AsyncStorage.setItem("token", response.data.payload);
      setIsLoggedIn(true);
      return true;
    } catch (e) {
      console.log("Error!", e);
    } finally {
      setIsLoading(false);
    }
  };

  return { login };
}
