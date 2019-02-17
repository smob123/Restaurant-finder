import keys from './appKeys'; //import api keys

export default async function getData(lat, long) {
    let places = [];
    let url = `https://places.cit.api.here.com/places/v1/browse?at=${lat},${long}&q=food&size=200&app_id=${keys.appID}&app_code=${keys.appCode}`;

    await fetch(url)
        .then((res) => res.json())
        .then((json) => {
            const restaurants = json.results.items;

            for (let i = 0; i < restaurants.length; i++) {
                let type, hours, open;

                if (json.results.items[i].openingHours !== undefined) {
                    //replace <br/> tags with a coma in the fetched json
                    hours = json.results.items[i].openingHours.text.replace(/<br\/>/g, ', ');
                    open = json.results.items[i].openingHours.isOpen;
                }

                if (json.results.items[i].tags !== undefined) {
                    type = json.results.items[i].tags[0].title;
                }

                places.push(place = {
                    name: json.results.items[i].title,
                    //remove special characters, and white spaces
                    category: json.results.items[i].category.title.replace(/[^A-Z0-9]/ig, ''),
                    type,
                    //replace <br/> tags with a coma in the fetched json
                    location: json.results.items[i].vicinity.replace(/<br\/>/g, ', '),
                    lat: json.results.items[i].position[0],
                    lon: json.results.items[i].position[1],
                    distance: json.results.items[i].distance,
                    hours,
                    open
                });
            }
        });

    return places;
}
