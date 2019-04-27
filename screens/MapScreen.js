import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Constants, MapView, Location, Permissions, Image } from 'expo'
import { getSpaces } from '../redux/rootReducer'
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
  }

  static navigationOptions = {
    title: 'Map of Spaces'
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
          {this.props.data[0] !== undefined &&
            this.props.data[0].map(space => (
              <MapView.Marker
                key={space.id}
                coordinate={{
                  latitude: Number(space.latitude),
                  longitude: Number(space.longitude)
                }}
                title={space.buildingName || space.address}
                description={
                  space.type1 ||
                  space.type2 ||
                  space.type3 ||
                  space.type4 ||
                  space.type5
                }
                pinColor={'turquoise'}
              />
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
  }
})

const mapDispatchToProps = dispatch => {
  return { setData: () => dispatch(getSpaces()) }
}

const mapStateToProps = state => {
  return { data: state }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapScreen)
