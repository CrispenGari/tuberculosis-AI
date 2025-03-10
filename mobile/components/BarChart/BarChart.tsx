import { COLORS } from "@/constants";
import { useMediaQuery } from "@/hooks";
import { useSettingsStore } from "@/store/useSettingsStore";
import React from "react";
import { View, Text } from "react-native";
import { BarChart } from "react-native-chart-kit";

const Bar = () => {
  const [labels, setLabels] = React.useState<string[]>([
    "NORMAL",
    "TUBERCULOSIS",
  ]);
  const [data, setData] = React.useState<number[]>([80, 20]);
  const {
    settings: { theme },
  } = useSettingsStore();

  const {
    dimension: { width },
  } = useMediaQuery();

  return (
    <BarChart
      style={{
        marginTop: 10,
        // width: "100%",
        justifyContent: "center",
        borderRadius: 10,
      }}
      data={{
        labels,
        datasets: [
          {
            data,
            withDots: true,
            color: (_opacity = 1) => COLORS.main,
            withScrollableDot: true,
          },
        ],
      }}
      fromZero
      width={width < 600 ? 300 : 400}
      height={width < 600 ? 300 : 400}
      yAxisLabel="  "
      yAxisSuffix=""
      showBarTops={false}
      chartConfig={{
        backgroundGradientFrom: COLORS.dark,
        backgroundGradientFromOpacity: 1,
        backgroundGradientTo:
          theme === "dark" ? COLORS.darkSecondary : COLORS.lightSecondary,
        backgroundGradientToOpacity: 1,
        paddingRight: 0,
        horizontalOffset: 0,
        color: (opacity = 1) => `rgba(57, 91, 100, ${opacity})`,
        strokeWidth: 1,
        barPercentage: 1,
        propsForDots: {
          r: "2",
          strokeWidth: "2",
          stroke: COLORS.white,
        },
        fillShadowGradient: COLORS.secondary,
        fillShadowGradientOpacity: 1,
        fillShadowGradientTo: COLORS.secondary,
        scrollableDotFill: "%",
        formatTopBarValue: (val) => `${val.toFixed(0)}%`,
        formatYLabel: (val) => `${Number(val).toFixed(0)}%`,
      }}
      verticalLabelRotation={60}
      horizontalLabelRotation={0}
      showValuesOnTopOfBars
      yLabelsOffset={10}
    />
  );
};

export default Bar;
