import { View, Text, StyleSheet, ScrollView } from "react-native";
import Svg, { Path } from "react-native-svg";

const months = [
  { name: "Jan", amount: "5000", active: true },
  { name: "Feb", amount: "5000", active: false },
  { name: "Mar", amount: "5000", active: false },
  { name: "Apr", amount: "5000", active: true },
  { name: "May", amount: "5000", inactive: true },
  { name: "Jun", amount: "5000", inactive: true },
  { name: "Jul", amount: "5000", active: true, inactive: true },
  { name: "Aug", amount: "5000", active: true, inactive: true },
  { name: "Sep", amount: "5000", inactive: true },
  { name: "Oct", amount: "5000", inactive: true },
  { name: "Nov", amount: "5000", inactive: true },
  { name: "Dec", amount: "5000", inactive: true },
];

const PiggyBankIcon = () => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#fbbf24"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z" />
    <Path d="M2 9v1c0 1.1.9 2 2 2h1" />
    <Path d="M16 11h.01" />
  </Svg>
);

const SavingsCard = () => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Savings Cards</Text>
        <Text style={styles.subtitle}>
          This is an overview of your savings progress
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.grid}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {months.map((month, index) => {
          const isActive = month.active && !month.inactive;
          const isDimmed = month.inactive;

          return (
            <View
              key={index}
              style={[
                styles.monthItem,
                isActive ? styles.activeBg : styles.inactiveBg,
                isDimmed && styles.dimmed,
              ]}
            >
              <Text
                style={[
                  styles.monthLabel,
                  isActive ? styles.activeText : styles.inactiveText,
                ]}
              >
                {month.name}
              </Text>
              <PiggyBankIcon />
              <Text
                style={[
                  styles.amount,
                  isActive ? styles.activeText : styles.inactiveText,
                ]}
              >
                {month.amount}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    padding: 16,
    marginVertical: 16,
    elevation: 3,
  },
  header: {
    marginBottom: 8,
  },
  title: {
    fontWeight: "600",
    fontSize: 14,
  },
  subtitle: {
    marginTop: 12,
    fontSize: 12,
    color: "#6b7280", // Tailwind 'text-muted-foreground'
  },
  grid: {
    flexDirection: "row",
    gap: 12,
    paddingTop: 10,
  },
  monthItem: {
    alignItems: "center",
    padding: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#e5e7eb", // Tailwind border
    width: 64,
    gap: 4,
  },
  monthLabel: {
    fontSize: 10,
    fontWeight: "600",
  },
  amount: {
    fontSize: 10,
    fontWeight: "600",
  },
  activeBg: {
    backgroundColor: "#6b21a8", // Tailwind bg-purple-800
  },
  inactiveBg: {
    backgroundColor: "#f3e8ff", // Tailwind bg-purple-100
  },
  activeText: {
    color: "#ffffff",
  },
  inactiveText: {
    color: "#000000",
  },
  dimmed: {
    opacity: 0.6,
  },
});

export default SavingsCard;
