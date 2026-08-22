import { BlurView } from "expo-blur";
import React from "react";
import {
    StyleSheet,
    View,
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  children: React.ReactNode;
};

export default function LiquidGlassTabBar({
  children,
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.wrapper,
        {
          bottom: Math.max(insets.bottom, 12) + 12,
        },
      ]}
    >
      <View style={styles.bar}>
        <BlurView
          intensity={75}
          tint="light"
          experimentalBlurMethod="dimezisBlurView"
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.content}>
          {children}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",

    left: 16,
    right: 16,

    alignItems: "center",
  },

  bar: {
    width: "100%",
    minHeight: 68,

    borderRadius: 34,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",

    backgroundColor: "rgba(255, 255, 255, 0.28)",

    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.20)",

    elevation: 12,

    overflow: "hidden",
  },

  content: {
    width: "100%",
    minHeight: 68,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    zIndex: 1,
  },
});