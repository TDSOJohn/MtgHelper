import { MANA } from './mana_counters.js';
import { LAND_SECTIONS, build_decklist } from './land_cycles.js';

const COPIES_MAX = 4;

let chosen_colors = new Set();
let copies = new Map();     // cycle -> copies of each of its cards

let decklist_text;
let decklist_total;
let download_button;

// One toggle per color, painted like the mana counters
function build_color_toggles(container) {
    for(let mana of MANA) {
        if(mana.key === 'C') continue;      // no colorless cycles to pick from

        let toggle = document.createElement('button');
        toggle.className = 'color_toggle';
        toggle.textContent = mana.key;
        toggle.style.backgroundColor = "rgb(" + mana.rgb.join(",") + ")";

        toggle.addEventListener('click', () => {
            if(toggle.classList.toggle('chosen')) chosen_colors.add(mana.key);
            else                                  chosen_colors.delete(mana.key);
            update_decklist();
        }, false);

        container.appendChild(toggle);
    }
}

// One row per cycle: its name, an example card, and a 0..COPIES_MAX picker
// for how many of each of its cards go in the list
function build_cycle_row(cycle) {
    let row = document.createElement('div');
    row.className = 'cycle_row';

    let label = document.createElement('div');
    label.className = 'cycle_label';

    let name = document.createElement('div');
    name.className = 'cycle_name';
    name.textContent = cycle.name;

    let example = document.createElement('div');
    example.className = 'cycle_example';
    example.textContent = Object.values(cycle.cards)[0];

    let picker = document.createElement('div');
    picker.className = 'copies_picker';

    for(let n = 0; n <= COPIES_MAX; n++) {
        let button = document.createElement('button');
        button.className = 'copies_button';
        button.textContent = n;
        if(n === 0) button.classList.add('chosen');

        button.addEventListener('click', () => {
            copies.set(cycle, n);
            for(let i = 0; i < picker.children.length; i++) {
                picker.children[i].classList.toggle('chosen', i === n);
            }
            row.classList.toggle('included', n > 0);
            update_decklist();
        }, false);

        picker.appendChild(button);
    }

    label.appendChild(name);
    label.appendChild(example);
    row.appendChild(label);
    row.appendChild(picker);
    return row;
}

// Refresh the list preview, its card count and the download button
function update_decklist() {
    let total = 0;
    let lines = [];

    // "4 Hallowed Fountain": the plain list format ManaBox, Moxfield,
    // Archidekt & co. all import. No set or collector number, so each app
    // picks its own default printing.
    for(let entry of build_decklist(chosen_colors, copies)) {
        total += entry.count;
        lines.push(entry.count + ' ' + entry.name);
    }

    decklist_text.value = lines.join('\n');
    decklist_total.textContent = total + (total === 1 ? ' card' : ' cards');
    download_button.disabled = (lines.length === 0);
}

// Save the list as a .txt named after its colors, e.g. lands_WUB.txt
function download_decklist() {
    let color_code = MANA.map(mana => mana.key).filter(key => chosen_colors.has(key)).join('');
    let file = new Blob([decklist_text.value + '\n'], { type: 'text/plain' });

    let link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = 'lands_' + color_code + '.txt';
    link.click();

    // click() only starts the download: revoking the URL straight away can
    // break it on some browsers
    setTimeout(() => URL.revokeObjectURL(link.href), 40000);
}

function startup() {
    decklist_text   = document.querySelector('.decklist');
    decklist_total  = document.querySelector('.decklist_total');
    download_button = document.querySelector('.download_button');

    build_color_toggles(document.querySelector('.color_toggles'));

    let cycles = document.querySelector('.cycles');
    for(let section of LAND_SECTIONS) {
        let title = document.createElement('h2');
        title.textContent = section.title;
        cycles.appendChild(title);

        for(let cycle of section.cycles) {
            cycles.appendChild(build_cycle_row(cycle));
        }
    }

    download_button.addEventListener('click', () => download_decklist(), false);

    update_decklist();
}

startup();
