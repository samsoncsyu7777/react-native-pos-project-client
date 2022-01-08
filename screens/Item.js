import React, { useState, useContext } from "react";
import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  ScrollView
} from "react-native";
import theme from "../Theme";
import Icon from 'react-native-vector-icons/EvilIcons';
import { withTheme, TextInput } from 'react-native-paper';
import { UserContext } from "../contexts/UserContext";

function Item(props) {
  const { user } = useContext(UserContext);
  const [qty, setQty] = useState('');
  const [notNumber, setNotNumber] = useState(false);
  const { itemDTO } = props.route.params;

  const submit = (e) => {
    e.preventDefault();
    if (parseInt(qty)) {
      user.qty = parseInt(qty);
    } else {
      setNotNumber(true);
    }

  };

  return (
    <View style={styles.screen}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.column}>
            <Text style={styles.text}>{itemDTO.description.toUpperCase()}</Text>
            <Image
              source={{ uri: `data:image/gif;base64,${itemDTO.picture}` }}
              style={styles.image}
            />
          </View>
          <View>
            <Text style={styles.text}>PRICE</Text>
            <TextInput
              mode="outlined"
              disabled
              value={itemDTO.price.toString()}
              style={styles.textInput}
            />
            {notNumber &&
              <Text style={styles.alert}>QUANTITY must be an integer</Text>}
            <Text style={styles.text}>QUANTITY</Text>
            <TextInput
              mode="outlined"
              value={qty}
              label="QUANTITY"
              style={styles.textInput}
              onChangeText={qty => setQty(qty)}
            />
            <Text style={styles.text}>{itemDTO.featureA.toUpperCase()}</Text>
            <TextInput
              mode="outlined"
              disabled
              value={itemDTO.featureValueA.toString().toUpperCase()}
              style={styles.textInput}
            />
            <Text style={styles.text}>{itemDTO.featureB.toUpperCase()}</Text>
            <TextInput
              mode="outlined"
              disabled
              value={itemDTO.featureValueB.toString().toUpperCase()}
              style={styles.textInput}
            />
            <Icon
              name="arrow-right"
              size={Platform.OS === 'web' ? 90 : 60}
              color="#1690aa"
              onPress={submit}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );

}

export default withTheme(Item);

const styles = StyleSheet.create({
  screen: {
    width: "100%",
    flex: 1,
    backgroundColor: theme.colors.itemBackground,
    alignItems: "center",
    justifyContent: "center"
  },

  container: {
    width: (Platform.OS === "web") ? "100%" : "70%",
    flex: 1,
    flexDirection: (Platform.OS === "web") ? "row" : "column",
    backgroundColor: theme.colors.itemBackground,
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: (Platform.OS === "web") ? hp2dp('5%') : 0
  },

  column: {
    marginRight: (Platform.OS === "web") ? wp2dp('10%') : 0
  },

  text: {
    fontSize: (Platform.OS === "web") ? hp2dp('4%') : hp2dp('3%'),
    fontWeight: "bold",
    color: theme.colors.primary,
    padding: 0
  },

  alert: {
    fontSize: (Platform.OS === "web") ? hp2dp('4%') : hp2dp('3%'),
    fontWeight: "bold",
    color: theme.colors.accent,
    padding: 0
  },

  textInput: {
    width: (Platform.OS === "web") ? 360 : 270,
    fontSize: (Platform.OS === "web") ? hp2dp('4%') : hp2dp('3%'),
    fontWeight: "bold",
    backgroundColor: theme.colors.background,
    marginBottom: 20,
    justifyContent: "center"
  },

  image: {
    width: 240,
    height: 270,
    marginTop: 30,
    marginBottom: 30,
    alignSelf: "center"
  },

});
