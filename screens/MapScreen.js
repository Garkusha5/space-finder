import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Polyline } from 'react-native-maps'
import MapView from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import {
  Constants,
  // MapView,
  Location,
  Permissions,
  Image,
  TouchableHighlight
} from 'expo'
import { getSpaces, getDirections } from '../redux/rootReducer'
import { connect } from 'react-redux'
// import console = require('console');

class MapScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      info: [],
      locationResult: null,
      location: { coords: { latitude: 40.7051, longitude: -74.0092 } }
    }
    this.markerClick = this.markerClick.bind(this)
  }

  static navigationOptions = {
    title: 'Zoom in!'
  }

  componentDidMount() {
    this._getLocationAsync()
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

  markerClick(cLa, cLn, la, ln) {
    return this.props.getDirections(cLa, cLn, la, ln)
  }

  render() {
    // console.log(this.props.directions.route.legs.maneuvers)
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
          {this.props.data !== undefined &&
            this.props.data.map(space => (
              <View key={space.id}>
                <MapView.Marker
                  coordinate={{
                    latitude: Number(space.latitude),
                    longitude: Number(space.longitude)
                  }}
                  title={space.address}
                  description={`${space.buildingName}: ${space.type1} ${
                    space.type2
                  } ${space.type3} ${space.type4} ${space.type5}`}
                  pinColor={'turquoise'}
                  onPress={() =>
                    this.markerClick(
                      this.state.location.coords.latitude,
                      this.state.location.coords.longitude,
                      space.latitude,
                      space.longitude
                    )
                  }
                />
                <MapViewDirections
                  origin={this.state.location.coords}
                  destination={{
                    latitude: Number(space.latitude),
                    longitude: Number(space.longitude)
                  }}
                  apikey={'AIzaSyDnOAEaMvhSODFq3NrLSOxOkCXG-ITPUfM'}
                  strokeWidth={3}
                  strokeColor="hotpink"
                />
              </View>
            ))}
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
  },
  customView: {
    backgroundColor: 'aqua'
  },
  calloutText: {
    color: 'grey'
  }
})

const mapDispatchToProps = dispatch => {
  return {
    setData: () => dispatch(getSpaces()),
    getDirections: (curLoc, lat, lng) =>
      dispatch(getDirections(curLoc, lat, lng))
  }
}

const mapStateToProps = state => {
  console.log(state.directions)
  return { data: state.spaces, directions: state.directions }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapScreen)
