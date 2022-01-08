import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import theme from "../Theme";
import Icon from 'react-native-vector-icons/EvilIcons';
import { withTheme } from 'react-native-paper';
import { UserContext } from "../contexts/UserContext";

function Logout(props) {
  const { user } = useContext(UserContext);

  const submit = (e) => {
    e.preventDefault();
    user.clientId = '';
    user.password = '';
    user.token = '';
    props.props.navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>DO YOU CONFIRM TO LOGOUT?</Text>
      <Icon
        name="arrow-right"
        size={90}
        color="#1690aa"
        onPress={submit}
      />
    </View>
  );

}

export default withTheme(Logout);

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
