import keys from './appKeys';

export default async function getData(lat, long, num) {
    let places = [];
    let url = `https://places.cit.api.here.com/places/v1/browse?at=${lat},${long}&q=food&size=200&app_id=${keys.appID}&app_code=${keys.appCode}`;

    await fetch(url)
        .then((res) => res.json())
        .then((json) => {
            for (let i = 0; i < json.results.items.length; i++) {
                places.push(place = {
                    name: json.results.items[i].title,
                    icon: json.results.items[i].icon,
                    location: json.results.items[i].vicinity.replace('<br/>', ', '),
                    lat: json.results.items[i].position[0],
                    lon: json.results.items[i].position[1]
                });
            }
        });

    return places;
}
