import React from "react";
import {
    Animated,
    Pressable,
    PressableProps,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

type Props = PressableProps & {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  isFocused?: boolean;
};

const LiquidGlassTab = React.forwardRef<React.ElementRef<typeof Pressable>, Props>(function LiquidGlassTab({
  icon,
  label,
  isFocused = false,
  style,
  ...pressableProps
}, ref) {
  const activeProgress = React.useRef(
    new Animated.Value(isFocused ? 1 : 0),
  ).current;

  React.useEffect(() => {
    Animated.timing(activeProgress, {
      toValue: isFocused ? 1 : 0,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [activeProgress, isFocused]);

  return (
    <Pressable
      ref={ref}
      {...pressableProps}
      style={(state) => [
        styles.container,
        typeof style === "function" ? style(state) : style,
      ]}
    >
      <View style={styles.content}>
        <Animated.View
          pointerEvents="none"
          style={[
            styles.activeContainer,
            {
              opacity: activeProgress,
              transform: [
                {
                  scale: activeProgress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.86, 1],
                  }),
                },
              ],
            },
          ]}
        />
        <Ionicons
          name={icon}
          size={23}
          color={isFocused ? "#FFFFFF" : "#172554"}
        />

        {isFocused && <Text style={styles.label}>{label}</Text>}
      </View>
    </Pressable>
  );
});

export default LiquidGlassTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 56,
    margin: 6,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },

  activeContainer: {
    position: "absolute",
    top: 0,
    right: -14,
    bottom: 0,
    left: -14,
    backgroundColor: "#1D4ED8",
    borderRadius: 28,
  },

  content: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",

    gap: 3,
  },

  label: {
    fontSize: 11,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
  },
});
