var players = [];

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


let life_buttons    = document.querySelectorAll('.button');
let player_names    = document.querySelectorAll('.player_name');
let life_counts     = document.querySelectorAll('.player_life');
let player_columns  = document.querySelectorAll('.column');

addPlayer(player_columns[0], life_counts[0]);
players[0].updateRgb();

addPlayer(player_columns[1], life_counts[1]);
players[1].updateRgb();

life_buttons[0].addEventListener('click', function(){ players[0].hit(5); });
life_buttons[1].addEventListener('click', function(){ players[0].hit(1); });
life_buttons[2].addEventListener('click', function(){ players[0].hit(-1); });
life_buttons[3].addEventListener('click', function(){ players[0].hit(-5); });
life_buttons[4].addEventListener('click', function(){ players[1].hit(5); });
life_buttons[5].addEventListener('click', function(){ players[1].hit(1); });
life_buttons[6].addEventListener('click', function(){ players[1].hit(-1); });
life_buttons[7].addEventListener('click', function(){ players[1].hit(-5); });
