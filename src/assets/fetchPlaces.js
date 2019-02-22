import keys from './appKeys'; //import api keys

export async function getRestaurants(lat, long) {
    let places = [];
    let url = `https://places.cit.api.here.com/places/v1/browse?at=${lat},${long}&q=food&size=200&app_id=${keys.hereApi.appID}&app_code=${keys.hereApi.appCode}`;

    await fetch(url)
        .then((res) => res.json())
        .then((json) => {
            const restaurants = json.results.items;

            for (let i = 0; i < restaurants.length; i++) {
                let open;

                if (json.results.items[i].openingHours !== undefined) {
                    open = json.results.items[i].openingHours.isOpen;
                }

                places.push(place = {
                    name: json.results.items[i].title,
                    //remove special characters, and white spaces
                    category: json.results.items[i].category.title.replace(/[^A-Z0-9]/ig, ''),
                    //replace <br/> tags with a coma in the fetched json
                    location: json.results.items[i].vicinity.replace(/<br\/>/g, ', '),
                    lat: json.results.items[i].position[0],
                    lon: json.results.items[i].position[1],
                    distance: json.results.items[i].distance,
                    open
                });
            }
        });

    return places;
}


export async function getPlaceInfo(lat, long, placeName) {
    let placeInfo;

    config = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${keys.yelpApiKey}`,
        },
    };

    await fetch(`https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${long}&term=${placeName}`, config)
        .then(res => res.json())
        .then((json) => {
            const businesses = json.businesses;

            const placeId = businesses[0].id;
            const name = businesses[0].name;
            const category = businesses[0].categories;
            const number = businesses[0].display_phone;
            const image = businesses[0].image_url;
            const price = businesses[0].price;
            const rating = businesses[0].rating;
            const articleUrl = businesses[0].url;

            placeInfo = {
                placeId,
                name,
                category,
                number,
                image,
                rating,
                price,
                articleUrl
            };
        })
        .catch(error => {
            console.log(error);
        });

    return placeInfo;
}