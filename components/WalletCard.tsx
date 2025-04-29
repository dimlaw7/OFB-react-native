import { useFetchData } from "@/hooks/useFetchData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator, // To show loading spinner
} from "react-native";
import useRadix from "@/services/useRadix";

interface ApiResponse {
  user: string;
  firstName: string;
  lastName: string;
  wallet: string;
  package_id: number;
}

const getUserBalance = async () => {
  const token = await AsyncStorage.getItem("token");

  if (!token) {
    throw new Error(
      "ERR-WALLET-CARD: User token not found. It appears that you are not log in."
    );
  }

  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/api/v1/user/details`,
      { token }
    );

    if (response.data.status === "error") {
      throw new Error("ERR-WALLET-CARD: Error Retrieving user balance");
    }

    if (!response.data.data) {
      throw new Error("ERR-WALLET-CARD: Token is missing in the response");
    }

    return response.data.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Server responded with a status code out of 2xx range
          throw new Error(
            error.response.data?.message || "Server error occurred."
          );
        } else if (error.request) {
          // Request made but no response
          throw new Error("No response from server. Check your network.");
        } else {
          // Something happened setting up the request
          throw new Error("Unknown error occurred.");
        }
      } else {
        throw new Error(error.message);
      }
    } else {
      throw new Error(
        "An unknown error occured!" +
          (error instanceof Error ? error.message : error)
      );
    }
    return null;
  }
};

const WalletCard = () => {
  const { data, error, loading } = useFetchData({ fn: getUserBalance });
  //console.log(!data ? "Loading data..." : data);
  return (
    <View style={styles.cardContainer}>
      <View style={styles.WalletCard}>
        {/* Wallet Balance with Background */}
        <ImageBackground
          source={require("@/assets/images/bg-pattern.png")}
          style={styles.balance}
          imageStyle={styles.backgroundImage}
        >
          <Text style={styles.title}>Wallet Balance</Text>
          {loading ? (
            <ActivityIndicator size="large" color="white" />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            <Text style={styles.amount}>
              {"₦" + (data?.wallet ? useRadix(data.wallet) : "N/A")}
            </Text>
          )}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Deposit</Text>
          </TouchableOpacity>
        </ImageBackground>

        {/* Package Section with Background */}
        {/* <ImageBackground
        source={require("@/assets/images/bg-pattern.png")}
        style={styles.package}
        imageStyle={styles.backgroundImage}
      >
        <View style={styles.details}>
          <Text style={styles.packageTitle}>Package Type</Text>
          <View style={styles.packageDetails}>
            <Text style={styles.tier}>Tier 1</Text>
            <Text style={styles.price}>₦5000/month</Text>
          </View>
        </View>
      </ImageBackground> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    //backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    marginVertical: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6, // For Android
  },
  WalletCard: {
    flexDirection: "column",
  },
  balance: {
    //flex: 1,
    height: 176,
    borderRadius: 8,
    backgroundColor: "#280151",
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    overflow: "hidden",
  },
  package: {
    //flex: 1,
    height: 176,
    borderRadius: 8,
    backgroundColor: "#1565C0",
    padding: 16,
    justifyContent: "space-between",
    marginLeft: -4,
    overflow: "hidden",
  },
  errorText: {
    fontSize: 14,
    color: "red",
  },
  backgroundImage: {
    borderRadius: 8,
    resizeMode: "cover",
  },
  title: {
    fontSize: 14,
    marginBottom: 8,
    color: "white",
  },
  amount: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  button: {
    marginTop: 32,
    height: 40,
    backgroundColor: "#64748B",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    width: 100,
  },
  buttonText: {
    fontSize: 14,
    color: "white",
    fontWeight: "500",
  },
  details: {
    flex: 1,
  },
  packageTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "white",
  },
  packageDetails: {
    marginTop: 56,
  },
  tier: {
    fontSize: 14,
    color: "white",
  },
  price: {
    marginTop: 4,
    color: "white",
  },
});

export default WalletCard;
