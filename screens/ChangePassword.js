import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import theme from "../Theme";
import Icon from 'react-native-vector-icons/EvilIcons';
import {
  withTheme,
  TextInput,
} from 'react-native-paper';
import MyDialog from "../components/Dialog";
import { UserContext } from "../contexts/UserContext";
import { changePassword } from "../services/APIs/password";

function ChangePassword(props) {
  const { user } = useContext(UserContext);
  const [newPassword, setNewPassword] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setVisible(true);
    putNewPassword();
  };

  const hideDialog = () => {
    setVisible(false);
    setTitle("");
    setMessage("");
  }

  const putNewPassword = () => {
    changePassword(newPassword, user.token)
      .then((responseJson) => {
        setVisible(true);
        if ("user" in responseJson) {
          setTitle("Completed");
          setMessage("Password has been changed successfully");
          setNewPassword("");
        } else if ("errors" in responseJson) {
          setTitle("Error");
          setMessage(responseJson.errors.message);
        }
      })
      .catch((error) => {
        setTitle("Error");
        setMessage("Unable to connect to server. Please try again");
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>NEW PASSWORD</Text>
      <TextInput
        mode="outlined"
        value={newPassword}
        label="NEW PASSWORD"
        style={styles.textInput}
        onChangeText={newPassword => setNewPassword(newPassword)}
      />
      <Icon
        name="arrow-right"
        size={90}
        color="#1690aa"
        onPress={submit}
      />
      <MyDialog
        visible={visible}
        title={title}
        message={message}
        hideDialog={hideDialog}
      />
    </View>
  );

}

export default withTheme(ChangePassword);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffcc",
    alignItems: "center",
    justifyContent: "center"
  },

  text: {
    fontSize: 28,
    fontWeight: "bold",
    color: theme.colors.primary,
    padding: 10
  },

  textInput: {
    width: 270,
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: theme.colors.background,
    borderColor: theme.colors.primary,
    borderRadius: 40,
    borderWidth: 2,
    padding: 10,
    marginBottom: 20
  },

});
