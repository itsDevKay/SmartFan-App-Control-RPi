import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
  View
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class App extends React.Component {
  state = {
    isOn: false,
    redColor: '#f14668',
    greenColor: '#4ecca3'
  }

  shouldTurnOff = async (shouldTurnOff) => {
    this.setState({ isOn: shouldTurnOff ? false : true });
    
    let endpoint = shouldTurnOff ? 'turn-off' : 'turn-on';

    await fetch('http://example.com/' + endpoint, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': "application/json",
        'Token': <<API_KEY>>,
      })
    }).then(res => res.json())
    .then(data => {
      console.log(data);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.headerContainer}>
          <Text style={styles.HeaderText}>SmartFan Control</Text>
        </View>

        <View style={styles.fanStateContainer}>
          <Text style={styles.fanState}>Fan is turned: </Text>
          <Text style={[styles.fanStateSignal, {
            color: this.state.isOn ? this.state.greenColor : this.state.redColor
          }]}>{ this.state.isOn ? 'on' : 'off' }</Text>
        </View>
        <TouchableOpacity
          style={[styles.buttonSwitch, { backgroundColor: this.state.greenColor }]}
          onPress={() => this.shouldTurnOff(false)}
        >
          <Text style={styles.turnOn}>Turn On</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonSwitch, { backgroundColor: this.state.redColor, marginTop: 15, }]}
          onPress={() => this.shouldTurnOff(true)}
        >
          <Text style={styles.turnOff}>Turn Off</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232931',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    top: 0,
    position: 'absolute',
    paddingTop: 50,
    paddingBottom: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: Dimensions.get('window').width,
  },
  HeaderText: {
    color: '#eeeeee',
    fontSize: 18,
    fontWeight: 'bold',
  },
  fanStateContainer: {
    flexDirection: 'row',
  },
  fanState: {
    color: '#eeeeee',
    fontSize: 18,
    paddingBottom: 50,
  },
  fanStateSignal: {
    color: '#eeeeee',
    fontSize: 18,
    paddingBottom: 50,
  },
  buttonSwitch: {
    width: Dimensions.get('window').width /1.3,
    paddingVertical: 20,
    borderRadius: 10,
  },
  turnOn: {
    color: '#eeeeee',
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  turnOff: {
    color: '#eeeeee',
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
  }
});
