// Simply import the js and have:
// - main_content div
// - search_toggle_button item
let main_content;
let search_toggle_button;

// These are provided by the widget html
let card_search_widget;
let search_button;
let search_input_field;
let card_preview;

import {
    get_card
} from "../modules/card_fetch_api.mjs";

async function fetch_html() {
    const url = "../html/widgets/card_search.html";
    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch html");
            }
            return response.text();
        })
        .then((html) => {
            main_content.innerHTML += html;
        })
}
function startup() {
    main_content = document.getElementById("main_content");

    fetch_html()
    .then((html) => {
        search_button = document.getElementById("card_search_button");
        search_input_field = document.getElementById("card_search_input");
        card_preview = document.getElementById("card-entry");
        card_search_widget = document.getElementById("card_search_widget");
        card_search_widget.hidden = true;
        search_toggle_button = document.getElementById("search_toggle_button");
        search_toggle_button.addEventListener("click", () => {
            card_search_widget.hidden = !card_search_widget.hidden;
        })
        search_button.addEventListener("click", function() { get_card(search_input_field.value, card_preview) });
    })
}

window.onload = function() {
    startup();
}