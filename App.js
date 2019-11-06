import * as React from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Vibration } from 'react-native';
import Constants from 'expo-constants';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Counter />
      </View>
    );
  }
}

class Counter extends React.Component {
  constructor() {
    super();
    this.state = {
      workSeconds: 0,
      workMinutes: 5,
      playSeconds: 0,
      playMinutes: 3,
      togglePauseStart: true,
      isWorkClock: true,
    };
  }

  componentWillUnmount() {
    clearInterval(this.secondInterval);
  }

  startTimer() {
    this.secondInterval = setInterval(this.decrementSeconds, 1000);
  }

  pauseTimer() {
    clearInterval(this.secondInterval);
  }

  decrementSeconds = () => {
    if (this.state.isWorkClock) {
      if (this.state.workMinutes === 0 && this.state.workSeconds === 0) {
        Vibration.vibrate([500, 500, 500]);
        console.log('bzzzz');
        this.toggleClocks();
      }

      if (this.state.workSeconds === 0) {
        this.setState({ workSeconds: 6 }), this.decrementWorkMinutes();
      }

      this.setState(previousState => ({
        workSeconds: previousState.workSeconds - 1,
      }));
    } else {
      if (!this.state.isWorkClock) {
        if (this.state.playMinutes === 0 && this.state.playSeconds === 0) {
          Vibration.vibrate([500, 500, 500]);
          console.log('bzzzz');
          this.toggleClocks();
        }

        if (this.state.playSeconds === 0) {
          this.setState({ playSeconds: 4 }), this.decrementPlayMinutes();
        }

        this.setState(previousState => ({
          playSeconds: previousState.playSeconds - 1,
        }));
      }
    }
  };

  decrementWorkMinutes() {
    this.setState(previousState => ({
      workMinutes: previousState.workMinutes - 1,
    }));
  }

  decrementPlayMinutes() {
    this.setState(previousState => ({
      playMinutes: previousState.playMinutes - 1,
    }));
  }

  reset = () => {
    clearInterval(this.secondInterval);
    this.setState({ workMinutes: 5 });
    this.setState({ workSeconds: 0 });
    this.setState({ playMinutes: 3 });
    this.setState({ playSeconds: 0 });
    this.setState({ togglePauseStart: true,
      isWorkClock: true,})
  }

  toggleClocks = () => {
    this.setState(prevState => ({
      isWorkClock: !prevState.isWorkClock,
    }));
    clearInterval(this.secondInterval);
    this.setState({ workMinutes: 5 });
    this.setState({ workSeconds: 0 });
    this.setState({ playMinutes: 3 });
    this.setState({ playSeconds: 0 });

    this.startTimer();
  };

  togglePauseStart = () => {
    this.setState(prevState => ({
      togglePauseStart: !prevState.togglePauseStart,
    }));
    console.log(this.state.togglePauseStart);
    if (this.state.togglePauseStart) {
      this.startTimer();
    } else {
      this.pauseTimer();
    }
  };

  render() {
    if (this.state.isWorkClock) {
      if (this.state.togglePauseStart) {
        return (
          <View style={styles.appContainer}>
            <View style={styles.buttons}>
              <Button title="Start" onPress={this.togglePauseStart} />
              <Button  color="green" title="Reset" onPress={this.reset} />
            </View>
            <Text style={styles.workTimerText}>Work Timer</Text>
            <Text style={styles.count}>
              {this.state.workMinutes}:{this.state.workSeconds}
            </Text>
          </View>
        );
      } else {
        return (
          <View style={styles.appContainer}>
            <View style={styles.buttons}>
              <Button title="Pause" onPress={this.togglePauseStart} />
              <Button color="green" title="Reset" onPress={this.reset} />
            </View>
            <Text style={styles.workTimerText}>Work Timer</Text>
            <Text style={styles.count}>
              {this.state.workMinutes}:{this.state.workSeconds}
            </Text>
          </View>
        );
      }
    } else if (!this.state.isWorkClock) {
      if (this.state.togglePauseStart) {
        return (
          <View style={styles.appContainer}>
            <View style={styles.buttons}>
              <Button title="Start" onPress={this.togglePauseStart} />
              <Button color="green" title="Reset" onPress={this.reset} />
            </View>
            <Text style={styles.playTimerText}>Play Timer</Text>
            <Text style={styles.count}>
              {this.state.playMinutes}:{this.state.playSeconds}
            </Text>
          </View>
        );
      } else {
        return (
          <View style={styles.appContainer}>
            <View style={styles.buttons}>
              <Button title="Pause" onPress={this.togglePauseStart} />
              <Button color="green" title="Reset" onPress={this.reset} />
            </View>
            <Text style={styles.playTimerText}>Play Timer</Text>
            <Text style={styles.count}>
              {this.state.playMinutes}:{this.state.playSeconds}
            </Text>
          </View>
        );
      }
    }
  }
}

const styles = StyleSheet.create({
  buttons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
  },
  count: {
    fontSize: 48,
  },
  playTimerText: {
    fontSize: 36,
    color: 'red',
  },
  workTimerText: {
    fontSize: 36,
    color: 'green',
  },
});
