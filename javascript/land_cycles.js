// Land cycles for the lands generator, split by how many colors each land
// taps for.
//
// A cycle maps each color combo to its card. Combos are spelled in WUBRG
// order (Naya is WRG, not RGW), so a combo can be checked letter by letter
// against the chosen colors. Names must be the exact English card names: the
// bare name is all ManaBox & co. get to match a line of the list to a card.

const TWO_COLOR_CYCLES = [
    {
        name: 'Fetchlands',
        cards: {
            WU: 'Flooded Strand',
            WB: 'Marsh Flats',
            WR: 'Arid Mesa',
            WG: 'Windswept Heath',
            UB: 'Polluted Delta',
            UR: 'Scalding Tarn',
            UG: 'Misty Rainforest',
            BR: 'Bloodstained Mire',
            BG: 'Verdant Catacombs',
            RG: 'Wooded Foothills'
        }
    },
    {
        name: 'Shocklands',
        cards: {
            WU: 'Hallowed Fountain',
            WB: 'Godless Shrine',
            WR: 'Sacred Foundry',
            WG: 'Temple Garden',
            UB: 'Watery Grave',
            UR: 'Steam Vents',
            UG: 'Breeding Pool',
            BR: 'Blood Crypt',
            BG: 'Overgrown Tomb',
            RG: 'Stomping Ground'
        }
    },
    {
        name: 'Original duals',
        cards: {
            WU: 'Tundra',
            WB: 'Scrubland',
            WR: 'Plateau',
            WG: 'Savannah',
            UB: 'Underground Sea',
            UR: 'Volcanic Island',
            UG: 'Tropical Island',
            BR: 'Badlands',
            BG: 'Bayou',
            RG: 'Taiga'
        }
    },
    {
        name: 'Fastlands',
        cards: {
            WU: 'Seachrome Coast',
            WB: 'Concealed Courtyard',
            WR: 'Inspiring Vantage',
            WG: 'Razorverge Thicket',
            UB: 'Darkslick Shores',
            UR: 'Spirebluff Canal',
            UG: 'Botanical Sanctum',
            BR: 'Blackcleave Cliffs',
            BG: 'Blooming Marsh',
            RG: 'Copperline Gorge'
        }
    },
    {
        name: 'Checklands',
        cards: {
            WU: 'Glacial Fortress',
            WB: 'Isolated Chapel',
            WR: 'Clifftop Retreat',
            WG: 'Sunpetal Grove',
            UB: 'Drowned Catacomb',
            UR: 'Sulfur Falls',
            UG: 'Hinterland Harbor',
            BR: 'Dragonskull Summit',
            BG: 'Woodland Cemetery',
            RG: 'Rootbound Crag'
        }
    },
    {
        // Double-faced: listed by front face only, e.g. Hengegate Pathway
        // rather than Hengegate Pathway // Mistgate Pathway
        name: 'Pathways',
        cards: {
            WU: 'Hengegate Pathway',
            WB: 'Brightclimb Pathway',
            WR: 'Needleverge Pathway',
            WG: 'Branchloft Pathway',
            UB: 'Clearwater Pathway',
            UR: 'Riverglide Pathway',
            UG: 'Barkchannel Pathway',
            BR: 'Blightstep Pathway',
            BG: 'Darkbore Pathway',
            RG: 'Cragcrown Pathway'
        }
    },
    {
        name: 'Painlands',
        cards: {
            WU: 'Adarkar Wastes',
            WB: 'Caves of Koilos',
            WR: 'Battlefield Forge',
            WG: 'Brushland',
            UB: 'Underground River',
            UR: 'Shivan Reef',
            UG: 'Yavimaya Coast',
            BR: 'Sulfurous Springs',
            BG: 'Llanowar Wastes',
            RG: 'Karplusan Forest'
        }
    },
    {
        name: 'Slow lands',
        cards: {
            WU: 'Deserted Beach',
            WB: 'Shattered Sanctum',
            WR: 'Sundown Pass',
            WG: 'Overgrown Farmland',
            UB: 'Shipwreck Marsh',
            UR: 'Stormcarved Coast',
            UG: 'Dreamroot Cascade',
            BR: 'Haunted Ridge',
            BG: 'Deathcap Glade',
            RG: 'Rockfall Vale'
        }
    },
    {
        name: 'Surveil lands',
        cards: {
            WU: 'Meticulous Archive',
            WB: 'Shadowy Backstreet',
            WR: 'Elegant Parlor',
            WG: 'Lush Portico',
            UB: 'Undercity Sewers',
            UR: 'Thundering Falls',
            UG: 'Hedge Maze',
            BR: 'Raucous Theater',
            BG: 'Underground Mortuary',
            RG: 'Commercial District'
        }
    },
    {
        name: 'Filter lands',
        cards: {
            WU: 'Mystic Gate',
            WB: 'Fetid Heath',
            WR: 'Rugged Prairie',
            WG: 'Wooded Bastion',
            UB: 'Sunken Ruins',
            UR: 'Cascade Bluffs',
            UG: 'Flooded Grove',
            BR: 'Graven Cairns',
            BG: 'Twilight Mire',
            RG: 'Fire-Lit Thicket'
        }
    },
    {
        name: 'Bond lands',
        cards: {
            WU: 'Sea of Clouds',
            WB: 'Vault of Champions',
            WR: 'Spectator Seating',
            WG: 'Bountiful Promenade',
            UB: 'Morphic Pool',
            UR: 'Training Center',
            UG: 'Rejuvenating Springs',
            BR: 'Luxury Suite',
            BG: 'Undergrowth Stadium',
            RG: 'Spire Garden'
        }
    },
    {
        name: 'Scry lands',
        cards: {
            WU: 'Temple of Enlightenment',
            WB: 'Temple of Silence',
            WR: 'Temple of Triumph',
            WG: 'Temple of Plenty',
            UB: 'Temple of Deceit',
            UR: 'Temple of Epiphany',
            UG: 'Temple of Mystery',
            BR: 'Temple of Malice',
            BG: 'Temple of Malady',
            RG: 'Temple of Abandon'
        }
    },
    {
        name: 'Gain lands',
        cards: {
            WU: 'Tranquil Cove',
            WB: 'Scoured Barrens',
            WR: 'Wind-Scarred Crag',
            WG: 'Blossoming Sands',
            UB: 'Dismal Backwater',
            UR: 'Swiftwater Cliffs',
            UG: 'Thornwood Falls',
            BR: 'Bloodfell Caves',
            BG: 'Jungle Hollow',
            RG: 'Rugged Highlands'
        }
    },
    {
        name: 'Bounce lands',
        cards: {
            WU: 'Azorius Chancery',
            WB: 'Orzhov Basilica',
            WR: 'Boros Garrison',
            WG: 'Selesnya Sanctuary',
            UB: 'Dimir Aqueduct',
            UR: 'Izzet Boilerworks',
            UG: 'Simic Growth Chamber',
            BR: 'Rakdos Carnarium',
            BG: 'Golgari Rot Farm',
            RG: 'Gruul Turf'
        }
    }
];

