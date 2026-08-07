import { init_mana, setup_mana_ui } from './mana_counters.js';

let players = [];
let player_life_columns;
let life_counts;
let life_buttons_p1;
let life_buttons_m1;

let player_poison_columns;
let poison_counts;
let poison_buttons_p1;
let poison_buttons_m1;

let poison_toggle_button;
let poison_toggle_image;
let poison_toggled = false;

let undo_button;

let dice;
let canvas;

let d6_images = []

const STORAGE_KEY = 'mtg_helper_state';
let booting = true;

//  Player class containing life, rgb value and DOM update methods and values
function Player(life_div_in, life_counter_in, poison_div_in, poison_counter_in) {
    this.life       = 20;
    this.poison     = 0;
    this.rgb_code   = "";
    this.life_div   = life_div_in;
    this.life_counter = life_counter_in;
    this.poison_div = poison_div_in;
    this.poison_counter = poison_counter_in;

    init_mana(this);

    this.update_rgb  = function() {
        this.rgb_code = "rgb(" + (255 * ((25 - this.life) / 25)) + "," + (255 * (this.life / 25)) + ",0)";
        this.life_div.style.backgroundColor = this.rgb_code;
        this.life_counter.innerHTML = this.life;
        save_state();
    };
    
    this.update_poison = function() {
        this.rgb_code  = "rgb(0," + Math.min(85, (85 * (this.poison / 10))) + "," + Math.min(55, (55 * (this.poison / 10))) + ")";
        this.poison_div.style.backgroundColor = this.rgb_code;
        this.poison_counter.innerHTML = this.poison;
        save_state();
    }

    this.hit        = function(dmg_val) {
        this.life  += dmg_val;
        this.update_rgb();
    };
    
    this.get_poison = function(poison_in) {
        this.poison += poison_in;
        this.update_poison();
    }
    
    this.set_life   = function(life_in) {
        this.life   = life_in;
        this.update_rgb();
    }
    
    this.set_poison = function(poison_in) {
        this.poison = poison_in;
        this.update_poison();
    }
}

// Store useful divs in Player
function addPlayer(life_div_in, life_counter_in, poison_div_in, poison_counter_in) {
    let temp_player = new Player(life_div_in, life_counter_in, poison_div_in, poison_counter_in);
    players.push(temp_player);
}

// Generate d6 random values and change the canvas dice texture accordingly
async function roll_dice() {
    let rand_n;
    const ctx = document.getElementById("d6").getContext("2d");
    for(let i = 0; i < 7; i++) {
        await sleep(100);
        rand_n = Math.floor(Math.random() * 6);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(d6_images[rand_n], 0, 0, canvas.width, canvas.height);
    }
}

// Toggle/Untoggle the poison:
// Change the button texture
// Unhide the poison counter bars
// Change the classes 50-->33/17 or 33/17-->50
function toggle_poison() {
    // Untoggle poison
    if(poison_toggled === true) {
        poison_toggle_image.src = "../media/poison_toggle_off.png";
        poison_toggled = false;
        for(let player_life_column of player_life_columns) {
            player_life_column.classList.remove("column_33");
            player_life_column.classList.add("column_50");
        }
        for(let life_button of life_buttons_p1) {
            life_button.classList.remove("button_33");
            life_button.classList.add("button_50");
        }
        for(let life_button of life_buttons_m1) {
            life_button.classList.remove("button_33");
            life_button.classList.add("button_50");
        }
        for(let player_poison_column of player_poison_columns) {
            player_poison_column.style.display = 'none';
        }
    } else {
        // Toggle poison
        poison_toggle_image.src = "../media/poison_toggle_on.png";
        poison_toggled = true;
        for(let player_life_column of player_life_columns) {
            player_life_column.classList.remove("column_50");
            player_life_column.classList.add("column_33");
        }
        for(let life_button of life_buttons_p1) {
            life_button.classList.remove("button_50");
            life_button.classList.add("button_33");
        }
        for(let life_button of life_buttons_m1) {
            life_button.classList.remove("button_50");
            life_button.classList.add("button_33");
        }
        for(let player_poison_column of player_poison_columns) {
            player_poison_column.style.display = 'block';
        }
    }

    save_state();
}

