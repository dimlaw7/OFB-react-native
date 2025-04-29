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
  }): Promise<true | { error: string }> => {
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
        return {
          error:
            response.data.message ||
            "Login failed. Please reconfirm login details and try again.",
        };
      }

      if (!response.data.payload) {
        return { error: "No token received from server." };
      }

      await AsyncStorage.setItem("token", response.data.payload);
      setIsLoggedIn(true);
      return true;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Server responded with a status code out of 2xx range
          return {
            error:
              error.response.data?.message ||
              "Server error occurred. Please try again",
          };
        } else if (error.request) {
          // Request made but no response
          return {
            error:
              "No response from server. Please check your network connection.",
          };
        } else {
          // Something happened setting up the request
          return { error: error.message || "An unknown error occurred." };
        }
      } else {
        return { error: "Unexpected error occurred." };
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { login };
}
