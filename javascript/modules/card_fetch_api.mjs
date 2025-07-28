export { get_card }

const set_cn_re = /^([a-z0-9]{3,6}):(\d{1,5})$/i;

let input_card = {
    set: "",
    cn: "",
    image_url: ""
}

function get_card(search_value, card_place) {
    parse_set_cn(search_value);
    get_scryfall_data().then((response) => {
        card_place.innerHTML = `<img src="${input_card.image_url}">`;
    });
}

// parse set and ct from string
function parse_set_cn(search_value) {
    console.log(search_value);
    const parsed = search_value.match(set_cn_re);
    input_card.set = parsed[1];
    input_card.cn = parsed[2];
    console.log("set:", input_card.set);
    console.log("cn:", input_card.cn);
}

// get scryfall data from input_card
// and set missing data
async function get_scryfall_data() {
    const url = `https://api.scryfall.com/cards/${input_card.set}/${input_card.cn}`;
    return fetch(url)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    })
    .then((json) => {
        input_card.image_url = json.image_uris.normal;
    });
}