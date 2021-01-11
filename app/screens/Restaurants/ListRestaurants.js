import React from 'react'
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity,  } from 'react-native';
import { Image } from "react-native-elements";
import { useNavigation, useTheme } from '@react-navigation/native';
import {size} from "lodash";

export default function ListRestaurants(props) {
    const { restaurants, handleLoadMore, isLoadingNewRestaurants } = props;
    const { colors } = useTheme();     
    const navigation = useNavigation();
    // console.log(restaurants);

    return (
        <View>
            {
                size(restaurants) > 0 ? (                    
                    <FlatList                        
                        data={restaurants}
                        renderItem={(restaurantData) => <Restaurant restaurantData={restaurantData} navigation={navigation} /> }
                        keyExtractor={(item, index) => index.toString()}
                        //0.5 antes de llegar al pié de págins
                        onEndReachedThreshold={0.5}
                        onEndReached={handleLoadMore}
                        ListFooterComponent={<FooterList isLoadingNewRestaurants={isLoadingNewRestaurants} />}
                    />
                ) : (
                    <View style={styles.loaderRestaurants}>
                        <ActivityIndicator size="large" />
                        <Text style={{color: colors.text}}>Cargando Restaurantes...</Text>                        
                    </View>
                )
            }
        </View>
    )
}

function Restaurant(props){
    const {restaurantData, navigation} = props;
    const { colors } = useTheme();   
    const { id, images, name, adress, description } = restaurantData.item;
    const imageRestaurant = images[0];    

    //en el array que le enviamos dijo Agustín que solo podemos poner id, que sería lo mísmo que poner id: id
    //De una u otra manera está bien ponerlo, siempre y cuando los nombre de clave/valor sea iguales
    const goRestaurant = () => {
        navigation.navigate("restaurant", {
            id,
            name
        });
    }
    return(
        <TouchableOpacity onPress={goRestaurant}>
            <View style={styles.viewRestaurant}>                
                <View style={styles.viewRestaurantImage}>
                    <Image                    
                        resizeMode="cover"
                        PlaceholderContent={<ActivityIndicator color={colors.primary} />}
                        source={
                            imageRestaurant
                            ? { uri: imageRestaurant }
                            : require("../../../assets/img/no-image.png")
                        }
                        style={styles.imageRestaurant}
                    />
                </View>
                <View>
                    <Text style={[styles.restaurantName, {color: colors.text}]}>{name}</Text>
                    <Text style={[styles.restaurantAdress, {color: colors.textSecondary}]}>{adress}</Text>
                    <Text style={[styles.restaurantDescription, {color: colors.textSecondary}]}>{description.substr(0, 60)}...</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

function FooterList(props){
    const { isLoadingNewRestaurants } = props;
    const { colors } = useTheme();   
    if (isLoadingNewRestaurants) {
        return(
            <View style={styles.loaderRestaurants}>
                <ActivityIndicator color={colors.primary} size="large" />
            </View>
        )
    }else{
        return(
            <View style={styles.notFoundRestaurants}>
                <Text>No quedan restaurantes por cargar</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loaderRestaurants: {
        marginTop: 10,
        marginBottom: 20,
        alignItems: "center"
    },

    viewRestaurant: {
        flexDirection: "row",
        margin: 10,
        // borderWidth: 1,
        // borderColor: "red",
        // backgroundColor: '#f2f2f2',
        // borderRadius: 30,
    },
    viewRestaurantImage: {
        marginRight: 15        
    },
    imageRestaurant: {
        width: 80,
        height: 80,
        // borderLeftWidth: 1,
        // borderTopLeftRadius: 30,
        // borderBottomLeftRadius: 30,        
    },
    restaurantName: {
        fontWeight: "bold"
    },
    restaurantAdress: {
        paddingTop: 2,
        fontWeight: "bold"
        // color: "grey"
    },
    restaurantDescription :{
        paddingTop: 2,
        width: 300
    },

    notFoundRestaurants: {
        marginTop: 10,
        marginBottom: 20,
        alignItems: "center"
    }

});