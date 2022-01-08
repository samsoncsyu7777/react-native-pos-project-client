import React from "react";
import { StyleSheet } from "react-native";
import {
  withTheme,
  Button,
  Paragraph,
  Dialog,
  Portal,
} from 'react-native-paper';
import theme from "../Theme";

function MyDialog({
  visible,
  title,
  message,
  hideDialog,
}) {

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={hideDialog}
        style={styles.dialog}
      >
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{message}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}


export default withTheme(MyDialog);

const styles = StyleSheet.create({
  dialog: {
    textAlign: "center",
    backgroundColor: theme.colors.dialog,
    width: 300,
    alignSelf: "center"
  },

});