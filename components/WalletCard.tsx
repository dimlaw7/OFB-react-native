import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";

const WalletCard = () => {
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
          <Text style={styles.amount}>₦30,000.00</Text>
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
