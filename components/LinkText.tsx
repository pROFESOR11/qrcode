import React, { Component } from "react";
import { Text } from "react-native";
import theme from "../theme";

interface LinkTextProps {
    onPress?: () => void;
    text: string
}

class LinkText extends Component<LinkTextProps, {opacity: Number, isOnPressFire: boolean}> {

  state = {
    opacity: 1.0,
    isOnPressFire: false,
  };

  render() {
    return (
      <Text
        style={{
          fontWeight: "bold",
          textDecorationLine: "underline",
          color: this.state.opacity == 1.0 ? theme.primary : theme.primaryLight,
          opacity: this.state.opacity,
        }}
        suppressHighlighting={true}
        // @ts-ignore
        onResponderGrant={() => {
          this.setState({ opacity: 0.5, isOnPressFire: true });
        }}
        onResponderRelease={() => {
          setTimeout(() => {
            this.setState({ opacity: 1.0, isOnPressFire: false });
          }, 350);
        }}
        onResponderTerminate={() => {
          this.setState({ opacity: 1.0, isOnPressFire: false });
        }}
        onPress={() => {
          if (this.state.isOnPressFire) {
            this.props.onPress && this.props.onPress();
          }
          this.setState({ opacity: 1.0, isOnPressFire: false });
        }}
      >
        {this.props.text}
      </Text>
    );
  }
}
export default LinkText;
