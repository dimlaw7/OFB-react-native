import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode, JwtPayload } from "jwt-decode";
interface CustomJwtPayload extends JwtPayload {
  username: string;
  isLoggedIn: boolean;
}

export async function getCurrentUser() {
  try {
    //setIsLoading(true);
    const value = await AsyncStorage.getItem("token");
    if (value) {
      const decoded = jwtDecode<CustomJwtPayload>(value);
      return { ...decoded };
      //---setIsLoggedIn(!!decoded.username);
      //setUser(decoded.username);
    }
  } catch (e) {
    console.error("Error retrieving user data:", e);
    return null;
  }
}
