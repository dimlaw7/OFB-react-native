import { useFetchData } from "@/hooks/useFetchData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import Svg, { Polyline, Path } from "react-native-svg";

interface TransactionDataType {
  transaction_amount: number;
  transaction_date: string;
  transaction_status: string;
  transaction_type: string;
}

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const useRadix = (int: any) => {
  if (typeof int === "string") {
    int = Number.parseFloat(int);
  }
  // Split the input value into integer and decimal parts
  let [integerPart, decimalPart] = int.toFixed(2).split(".");
  // Format the integer part with commas for thousands separators
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const radixOutput = `${integerPart}.${decimalPart}`;

  return [radixOutput];
};

const getUserActivities = async () => {
  const token = await AsyncStorage.getItem("token");

  if (!token) {
    throw new Error("User token not found. Please log in.");
  }

  try {
    const { data } = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/api/v1/user/transactions`
    );

    if (data.status === "error" || !data.data) {
      throw new Error(data.msg || "ERR-TRANSACTION: Error Retrieving Data");
    }

    return data.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Server responded with a status code out of 2xx range
          throw new Error(
            error.response.data?.message ||
              "ERR-Transactions: Server error occurred."
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

const TransactionsComponent = () => {
  const { data, error, loading } = useFetchData({ fn: getUserActivities });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Activites</Text>
      <View style={{ marginTop: 12 }}>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          data.map((item: TransactionDataType, index: number) => {
            let d = new Date(item.transaction_date);
            let month = months[d.getMonth()];
            let transactionDate = `${d.getDay()} ${month} ${d.getFullYear()}`;
            return (
              <View key={index} style={styles.transactionCard}>
                <View style={styles.transactionDetails}>
                  <View style={styles.iconContainer}>
                    <Svg
                      width={12}
                      height={12}
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
                    <Text style={styles.transactionType}>
                      {item.transaction_type}
                    </Text>
                    <Text style={styles.transactionStatus}>
                      {item.transaction_status}
                    </Text>
                  </View>
                </View>
                <View style={styles.transactionAmount}>
                  <Text style={styles.amount}>
                    {useRadix(item.transaction_amount)}
                  </Text>
                  <Text style={styles.date}>{transactionDate}</Text>
                </View>
              </View>
            );
          })
        )}
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
  errorText: {
    fontSize: 14,
    color: "red",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    marginVertical: 4,
  },
  transactionCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
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
    height: 30,
    width: 30,
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
    textAlign: "right",
  },
  date: {
    fontSize: 12,
    color: "#64748b",
  },
});

export default TransactionsComponent;
