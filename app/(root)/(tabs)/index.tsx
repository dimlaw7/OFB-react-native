import icons from "@/assets/constants/icons";
import images from "@/assets/constants/images";
import SavingsCard from "@/components/SavingsCard";
import TransactionsComponent from "@/components/TransactionsComponent";
import UpgradePackage from "@/components/UpgradeCard";
import WalletPackage from "@/components/WalletCard";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView edges={["top"]}>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            paddingVertical: 14,
            backgroundColor: "#FFFFFF",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={images.avatar}
              style={{ width: 48, height: 48, borderRadius: 100 }}
            />
            <View style={{ marginLeft: 8, gap: 4 }}>
              <Text
                style={{
                  fontFamily: "sf-meadiun",
                  color: "#666876",
                }}
              >
                Welcome Back 👋
              </Text>
              <Text style={{ fontFamily: "sf-bold", fontSize: 14 }}>
                Oladimeji Lawal
              </Text>
            </View>
          </View>
          <Image source={icons.bell} />
        </View>
        <View style={{ marginHorizontal: 16 }}>
          <WalletPackage />
          <UpgradePackage />
          <SavingsCard />
          <View>
            <TransactionsComponent />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
});