// Persist the whole table state as one JSON blob on every change: iOS drops
// backgrounded pages from memory, and unload events are unreliable there.
function save_state() {
    // startup() and load_state() both drive update_* before the restore is
    // finished; saving then would clobber the stored game with a fresh 20/20.
    if(booting) return;

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            v: 1,
            life:   [players[0].life,   players[1].life],
            poison: [players[0].poison, players[1].poison],
            poison_toggled: poison_toggled
        }));
    } catch(e) {
        // Private browsing / quota exceeded: the counter still works,
        // it just won't survive a reload
    }
}

// Restore the previous game, if any. Must run at the end of startup():
// toggle_poison() needs the button and image lookups already done.
function load_state() {
    let state;
    try {
        state = JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch(e) {
        return;
    }

    if(!state || state.v !== 1) return;
    if(!Array.isArray(state.life) || !Array.isArray(state.poison)) return;

    players[0].set_life(state.life[0]);
    players[1].set_life(state.life[1]);
    players[0].set_poison(state.poison[0]);
    players[1].set_poison(state.poison[1]);

    // Mana is deliberately not restored: a pool empties every phase, so it
    // always starts at zero.

    if(state.poison_toggled) toggle_poison();
}

function startup() {
    player_life_columns  = document.querySelectorAll('.column_50');
    player_poison_columns = document.querySelectorAll('.poison');
    life_counts     = document.querySelectorAll('.player_life');
    poison_counts   = document.querySelectorAll('.player_poison');
    
    for(let i = 0; i < 2; i++) {
        addPlayer(player_life_columns[i], life_counts[i], player_poison_columns[i], poison_counts[i]);
        players[i].update_rgb();
        players[i].update_poison();
    }

    for(let poison_column of player_poison_columns) {
        poison_column.style.display = 'none';
    }

    setup_mana_ui(players);

    life_buttons_p1 = document.querySelectorAll('.p1');
    life_buttons_m1 = document.querySelectorAll('.m1');
    poison_buttons_p1 = document.querySelectorAll('.p1p');
    poison_buttons_m1 = document.querySelectorAll('.m1p');
    
    poison_toggle_button = document.querySelector('.poison_toggle');
    poison_toggle_image = document.getElementById("poison_image");
    
    undo_button = document.querySelector('.undo_button');
    
    undo_button.addEventListener('click', () => {
        players[0].set_life(20);
        players[0].set_poison(0);
        players[0].clear_mana();
        players[1].set_life(20);
        players[1].set_poison(0);
        players[1].clear_mana();
    }, false)
    
    poison_toggle_button.addEventListener('click', () => toggle_poison(), false);

    // is there a better option? not really elegant...
    life_buttons_p1[0].addEventListener('click', function() { players[0].hit(1); });
    life_buttons_p1[1].addEventListener('click', function() { players[1].hit(1); });
    life_buttons_m1[0].addEventListener('click', function() { players[0].hit(-1); });
    life_buttons_m1[1].addEventListener('click', function() { players[1].hit(-1); });
    
    poison_buttons_p1[0].addEventListener('click', function() { players[0].get_poison(1); });
    poison_buttons_p1[1].addEventListener('click', function() { players[1].get_poison(1); });
    poison_buttons_m1[0].addEventListener('click', function() { players[0].get_poison(-1); });
    poison_buttons_m1[1].addEventListener('click', function() { players[1].get_poison(-1); });

    dice = document.querySelector('.dice');
    canvas = document.getElementById('d6');
        
    dice.addEventListener('click', () => roll_dice(), false);
    
    for(let i = 1; i <= 6; i++) {
        let temp_image = new Image();
        temp_image.src = '../media/d6_' + i + '.png';
        d6_images.push(temp_image);
    }
    
    const ctx = document.getElementById("d6").getContext("2d");
    d6_images[5].onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(d6_images[5], 0, 0, canvas.width, canvas.height);        
    }

    load_state();
    booting = false;
}

startup();


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}