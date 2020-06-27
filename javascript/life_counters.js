let player_1_life   = 20;
let player_2_life   = 20;

let player_1_rgb_code   = 0;
let player_2_rgb_code   = 0;

let player_1_div        = document.getElementById('player_1');
let player_2_div        = document.getElementById('player_2');
let player_1_counter    = document.getElementById('p1_life');
let player_2_counter    = document.getElementById('p2_life');

let life_buttons     = document.querySelectorAll('.button');

function update_rgb()
{
    player_1_rgb_code   = "rgb(" + (255 * ((25 - player_1_life) / 25)) + "," + (255 * (player_1_life / 25)) + ",0)";
    player_2_rgb_code   = "rgb(" + (255 * ((25 - player_2_life) / 25)) + "," + (255 * (player_2_life / 25)) + ",0)";

    player_1_div.style.backgroundColor = player_1_rgb_code;
    player_2_div.style.backgroundColor = player_2_rgb_code;
    player_1_counter.innerHTML = player_1_life;
    player_2_counter.innerHTML = player_2_life;
}

function inc(player, inc_value)
{
    if(player === 1)
    {
        player_1_life += inc_value;
        if(player_1_life < 0)
            player_1_life = 0;
    } else {
        player_2_life += inc_value;
        if(player_2_life < 0)
            player_2_life = 0;
    }

    update_rgb();
}

update_rgb();

life_buttons[0].addEventListener('click', function(){ inc(1, 5); });
life_buttons[1].addEventListener('click', function(){ inc(1, 1); });
life_buttons[2].addEventListener('click', function(){ inc(1, -1); });
life_buttons[3].addEventListener('click', function(){ inc(1, -5); });
life_buttons[4].addEventListener('click', function(){ inc(2, 5); });
life_buttons[5].addEventListener('click', function(){ inc(2, 1); });
life_buttons[6].addEventListener('click', function(){ inc(2, -1); });
life_buttons[7].addEventListener('click', function(){ inc(2, -5); });
