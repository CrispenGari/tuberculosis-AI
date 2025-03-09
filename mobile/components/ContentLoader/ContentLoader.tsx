import {
  View,
  Animated,
  type StyleProp,
  type ViewStyle,
  Dimensions,
} from "react-native";
import React from "react";
import { COLORS } from "@/constants";

interface Props {
  style?: StyleProp<ViewStyle>;
  duration?: number;
  delay?: number;
  outputRange?: number[];
  children?: React.ReactNode;
}
const ContentLoader: React.FunctionComponent<Props> = ({
  style,
  duration,
  delay,
  outputRange,
  children,
}) => {
  const { height } = Dimensions.get("window");
  const skeletonAnimation = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.loop(
      Animated.timing(skeletonAnimation, {
        toValue: 1,
        delay: delay ? delay : 0,
        duration: duration ? duration : 2000,
        useNativeDriver: false,
      })
    ).start();
  }, [duration]);
  const translateX = skeletonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: outputRange ? outputRange : [-200, 200],
  });

  return (
    <View
      style={[{ overflow: "hidden", backgroundColor: COLORS.primary }, style]}
    >
      <Animated.View
        style={{
          backgroundColor: COLORS.gray,
          width: "30%",
          height,
          transform: [{ rotate: "10deg" }, { translateX }],
          position: "absolute",
          top: -height / 2,
          opacity: 0.1,
        }}
      />
      {children}
    </View>
  );
};

export default ContentLoader;
