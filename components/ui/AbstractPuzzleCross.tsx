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

const SHAPE_SIZE = 64;

export default function AbstractPuzzleCross() {
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

    const centerStyle = useAnimatedStyle(() => {
        return {
            opacity: progress.value * 0.6 + 0.1, // Reduced opacity
            transform: [{ scale: progress.value * 0.5 + 0.5 }]
        };
    });

    const topStyle = useAnimatedStyle(() => {
        const ty = -150 * (1 - progress.value) - SHAPE_SIZE;
        return {
            transform: [{ translateY: ty }],
            opacity: progress.value * 0.6 + 0.1
        };
    });

    const bottomStyle = useAnimatedStyle(() => {
        const ty = 150 * (1 - progress.value) + SHAPE_SIZE;
        return {
            transform: [{ translateY: ty }],
            opacity: progress.value * 0.6 + 0.1
        };
    });

    const leftStyle = useAnimatedStyle(() => {
        const tx = -150 * (1 - progress.value) - SHAPE_SIZE;
        return {
            transform: [{ translateX: tx }],
            opacity: progress.value * 0.6 + 0.1
        };
    });

    const rightStyle = useAnimatedStyle(() => {
        const tx = 150 * (1 - progress.value) + SHAPE_SIZE;
        return {
            transform: [{ translateX: tx }],
            opacity: progress.value * 0.6 + 0.1
        };
    });

    const containerStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { scale: breathe.value } // Apply breathing to the entire assembled cross
            ]
        };
    });

    return (
        <View style={styles.wrapper}>
            <Animated.View style={[styles.container, containerStyle]}>
                <Animated.View style={[styles.piece, styles.center, centerStyle]} />
                <Animated.View style={[styles.piece, styles.top, topStyle]} />
                <Animated.View style={[styles.piece, styles.bottom, bottomStyle]} />
                <Animated.View style={[styles.piece, styles.left, leftStyle]} />
                <Animated.View style={[styles.piece, styles.right, rightStyle]} />
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    piece: {
        position: 'absolute',
        width: SHAPE_SIZE,
        height: SHAPE_SIZE,
        borderRadius: 20, // Rounded smooth puzzle pieces
        ...Theme.shadows.soft,
    },
    center: {
        backgroundColor: '#E0F2F1', // Mint Green
        zIndex: 5,
    },
    top: {
        backgroundColor: '#A2D2FF', // Light Blue
        zIndex: 4,
    },
    bottom: {
        backgroundColor: '#A2D2FF', // Light Blue
        zIndex: 3,
    },
    left: {
        backgroundColor: '#CDB4DB', // Lavender
        zIndex: 2,
    },
    right: {
        backgroundColor: '#CDB4DB', // Lavender
        zIndex: 1,
    }
});
