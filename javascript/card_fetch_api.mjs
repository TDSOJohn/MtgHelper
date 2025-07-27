export { search_card }

const re = /^([a-z0-9]{3,6}):(\d{1,5})$/i;

function search_card(search_value) {
    console.log(search_value);
    const parsed = search_value.match(re);
    console.log("set:", parsed[1]);
    console.log("cn:", parsed[2]);
}
