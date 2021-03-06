"use strict";
// Imports
import React, {
  StyleSheet,
  Component,
  Text,
  View,
  LayoutAnimation,
  TouchableHighlight
} from "react-native";

import Swiper from "../../../node_modules/react-native-swiper/dist/index.js";
import * as D from "../Common/DimensionHelper.js";
import { swipeable } from "react-native-gesture-recognizers";
import DeviceInfo from "react-native-device-info";
import FlipCard from "react-native-flip-card";
import MapView from "react-native-maps";
const { directions: { SWIPE_UP, SWIPE_LEFT, SWIPE_DOWN, SWIPE_RIGHT } } = swipeable;

const cardHeight = D.DEVICE_HEIGHT - 56;
const cardWidth = D.DEVICE_WIDTH;
const deviceId = DeviceInfo.getUniqueID().split("-").join("");

// Styles
const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    flex: 1,
    backgroundColor: '#dddddd'
  },
  cardcontainer: {
    flex: 1,
    alignItems: "stretch",
    flexDirection: "row"
  },
  text: {
    color: "#000000",
    fontSize: 36,
    margin: 15,
  },
  transparent: {
    width: 10,
  },

  card: {
    marginTop: 10,
    marginBottom: 68,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    borderRadius: 2,
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    overflow: "hidden"
  },
  viewMap: {
    textAlign: "center",
    marginBottom: 10,
    marginTop: 10
  },
  map: {
    flex: 1, 
  },
  noPosts: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    flexDirection: "column"
  },
  noPostsText: {
    flex: 1, 
    textAlign: "center"
  }
});


// Classes

class SwipeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      y: 0,
      bounceCoords: [],
      maxLat: -999999,
      minLat: 999999,
      maxLon: -999999,
      minLon: 999999,
      centerLon: -1,
      centerLat: -1,
      lonDelta: -1,
      latDelta: -1
    }
  }

  componentDidMount() {
    this.getBouncesForPost(this.props.postId);
  }

  getBouncesForPost(postId) {
    fetch("http://bounce9833.azurewebsites.net/api/post_bounces?post_id=" + postId, {method: "GET"})
    .then((response) => response.json())
    .then((responseData) => {
      var coords = responseData.map(function(e) {
        console.log(responseData);
        return e.loc;
      });
      this.setState({
        bounceCoords: coords
      })

      var maxLat = this.state.maxLat;
      var minLat = this.state.minLat;
      var maxLon = this.state.maxLon;
      var minLon = this.state.minLon;
      coords.forEach(function(e) {
        var lon = e[0];
        var lat = e[1];
        if (lat > maxLat) maxLat = lat;
        if (lat < minLat) minLat = lat;
        if (lon > maxLon) maxLon = lon;
        if (lon < minLon) minLon = lon;
      });

      var centerLon = (maxLon + minLon)/2
      var centerLat = (maxLat + minLat)/2
      var lonDelta = maxLon - minLon;
      var latDelta = maxLat - minLat;

      this.setState({
        maxLat: maxLat,
        minLat: minLat,
        maxLon: maxLon,
        minLon: minLon,
        centerLon: centerLon,
        centerLat: centerLat,
        lonDelta: lonDelta,
        latDelta: latDelta
      });
    })
    .done();
  }

  render() {
    const { cardText, postId } = this.props;
    return ( 
      <View style={styles.cardcontainer}>
        <View style={styles.transparent}>
        </View>
        <FlipCard onFlipped={(isFlipped)=>{this.props.onChange(isFlipped)}}>
          <View style={[styles.card, styles.face]}>
            <Text style={styles.text}>{cardText}</Text>
            <Text style={styles.viewMap}>Tap to View Map</Text>
          </View>
          <View style={[styles.card, styles.back]}>
            <MapView 
              initialRegion={{
                latitude: this.state.centerLat,
                longitude: this.state.centerLon,
                latitudeDelta: this.state.latDelta,
                longitudeDelta: this.state.lonDelta,
              }}
              style={styles.map}
            >
              {this.state.bounceCoords.map(latlng => (
                <MapView.Marker 
                  coordinate={{latitude:latlng[1], longitude:latlng[0]}}
                />
              ))}
            </MapView>
          </View>
        </FlipCard>
        <View style={styles.transparent}>
        </View>
      </View> 
    )
  }
}

