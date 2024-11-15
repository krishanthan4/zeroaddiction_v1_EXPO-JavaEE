import Toast from "react-native-root-toast";

const AlertToast = (message: string, type = "error") => {
  const color = type == "error" ? "#5c070e" : "#0a5c07";
  const backgroundColor = type == "error" ? "#faa0a7" : "#a0faa9";

  Toast.show(message, {
    position: Toast.positions.TOP,
    duration: 500,
    textStyle: { fontSize: 17, textAlign: "right", fontWeight: "bold" },
    backgroundColor: backgroundColor,
    containerStyle: { marginTop: 50, width: 300 },
    opacity: 0.9,
    textColor: color,
    shadow: true,
    animation: true,
  });
};
export default AlertToast;
