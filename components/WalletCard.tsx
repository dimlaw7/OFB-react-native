import { useFetchData } from "@/hooks/useFetchData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const getUserBalance = async () => {
  const token = await AsyncStorage.getItem("token");
  if (!token) {
    throw new Error(
      "ERR-WALLET-CARD: User token not found. It appears that you are not log in."
    );
  }
  try {
    const response = await axios.post(
      `http://192.168.0.100:3000/api/v1/user/details`,
      { token }
    );
    if (response.data.status === "error") {
      throw new Error("ERR-WALLET-CARD: Error Retrieving user balance");
    }
    if (!response.data.data) {
      throw new Error("ERR-WALLET-CARD: Token is missing in the response");
    }
    return response.data.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      if (err.message === "timeout exceeded") {
        console.log(
          "Timeout exceeded. Please check your internet connection and try again"
        );
        //return {message: "Timeout exceeded. Please check your internet connection and try again"}
      } else {
        console.log("Error!", err.message);
      }
    } else {
      console.log("An unknown error occured!");
    }
    return null;
  }
};

const WalletCard = () => {
  const { data, error } = useFetchData({ fn: getUserBalance });
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
          <Text style={styles.amount}>
            {!data?.wallet ? "Loading..." : "₦" + data.wallet}
          </Text>
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
    backgroundColor: "#FFFFFF",
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
    margin: 16,
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
