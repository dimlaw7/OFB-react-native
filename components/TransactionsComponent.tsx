import { View, Text, FlatList, StyleSheet } from "react-native";
import Svg, { Polyline, Path } from "react-native-svg";

const transactions = [
  {
    id: "1",
    type: "Deposit",
    status: "Approved",
    amount: "+₦20,000.00",
    date: "Jun 3 2024",
  },
  {
    id: "2",
    type: "Deposit",
    status: "Approved",
    amount: "+₦5,000.00",
    date: "May 11 2024",
  },
  {
    id: "3",
    type: "Deposit",
    status: "Approved",
    amount: "+₦50,000.00",
    date: "May 11 2024",
  },
  {
    id: "4",
    type: "Deposit",
    status: "Approved",
    amount: "+₦8,900.00",
    date: "May 11 2024",
  },
  {
    id: "5",
    type: "Deposit",
    status: "Approved",
    amount: "+₦9,000.00",
    date: "May 10 2024",
  },
];

const TransactionsComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Activites</Text>
      <View style={styles.container}>
        {transactions.map((item) => (
          <View key={item.id} style={styles.transactionCard}>
            <View style={styles.transactionDetails}>
              <View style={styles.iconContainer}>
                <Svg
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#14532d"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <Polyline points="10 9 15 4 20 9" />
                  <Path d="M4 20h7a4 4 0 0 0 4-4V4" />
                </Svg>
              </View>
              <View>
                <Text style={styles.transactionType}>{item.type}</Text>
                <Text style={styles.transactionStatus}>{item.status}</Text>
              </View>
            </View>
            <View style={styles.transactionAmount}>
              <Text style={styles.amount}>{item.amount}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
    marginTop: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    marginVertical: 12,
  },
  transactionCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    //marginTop: 10,
    borderRadius: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "white",
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 3,
  },
  transactionDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  iconContainer: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#ecfdf5",
  },
  transactionType: {
    fontWeight: "600",
    marginBottom: 6,
    fontSize: 12,
  },
  transactionStatus: {
    fontSize: 12,
    color: "#64748b",
  },
  transactionAmount: {
    alignItems: "center",
  },
  amount: {
    fontWeight: "600",
    color: "#14532d",
    marginBottom: 6,
    fontSize: 12,
  },
  date: {
    fontSize: 12,
    color: "#64748b",
  },
});

export default TransactionsComponent;
