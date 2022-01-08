import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import theme from "../Theme";
import Icon from 'react-native-vector-icons/EvilIcons';
import { withTheme, TextInput } from 'react-native-paper';
import MyDialog from "../components/Dialog";
import { UserContext } from "../contexts/UserContext";
import { getItem } from "../services/APIs/item";

function Inventory(props) {
  const { user } = useContext(UserContext);
  const [upc, setUpc] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    searchUpc();
  };

  const hideDialog = () => {
    setVisible(false);
  }

  const searchUpc = () => {
    getItem(user.token, upc)
      .then((responseJson) => {
        setVisible(true);
        if ("content" in responseJson) {
          setTitle("Completed");
          setMessage("Fetch the item successfully");
          props.props.navigation.navigate('Item', { itemDTO: responseJson.content[0] });
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
      <Text style={styles.text}>UPC</Text>
      <TextInput
        mode="outlined"
        value={upc}
        label="UPC"
        style={styles.textInput}
        onChangeText={upc => setUpc(upc)}
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

export default withTheme(Inventory);

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
