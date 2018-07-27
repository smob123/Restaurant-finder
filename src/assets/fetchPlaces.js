import data from './keys';

export default async function getData(lat, long, num) {
    let places = [];
    let url = 'https://api.foursquare.com/v2/venues/explore?client_id=' + data.clientID + '&client_secret=' + data.clientSecret +
            '&v=20180101&ll=' + lat + ',' + long + '&radius=2000&query=food&limit=' + num;
    await fetch(url)
            .then(fetch.throwErrors)
            .then((res) => res.json())
            .then((json) => {
                if (json.response.groups) {
                    for (let i = 0; i < json.response.groups.length; i++) {
                        for (let j = 0; j < json.response.groups[0].items.length; j++) {
                            name = json.response.groups[i].items[j].venue.name;
                            location = json.response.groups[i].items[j].venue.location.formattedAddress[0];
                            latitude = json.response.groups[i].items[j].venue.location.lat;
                            longitude = json.response.groups[i].items[j].venue.location.lng;
                            places.push(place = {
                                name: name,
                                location: location,
                                lat: latitude,
                                lon: longitude
                            });
                        }
                    }
                }
            });

    return places;
}
