var domparser       = new DOMParser();

var main_content    = document.querySelector('.main_content');
var players = [];
var player_columns;
var life_counts;
var life_buttons_p5;
var life_buttons_p1;
var life_buttons_m1;
var life_buttons_m5;

//  client_side utilities

//  Sanitizes string_in checking for ints. Warning: 11fxoifS => 11, a11b => NaN
function intParser(string_in) {
    const parsed = parseInt(string_in, 10);
    if(isNaN(parsed) && (parsed !== null)) {
        return 1;
    }
    return parsed;
}

//  Player class containing life, rgb value and DOM update methods and values
function Player(div_in, counter_in) {
    this.life       = 20;
    this.rgb_code   = "";
    this.div        = div_in;
    this.counter    = counter_in;

    this.updateRgb  = function() {
        this.rgb_code   = "rgb(" + (255 * ((25 - this.life) / 25)) + "," + (255 * (this.life / 25)) + ",0)";
        this.div.style.backgroundColor = this.rgb_code;
        this.counter.innerHTML = this.life;
    };

    this.hit        = function(dmg_val) {
        this.life  += dmg_val;
        this.updateRgb();
    };
}

function addPlayer(div_in, counter_in) {
    let temp_player = new Player(div_in, counter_in);
    players.push(temp_player);
}

function startup() {
    player_columns  = document.querySelectorAll('.column');
    life_counts     = document.querySelectorAll('.player_life');

    for(let i = 0; i < 2; i++) {
        addPlayer(player_columns[i], life_counts[i]);
        players[i].updateRgb();
    }

    life_buttons_p5 = document.querySelectorAll('.button_p5');
    life_buttons_p1 = document.querySelectorAll('.button_p1');
    life_buttons_m1 = document.querySelectorAll('.button_m1');
    life_buttons_m5 = document.querySelectorAll('.button_m5');

    // is there a better option? not really elegante...
    life_buttons_p5[0].addEventListener('click', function() { players[0].hit(5); });
    life_buttons_p5[1].addEventListener('click', function() { players[1].hit(5); });
    life_buttons_p1[0].addEventListener('click', function() { players[0].hit(1); });
    life_buttons_p1[1].addEventListener('click', function() { players[1].hit(1); });
    life_buttons_m1[0].addEventListener('click', function() { players[0].hit(-1); });
    life_buttons_m1[1].addEventListener('click', function() { players[1].hit(-1); });
    life_buttons_m5[0].addEventListener('click', function() { players[0].hit(-5); });
    life_buttons_m5[1].addEventListener('click', function() { players[1].hit(-5); });

}

window.onload = startup();
