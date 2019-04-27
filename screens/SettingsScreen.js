import React from 'react'
import { ExpoConfigView } from '@expo/samples'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  FlatList
} from 'react-native'

import { WebBrowser } from 'expo'

import { MonoText } from '../components/StyledText'

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'About space-finder'
  }

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync('https://github.com/marzipanick')
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.infoText}>
            This App uses: React-Native Expo, Express, Redux, the MapQuest
            geocoding API, and data from the city of New York
          </Text>
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>
            This app was created by Marielle Combier-Kapel
          </Text>

          <View
            style={[styles.codeHighlightContainer, styles.navigationFilename]}
          >
            <TouchableOpacity
              onPress={this._handleHelpPress}
              style={styles.helpLink}
            >
              <Text style={styles.helpLinkText}>view github</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  infoText: {
    color: 'turquoise',
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    paddingTop: 70
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: 'center',
    backgroundColor: 'black',
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'turquoise',
    textAlign: 'center'
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7'
  }
})
