import React from "react";

const imagePaths = {
    mogwai: {
            happy: {
                brown: require ("../assets/gremlins/mogwai/happy/happy.gizmo-brown.png"),
                green: require ("../assets/gremlins/mogwai/happy/happy.gizmo-green.png"),
                purple: require ("../assets/gremlins/mogwai/happy/happy.gizmo-purple.png"),
                red: require ("../assets/gremlins/mogwai/happy/happy.gizmo-red.png"),
            },
            sad: {
                red: require ("../assets/gremlins/mogwai/sad/sad.gizmo-red.png"),
                green: require ("../assets/gremlins/mogwai/sad/sad.gizmo-green.png"),
                brown: require ("../assets/gremlins/mogwai/sad/sad.gizmo-brown.png"),
                purple: require ("../assets/gremlins/mogwai/sad/sad.gizmo-purple.png"),
            },
            costume: {
                red: require ("../assets/gremlins/mogwai/costume/costume.gizmo-red.png"),
                green: require ("../assets/gremlins/mogwai/costume/costume.gizmo-green.png"),
                brown: require ("../assets/gremlins/mogwai/costume/costume.gizmo-brown.png"),
                purple: require ("../assets/gremlins/mogwai/costume/costume.gizmo-purple.png"),
            },
        },
        gremlin: {
            happy: {
                red: require ("../assets/gremlins/gremlin/happy/happy.stripe-red.png"),
                green: require ("../assets/gremlins/gremlin/happy/happy.stripe-green.png"),
                brown: require ("../assets/gremlins/gremlin/happy/happy.stripe-brown.png"),
                purple: require ("../assets/gremlins/gremlin/happy/happy.stripe-purple.png"),
            },
            sad: {
                red: require ("../assets/gremlins/gremlin/sad/sad.stripe-red.png"),
                green: require ("../assets/gremlins/gremlin/sad/sad.stripe-green.png"),
                brown: require ("../assets/gremlins/gremlin/sad/sad.stripe-brown.png"),
                purple: require ("../assets/gremlins/gremlin/sad/sad.stripe-purple.png"),
            },
            costume: {
                red: require ("../assets/gremlins/gremlin/costume/costume.stripe-red.png"),
                green: require ("../assets/gremlins/gremlin/costume/costume.stripe-green.png"),
                brown: require ("../assets/gremlins/gremlin/costume/costume.stripe-brown.png"),
                purple: require ("../assets/gremlins/gremlin/costume/costume.stripe-purple.png"),
            },
        },
    };

    const GremlinImage = ({ mood, type, color, ...props }) => {
        const imagePath = imagePaths[type]?.[mood]?.[color];

        if (!imagePath) {
                console.error("No image found for", { mood, type, color });
                return null;
            }

        return (
            <img
                src={imagePath}
                alt={`${mood} ${type} gremlin (${color})`}
                {...props}
            />
        );
    };

    export default GremlinImage;