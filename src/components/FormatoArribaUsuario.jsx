import React from 'react';
import { StyleSheet, Image, View, Pressable } from 'react-native';
import { useNavigate } from 'react-router-dom';

export default function BarraConBoton() {
    const navigate = useNavigate();

    return (
        <View style={styles.header}>
            <Pressable
                style={styles.navButton}
                onPress={() => navigate('/PrincipalUsuario')}
            >
                <Image
                    source={require('E:/Construccion de Software/Mates/assets/images/mate.png')}
                    style={styles.image}
                    resizeMode="contain"
                />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#E1A5E7',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#E1A5E7',
    },
    image: {
        width: 30,
        height: 30,
    },
    navButton: {
        padding: 5,
        backgroundColor: '#E1A5E7',
        borderRadius: 5,
    },
});
