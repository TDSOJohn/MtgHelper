let search_button;
let search_input_field;

import {
    search_card
} from "./card_fetch_api.mjs";


function startup() {
    search_button = document.getElementById("card_search_button");
    search_input_field = document.getElementById("card_search_input");

    search_button.addEventListener("click", function() { search_card(search_input_field.value) });
}

window.onload = function() {
    startup();
}