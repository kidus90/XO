import { Link } from "expo-router";
import { useState } from "react";
import { Text, View, TouchableOpacity, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [showFront, setShowFront] = useState(true);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <ImageBackground
        source={require("../assets/images/icon2.png")}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 24,
        }}
        imageStyle={{ opacity: 0.19 }}
      >
        <View style={{ alignItems: "center", marginBottom: 24 }}>
          <View
            style={{
              width: 110,
              height: 110,
              borderRadius: 24,
              backgroundColor: "#ffd166",
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#000",
              shadowOpacity: 0.12,
              shadowRadius: 10,
            }}
          >
            <Text style={{ fontSize: 46, fontWeight: "900", color: "#073b4c" }}>
              T
            </Text>
          </View>
          <Text
            style={{
              fontSize: 36,
              fontWeight: "900",
              marginTop: 16,
              color: "#03045e",
            }}
          >
            Tic Tac Toe
          </Text>
          <Text style={{ marginTop: 8, color: "#023047" }}>
            A modern, simple game with a clean UI
          </Text>
        </View>

        <View style={{ width: "100%", alignItems: "center" }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#118ab2",
                paddingVertical: 14,
                paddingHorizontal: 36,
                borderRadius: 12,
                shadowColor: "#000",
                shadowOpacity: 0.16,
                shadowRadius: 8,
              }}
            >
          <Link href="/game">
              <Text style={{ color: "white", fontSize: 18, fontWeight: "800" }}>
                Start Game
              </Text>
          </Link>
            </TouchableOpacity>

          <Text style={{ marginTop: 18, color: "#667085" }}>
            Tap a cell to place your mark. X starts first.
          </Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
