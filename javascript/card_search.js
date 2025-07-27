let search_button;

function search_card() {
    
}

function startup() {
    search_button = document.getElementById("card_search_button");

    search_button.addEventListener("click", function() { search_card() });
}