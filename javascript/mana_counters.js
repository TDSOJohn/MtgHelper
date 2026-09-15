// Mana pools for the life counter. Each player gets a floating panel that
// covers their half of the table, opened from a button on the left edge.
// Pools are never persisted: a pool empties every phase, so it always starts
// at zero.

// rgb is the colour at a full pool (MANA_MAX); an empty pool is drawn at half
// that brightness and scales linearly up to it.
export const MANA = [
    { key: 'W', rgb: [248, 231, 185] },
    { key: 'U', rgb: [ 14, 104, 171] },
    { key: 'B', rgb: [ 96,  86, 102] },
    { key: 'R', rgb: [211,  32,  42] },
    { key: 'G', rgb: [  0, 130,  70] },
    { key: 'C', rgb: [180, 178, 172] }
];
const MANA_MAX = 10;

// Give a Player its pools and the methods that drive them
export function init_mana(player) {
    player.mana         = [0, 0, 0, 0, 0, 0];
    player.mana_cells   = [];     // filled in by build_mana_panel()
    player.mana_counts  = [];

    // Half brightness at an empty pool, full colour at MANA_MAX and beyond
    player.update_mana = function(mana_i) {
        if(!this.mana_cells[mana_i]) return;

        let scale = 0.5 + 0.5 * (Math.min(MANA_MAX, this.mana[mana_i]) / MANA_MAX);
        let rgb   = MANA[mana_i].rgb;

        this.mana_cells[mana_i].style.backgroundColor =
            "rgb(" + Math.round(rgb[0] * scale) + ","
                   + Math.round(rgb[1] * scale) + ","
                   + Math.round(rgb[2] * scale) + ")";
        this.mana_counts[mana_i].innerHTML = this.mana[mana_i];
    }

    // A mana pool can't go negative
    player.add_mana = function(mana_i, mana_in) {
        this.mana[mana_i] = Math.max(0, this.mana[mana_i] + mana_in);
        this.update_mana(mana_i);
    }

    // New game: every pool back to empty
    player.clear_mana = function() {
        for(let i = 0; i < MANA.length; i++) {
            this.mana[i] = 0;
            this.update_mana(i);
        }
    }
}

// Build a player's mana panel: a 3x2 grid of W/U/B/R/G/C cells, each cell
// split into a +1 half and a -1 half, plus a close button.
function build_mana_panel(player, panel) {
    let grid = document.createElement('div');
    grid.className = 'mana_grid';

    for(let i = 0; i < MANA.length; i++) {
        let cell = document.createElement('div');
        cell.className = 'mana_cell';

        let count = document.createElement('div');
        count.className = 'mana_count';

        let label = document.createElement('div');
        label.className = 'mana_label';
        label.innerHTML = MANA[i].key;

        let plus = document.createElement('button');
        plus.className = 'mana_button mana_plus';
        plus.innerHTML = '+1';

        let minus = document.createElement('button');
        minus.className = 'mana_button mana_minus';
        minus.innerHTML = '-1';

        // let is scoped per iteration, so each handler keeps its own i
        plus.addEventListener('click', function()  { player.add_mana(i,  1); });
        minus.addEventListener('click', function() { player.add_mana(i, -1); });

        cell.appendChild(count);
        cell.appendChild(label);
        cell.appendChild(plus);
        cell.appendChild(minus);
        grid.appendChild(cell);

        player.mana_cells.push(cell);
        player.mana_counts.push(count);
    }

    let close = document.createElement('button');
    close.className = 'mana_close';
    close.innerHTML = '&times;';
    close.addEventListener('click', () => panel.classList.remove('open'), false);

    panel.appendChild(grid);
    panel.appendChild(close);

    for(let i = 0; i < MANA.length; i++) {
        player.update_mana(i);
    }
}

// The opener is a miniature of the panel: the same 3x2 grid, as dots
function build_mana_toggle(toggle, panel) {
    for(let i = 0; i < MANA.length; i++) {
        let dot = document.createElement('span');
        dot.className = 'mana_dot';
        dot.style.backgroundColor = "rgb(" + MANA[i].rgb.join(",") + ")";
        toggle.appendChild(dot);
    }

    toggle.addEventListener('click', () => panel.classList.toggle('open'), false);
}

// Wire every player's panel and opener up to the DOM. Call once from startup(),
// after the players exist.
export function setup_mana_ui(players) {
    let panels = [
        document.querySelector('.mana_panel.player1'),
        document.querySelector('.mana_panel.player2')
    ];
    let toggles = [
        document.querySelector('.mana_toggle.player1'),
        document.querySelector('.mana_toggle.player2')
    ];

    for(let i = 0; i < players.length; i++) {
        build_mana_panel(players[i], panels[i]);
        build_mana_toggle(toggles[i], panels[i]);
    }
}
