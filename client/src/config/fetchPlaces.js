import keys from './appKeys'; //import api keys

export async function getRestaurants(lat, long) {
    let places = []; //array of data fetched from the api
    //url to fetch data from HERE places api
    let url = `https://places.cit.api.here.com/places/v1/browse?at=${lat},${long}&q=food&size=200&app_id=${keys.hereApi.appID}&app_code=${keys.hereApi.appCode}`;

    await fetch(url)
        .then((res) => res.json())
        .then((json) => {
            const restaurants = json.results.items; //array of data

            for (let i = 0; i < restaurants.length; i++) {
                let open; //checks if current restaurant is open

                if (json.results.items[i].openingHours !== undefined) {
                    open = json.results.items[i].openingHours.isOpen;
                }

                places.push(place = {
                    title: json.results.items[i].title,
                    //remove special characters, and white spaces
                    category: json.results.items[i].category.title.replace(/[^A-Z0-9]/ig, ''),
                    //replace <br/> tags with a coma in the fetched json
                    address: json.results.items[i].vicinity.replace(/<br\/>/g, ', '),
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
    let placeInfo; //data array fetched from the api

    //set the api call headers
    config = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${keys.yelpApiKey}`,
        },
    };

    await fetch(`https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${long}&term=${placeName}`, config)
        .then(res => res.json())
        .then((json) => {
            //array of fetched data
            const businesses = json.businesses;

            //check if there is the api call returned any data
            if (businesses instanceof Array && businesses.length > 0) {
                placeInfo = {
                    placeId: businesses[0].id,
                    name: businesses[0].name,
                    category: category = businesses[0].categories,
                    contactNumber: businesses[0].display_phone,
                    image: businesses[0].image_url,
                    rating: businesses[0].rating,
                    price: businesses[0].price,
                    articleUrl: businesses[0].url
                };
            }
        })
        .catch(error => {
            console.log(error);
        });

    return placeInfo;
}

export async function getImages(url) {
    //api call headers
    config = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${keys.yelpApiKey}`,
        },
    };

    let imageUrls = []; //list of data fetched from the api

    await fetch(url)
        .then(res => res.text()) //get the url's html code
        .then(async (html) => {
            //find images url in the article
            const linkElement = html.match(/see-more show-all-overlay\s?.*\>/g);
            if (linkElement === null) {
                imageUrls = await getMainPageImages(html);
            }
            else {
                imageUrls = await followMoreImagesLink(linkElement.toString());
            }
        })
        .catch((err) => console.log(err));

    return imageUrls;
}

async function followMoreImagesLink(url) {
    let imageUrls;

    const imagesUrl = 'https://www.yelp.com/' + url.match(/biz_photos\s?.*\w+/g).toString();
    await fetch(imagesUrl) //follow the url
        .then(res => res.text()) //get the html from that url
        .then((html) => {
            //get image sources
            imageUrls = html.match(/https:\s?.*\b258s.jpg\b/g);
        });

    return imageUrls;
}

async function getMainPageImages(html) {
    //get all the restaurant image elements in the html
    const allImageUrls = html.match(/src="https:\/\/s3-media\d.fl.yelpcdn.com\/bphoto\/\s?.*?\b\w\.jpg\b/g);

    const imageUrls = [];

    //get their urls
    allImageUrls.forEach((item, index) => {
        imageUrls[index] = item.match(/https:\s?.*\b\w\.jpg\b/).toString();
    });

    return imageUrls;
}