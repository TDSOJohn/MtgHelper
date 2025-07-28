export { Player }

//  Player class contains:
//  - life
//  - rgb value
//  - DOM update references / methods
function Player(life_div_in, life_counter_in, poison_div_in, poison_counter_in) {
    this.life       = 20;
    this.poison     = 0;
    this.rgb_code   = "";
    this.life_div   = life_div_in;
    this.life_counter = life_counter_in;
    this.poison_div = poison_div_in;
    this.poison_counter = poison_counter_in;

    this.update_rgb  = function() {
        this.rgb_code = "rgb(" + (255 * ((25 - this.life) / 25)) + "," + (255 * (this.life / 25)) + ",0)";
        this.life_div.style.backgroundColor = this.rgb_code;
        this.life_counter.innerHTML = this.life;
    };

    this.update_poison = function() {
        this.rgb_code  = "rgb(0," + Math.min(85, (85 * (this.poison / 10))) + "," + Math.min(55, (55 * (this.poison / 10))) + ")";
        this.poison_div.style.backgroundColor = this.rgb_code;
        this.poison_counter.innerHTML = this.poison;
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
