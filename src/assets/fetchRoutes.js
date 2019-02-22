import keys from './appKeys'; //import api keys

export default async function getRoute(startCoords, destinationCoords) {
    const url = `https://route.api.here.com/routing/7.2/calculateroute.json?app_id=${keys.appID}&app_code=${keys.appCode}&waypoint0=${startCoords.latitude},${startCoords.longitude}&waypoint1=${destinationCoords.latitude},${destinationCoords.longitude}&mode=fastest;car;traffic:enabled`;
    const routPoints = [];

    await fetch(url)
        .then((res) => res.json())
        .then((json) => {
            const routPointsJson = json.response.route[0].leg[0].maneuver;
            for (let i = 0; i < routPointsJson.length; i++) {
                routPoints.push(routPointsJson[i].position);
            }
        });

    return routPoints;
}
