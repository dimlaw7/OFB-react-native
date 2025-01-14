import { Link } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView>
      <Text style={{ fontFamily: "sf-semibolditalic" }}>
        Welcome to OFB App!
      </Text>
      <Link href="/cart" className="text-4xl">
        Cart
      </Link>
      <Link href="/profile">Profile</Link>
      <Link href="/signIn" className="font-extrabold">
        Sign In
      </Link>
    </SafeAreaView>
  );
}
