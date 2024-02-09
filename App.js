  import React,{useState} from 'react';
  import {View, Image, StyleSheet, Dimensions, Animated, PanResponder} from 'react-native';
  const { width: SCREEN_WIDTH } = Dimensions.get('window'); 


  const App = () => {

    const pan = new Animated.ValueXY();

    
    const [swipeDir, setSwipeDir] = useState(null);
    const onSwipeComplete = (dir) => {
      setSwipeDir(dir);
    }


    const panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x }], { useNativeDriver: false }),
      onPanResponderRelease: (e, gestureState) => {
    onPanResponderRelease(e, gestureState);
  }
    });
    const onPanResponderRelease = (e, {dx}) => {
      if (dx < -120) {
        onSwipeComplete('left');
      } else if (dx > 120) {
        onSwipeComplete('right');
      } 
    }

    return (

      <Animated.View style={[styles.container,{transform: [{ translateX: pan.x }]}] } 
      {...panResponder.panHandlers} >
        
        
        <Image
            style={[styles.image]}
            source={require('./images/red.png')}
        />
  {swipeDir === 'left' && (
        <Animated.Image
          style = {[styles.cross]}
          source={require('./images/cross.png')}
        />
  )}

  {swipeDir === 'right' && (
        <Animated.Image
          style = {[styles.tick]}
          source={require('./images/tick.png')}
        />    
  )}

      </Animated.View>
    );
  };

 

  const handleSwipeComplete = () => {
    return(
      <View>
        <Text>
          NO CARDS
        </Text>
      </View>
    )
  }

  const styles = StyleSheet.create({
    image: {
      width: 200,
      height: 300,
      resizeMode: 'cover',
      position: 'absolute',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: 'transparent',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    cross:{
      height:50,
      width:50,
      position: 'absolute',
      top: 260, 
      left: 100,
    },
    tick:{
      height:50,
      width:50,
      position: 'absolute',
      top: 260, 
      left: 244,
    }
  });

  export default App;