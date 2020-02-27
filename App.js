import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { ScreenOrientation } from 'expo';
import { DeviceMotion } from 'expo-sensors';

export default class App extends React.Component {
  state = {
    data: {},
  }

  componentDidMount() {
    ScreenOrientation.getOrientationAsync().then(data => this.setState({data}));
    DeviceMotion.isAvailableAsync().then(console.log)
    ScreenOrientation.addOrientationChangeListener((e, f) => this.setState({e, f}));
    DeviceMotion.addListener(({rotation}) => {
      const alpha = Math.abs(rotation.alpha);
      this.setState({
        rotation,
        ori: alpha > 3 || (alpha > 0 && alpha < 0.5) ? 'landscape' : 'protrait'
      });
    });
  }

  render() {
    const {a, b, c, d, e, f, data} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          {/* {Date.now()}
          {JSON.stringify(this.state, null, 2)} */}
          {this.state.ori}: {this.state.rotation?.alpha}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
