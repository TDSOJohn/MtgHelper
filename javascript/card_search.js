let search_button;
let search_input_field;
let card_preview;

import {
    get_card
} from "./card_fetch_api.mjs";


function startup() {
    search_button = document.getElementById("card_search_button");
    search_input_field = document.getElementById("card_search_input");
    card_preview = document.getElementById("card-entry");

    search_button.addEventListener("click", function() { get_card(search_input_field.value, card_preview) });
}

window.onload = function() {
    startup();
}