import { View } from "react-native";
import React from "react";
import { COLORS, FONTS } from "../../constants";
import Table from "react-native-table-element";
import { useSettingsStore } from "@/store/useSettingsStore";

interface Props {
  tableHead: string[];
  tableData: string[][];
}

const TableComponent: React.FC<Props> = ({ tableData, tableHead }) => {
  const {
    settings: { theme },
  } = useSettingsStore();

  return (
    <View style={{ width: "100%", maxWidth: 400, marginTop: 30 }}>
      <Table
        containerStyle={{ width: "100%" }}
        header={tableHead}
        columnsWidth={tableHead.map((_) => 350 / tableHead.length)}
        data={tableData}
        borderColor={COLORS.secondary}
        borderWidth={1}
        headerStyle={{
          backgroundColor: COLORS.secondary,
          padding: 5,
        }}
        headerTextStyle={{
          color: COLORS.white,
          fontFamily: FONTS.bold,
          textAlign: "right",
          width: "100%",
        }}
        textStyle={{
          fontFamily: FONTS.regular,
          color: theme === "dark" ? COLORS.white : COLORS.black,
        }}
        rowStyle={{
          padding: 5,
          backgroundColor: theme === "dark" ? COLORS.dark : COLORS.light,
        }}
        columnsAlign={["left", "left"]}
      />
    </View>
  );
};

export default TableComponent;