const THREE_COLOR_CYCLES = [
    {
        name: 'Triomes',
        cards: {
            WUB: "Raffine's Tower",
            WUR: 'Raugrin Triome',
            WUG: "Spara's Headquarters",
            WBR: 'Savai Triome',
            WBG: 'Indatha Triome',
            WRG: "Jetmir's Garden",
            UBR: "Xander's Lounge",
            UBG: 'Zagoth Triome',
            URG: 'Ketria Triome',
            BRG: "Ziatora's Proving Ground"
        }
    },
    {
        name: 'Cheap triomes',
        cards: {
            WUB: 'Arcane Sanctum',
            WUR: 'Mystic Monastery',
            WUG: 'Seaside Citadel',
            WBR: 'Nomad Outpost',
            WBG: 'Sandsteppe Citadel',
            WRG: 'Jungle Shrine',
            UBR: 'Crumbling Necropolis',
            UBG: 'Opulent Palace',
            URG: 'Frontier Bivouac',
            BRG: 'Savage Lands'
        }
    }
];

export const LAND_SECTIONS = [
    { title: 'Two colors',   cycles: TWO_COLOR_CYCLES },
    { title: 'Three colors', cycles: THREE_COLOR_CYCLES }
];

// The lands for a deck: every card of every picked cycle whose colors are all
// among the chosen ones, in the order the cycles are listed above. colors is a
// Set of WUBRG letters; copies maps a cycle to how many of each of its cards
// to add, and cycles missing from it (or at 0) are left out.
export function build_decklist(colors, copies) {
    let decklist = [];

    for(let section of LAND_SECTIONS) {
        for(let cycle of section.cycles) {
            let count = copies.get(cycle) || 0;
            if(count === 0) continue;

            for(let combo in cycle.cards) {
                if([...combo].every(color => colors.has(color))) {
                    decklist.push({ count: count, name: cycle.cards[combo] });
                }
            }
        }
    }

    return decklist;
}
