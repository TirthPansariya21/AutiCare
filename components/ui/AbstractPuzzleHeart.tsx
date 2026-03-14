import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { 
    useSharedValue, 
    useAnimatedStyle, 
    withTiming, 
    withRepeat, 
    withSequence,
    Easing 
} from 'react-native-reanimated';
import { Theme } from './Theme';

const SHAPE_SIZE = 96;

export default function AbstractPuzzleHeart() {
    const progress = useSharedValue(0);
    const breathe = useSharedValue(1);

    useEffect(() => {
        // Slow calming animation to assemble (4 seconds)
        progress.value = withTiming(1, { 
            duration: 4000, 
            easing: Easing.bezier(0.25, 0.1, 0.25, 1) 
        }, () => {
            // Gentle breathing effect afterwards
            breathe.value = withRepeat(
                withSequence(
                    withTiming(1.04, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
                    withTiming(1, { duration: 3000, easing: Easing.inOut(Easing.ease) })
                ),
                -1,
                true
            );
        });
    }, []);

    const leftCircleStyle = useAnimatedStyle(() => {
        const targetTx = -SHAPE_SIZE / 2;
        const targetTy = 0;
        const tx = (-150 * (1 - progress.value)) + targetTx;
        const ty = (50 * (1 - progress.value)) + targetTy;
        return {
            transform: [{ translateX: tx }, { translateY: ty }],
            opacity: progress.value * 0.8 + 0.2
        };
    });

    const rightCircleStyle = useAnimatedStyle(() => {
        const targetTx = 0;
        const targetTy = -SHAPE_SIZE / 2;
        const tx = (50 * (1 - progress.value)) + targetTx;
        const ty = (-150 * (1 - progress.value)) + targetTy;
        return {
            transform: [{ translateX: tx }, { translateY: ty }],
            opacity: progress.value * 0.8 + 0.2
        };
    });

    const squareStyle = useAnimatedStyle(() => {
        const tx = 100 * (1 - progress.value); 
        const ty = 100 * (1 - progress.value);
        return {
            transform: [{ translateX: tx }, { translateY: ty }],
            opacity: progress.value * 0.8 + 0.2
        };
    });

    const containerStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { rotate: '45deg' },
                { scale: breathe.value } // Apply breathing to the entire assembled heart
            ]
        };
    });

    return (
        <View style={styles.wrapper}>
            <Animated.View style={[styles.container, containerStyle]}>
                <Animated.View style={[styles.piece, styles.square, squareStyle]} />
                <Animated.View style={[styles.piece, styles.leftCircle, leftCircleStyle]} />
                <Animated.View style={[styles.piece, styles.rightCircle, rightCircleStyle]} />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        width: 200,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    container: {
        width: SHAPE_SIZE,
        height: SHAPE_SIZE,
    },
    piece: {
        position: 'absolute',
        width: SHAPE_SIZE,
        height: SHAPE_SIZE,
        ...Theme.shadows.soft,
    },
    square: {
        borderRadius: 25, // Soft rounded corners for the bottom diamond piece
        backgroundColor: '#CDB4DB', // Lavender
        top: 0,
        left: 0,
        zIndex: 1,
    },
    leftCircle: {
        borderRadius: SHAPE_SIZE / 2,
        backgroundColor: '#A2D2FF', // Light Blue
        top: 0,
        left: 0,
        zIndex: 2,
    },
    rightCircle: {
        borderRadius: SHAPE_SIZE / 2,
        backgroundColor: '#E0F2F1', // Mint Green
        top: 0,
        left: 0,
        zIndex: 3,
    }
});
