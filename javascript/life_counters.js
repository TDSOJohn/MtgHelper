
import * as utilities from './utilities.js';

const baseURL       = '192.168.1.110';
const templ_path    = '/html/';

var players         = [];
var domparser       = new DOMParser();
var xhr             = new XMLHttpRequest();

var main_content    = document.querySelector('.main_content');
var player_columns;
var life_counts;
var life_buttons_p5;
var life_buttons_p1;
var life_buttons_m1;
var life_buttons_m5;

const callAPI       = async (myURL) =>
{
    let file        = "";

    const response  = await fetch(myURL);
    file            = await response.text();
    return file;
}

//  Player class containing life, rgb value and DOM update methods and values
function Player(div_in, counter_in)
{
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

function addPlayer(div_in, counter_in)
{
    let temp_player = new Player(div_in, counter_in);
    players.push(temp_player);
}

function startup()
{
    let players_num = utilities.getQueryVariable('pl');
    if(players_num  = -1) {
        players_num = 2;
    }
    alert(players_num);

    let myURL = baseURL + templ_path + 'player_template.html';
    callAPI(myURL).then(result => {
        main_content.insertAdjacentHTML('beforeend', result);
    });

    player_columns  = document.querySelectorAll('.column');
    life_counts     = document.querySelectorAll('.player_life');
    life_buttons_p5 = document.querySelectorAll('.button_p5');
    life_buttons_p1 = document.querySelectorAll('.button_p1');
    life_buttons_m1 = document.querySelectorAll('.button_m1');
    life_buttons_m5 = document.querySelectorAll('.button_m5');

    for(let i = 0; i < players_num; i++) {
        addPlayer(player_columns[i], life_counts[i]);
        player[i].updateRgb();
    }

    for(const button of life_buttons_p5) {
        button.addEventListener('click', function() { players[0].hit(5); });
    }
    for(const button of life_buttons_p1) {
        button.addEventListener('click', function() { players[0].hit(1); });
    }
    for(const button of life_buttons_m1) {
        button.addEventListener('click', function() { players[0].hit(-1); });
    }
    for(const button of life_buttons_m5) {
        button.addEventListener('click', function() { players[0].hit(-5); });
    }
}
