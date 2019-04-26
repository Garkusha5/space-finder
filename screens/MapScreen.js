import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Constants, MapView, Location, Permissions } from 'expo'
import { getSpaces } from '../redux/rootReducer'
import { connect } from 'react-redux'

class MapScreen extends React.Component {
  state = {
    info: [],
    locationResult: null,
    location: { coords: { latitude: 37.78825, longitude: -122.4324 } }
  }

  componentDidMount() {
    this._getLocationAsync()

    // fetch('/api/spaces')
    //   .then(data => data.json())
    //   .then(data => this.setState({ info: data }))
    // } catch (error) {
    //   console.error(error.message)
    // }
    this.props.setData()
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
        location
      })
    }

    let location = await Location.getCurrentPositionAsync({})
    this.setState({ locationResult: JSON.stringify(location), location })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={styles.map}
          region={{
            latitude: this.state.location.coords.latitude,
            longitude: this.state.location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          showsUserLocation={true}
        >
          <MapView.Marker
            coordinate={{ latitude: 40.761511, longitude: -73.973493 }}
            //  pinColor={‘aqua’}
          />
        </MapView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1'
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e'
  },
  map: {
    flex: 1
  }
})

const mapDispatchToProps = dispatch => {
  return { setData: () => dispatch(getSpaces()) }
}

export default connect(
  null,
  mapDispatchToProps
)(MapScreen)