SwipeCard = swipeable({down: true})(SwipeCard);

export default class CardView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      index: 0,
      latitude: -1,
      longitude: -1,
      y: 0,
      offset: 0,
      flipped: false,
      loaded: false
    };
  }

  componentDidMount() {
    this.getCurrentLocation();
    // this.setState({
    //   items: [{text: 'asdf'}, {text: 'asdfasdf'}, {text:'asdfasdfasdf'}]
    // });
  }

  onChange = (flipped) => {
    this.setState({ flipped });
  };

  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.state.latitude = position.coords.latitude;
        this.state.longitude = position.coords.longitude;
        this.getPostsAroundLocation();
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
    this.state.loaded = true;
  }

  getPostsAroundLocation() {
    fetch("http://bounce9833.azurewebsites.net/api/post?lat=" + this.state.latitude +
    "&lng=" + this.state.longitude + "&offset=" + this.state.offset, {
      method: "GET"
    })
    .then((response) => response.json())
    .then((responseData) => {
      var posts = responseData.map(function(e) {
        return {text: e.text, y: 0, id: e._id};
      });
      var currItems = this.state.items;
      currItems = currItems.concat(posts);
      this.setState({
        items: currItems,
        offset: this.state.offset + 10
      });
    })
    .done();
  }

  postBounceAtLocation() {
    fetch("http://bounce9833.azurewebsites.net/api/bounce" ,{
      method: "POST",
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify({
        lat: this.state.latitude,
        lng: this.state.longitude,
        user_id: deviceId,
        post_id: this.state.items[this.state.index].id
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
    })
    .done();
  }

  _onMomentumScrollEnd(e, estate, context) {
    var cardIndex = estate.index;
    this.setState({
      index: cardIndex
    });
    var itemsArray = this.state.items
    if (cardIndex == itemsArray.length-1) {
      this.getPostsAroundLocation();
    }
  }

  onSwipeBegin = ({direction, distance, velocity}) => {
    if (this.state.flipped) {
      return;
    }
    this.postBounceAtLocation();
    var newY = 0
    switch(direction) {
      case SWIPE_DOWN:
        newY = 50;
        break;
      default:
        break;
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    var itemsArray = this.state.items;
    itemsArray[this.state.index].y = newY;

    this.setState({
      items: itemsArray
    });

    setTimeout(function() {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      itemsArray[this.state.index].y = -cardHeight;
      this.setState({
        items: itemsArray
      });

      setTimeout(function() {
        itemsArray.splice(this.state.index, 1);
        this.setState({
          items: itemsArray
        });
      }.bind(this), 300);
    }.bind(this), 200);
  };

  render() {
    const { flipped } = this.props;
    if (this.state.items.length == 0 && this.state.loaded) {
      return (
        <View style={styles.noPosts}>
          <Text style={styles.noPostsText}>There are no posts nearby.</Text>
        </View>
      )
    }
    return (
        <Swiper style={styles.wrapper} 
          index={this.state.index} 
          showsButtons={false} 
          height={cardHeight} 
          loop={false} 
          showsPagination={false} 
          onMomentumScrollEnd={this._onMomentumScrollEnd.bind(this)}>
          {this.state.items.map(function(item, index) {
            return (
              <SwipeCard key={index} cardText={item.text} postId={item.id} onSwipeBegin={this.onSwipeBegin}
                swipeDecoratorStyle={{
                  top: item.y,
                  position: 'absolute',
                  height: cardHeight,
                  width: cardWidth}}
                flipped={flipped}
                onChange={this.onChange}/>
            )
          }.bind(this))}
        </Swiper>
    )    
  }

  _onScrollEnd(e) {
    console.log('asdf');
  }

  

} 
