import React, { useState, useContext, useEffect } from "react";
import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';
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
  Badge,
  ProgressBar,
  Colors
} from 'react-native-paper';
import TokenRequestVO from "../models/VOs/TokenRequestVO";
import TokenResponseDTO from "../models/DTOs/TokenResponseDTO";
import LoginVO from "../models/VOs/LoginVO";
import MyDialog from "../components/Dialog";
import { getClientToken, getUserToken } from "../services/APIs/token";
import { UserContext } from "../contexts/UserContext";

function Login(props) {
  const { user, setUser } = useContext(UserContext);
  const [clientId, setClientId] = useState('');
  const [password, setPassword] = useState('');
  const [hiddenPassword, setHiddenPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  var loginVO = new LoginVO();
  let tokenResponseDTO = new TokenResponseDTO();
  let hiddenPasswordFull = '*******************************';

  useEffect(() => {
    token();
  });

  const submit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    loginVO.operator = clientId;
    loginVO.passkey = password;
    signIn();

  };

  const hideDialog = () => {
    setVisible(false);
  }

  const token = () => {
    let tokenRequestVO = new TokenRequestVO();

    getClientToken(tokenRequestVO)
      .then((responseJson) => {
        if ("errors" in responseJson) {
          setTitle("Error");
          setMessage(responseJson.errors.message);
          setVisible(true);
        } else {
          setVisible(false);
          tokenResponseDTO = responseJson;
        }
      })
      .catch(e => {
        setTitle("Error");
        setMessage("Unable to connect to server. Please try again")
      });
  }

  const signIn = () => {
    getUserToken(tokenResponseDTO.token, loginVO)
      .then((responseJson) => {
        setIsSubmitting(false);
        if ("token" in responseJson) {
          user.clientId = loginVO.operator;
          user.password = loginVO.passkey;
          user.token = responseJson.token;
          setClientId("");
          setPassword("");
          setHiddenPassword("");
          props.navigation.navigate('Dashboard');
        } else if ("errors" in responseJson) {
          setTitle("Error");
          setMessage(responseJson.errors.message);
          setVisible(true);
        }
      })
      .catch((error) => {
        setTitle("Error");
        setMessage("Unable to connect to server. Please try again");
        setVisible(true);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>CLIENT ID</Text>
      <TextInput
        mode="outlined"
        value={clientId}
        label="CLIENT ID"
        style={styles.textInput}
        onChangeText={clientId => setClientId(clientId)}
      />
      <Badge
        style={styles.badge}
      >
        {clientId.length}
      </Badge>
      <Text style={styles.text}>PASSWORD</Text>
      <TextInput
        mode="outlined"
        label="PASSWORD"
        value={hiddenPassword}
        style={styles.textInput}
        onChangeText={hiddenPassword => {
          var tmp = '';
          if (hiddenPassword.length >= password.length) {
            tmp = password + hiddenPassword[hiddenPassword.length - 1];
          } else {
            tmp = password.slice(0, -1);
          }
          setHiddenPassword(hiddenPasswordFull.substring(0, tmp.length));
          setPassword(tmp);
        }}
      />
      <Badge
        style={styles.badge}
      >
        {password.length}
      </Badge>
      <Icon
        name="arrow-right"
        size={90}
        color="#1690aa"
        onPress={submit}
      />
      {
        isSubmitting && <ProgressBar
          progress={0.5}
          color={Colors.red800}
          style={styles.progressBar}
          indeterminate
        />
      }
      <MyDialog
        visible={visible}
        title={title}
        message={message}
        hideDialog={hideDialog}
      />
    </View>
  );

}

export default withTheme(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.loginBackground,
    alignItems: "center",
    justifyContent: "center"
  },

  text: {
    fontSize: hp2dp('4%'),
    fontWeight: "bold",
    color: theme.colors.primary,
    padding: 10
  },

  textInput: {
    width: 300,
    fontSize: hp2dp('3%'),
    fontWeight: "bold",
    backgroundColor: theme.colors.background,
    borderColor: theme.colors.primary,
    borderRadius: 40,
    borderWidth: 2,
    padding: 10,
    marginBottom: 0
  },

  badge: {
    alignSelf: "center",
    width: hp2dp('4%'),
    height: hp2dp('4%'),
    fontSize: hp2dp('3%'),
    paddingTop: hp2dp('1%'),
    marginLeft: 220
  },

  progressBar: {
    height: 10,
    width: 300,
    borderRadius: 10,
    marginTop: 20,
  }
});
