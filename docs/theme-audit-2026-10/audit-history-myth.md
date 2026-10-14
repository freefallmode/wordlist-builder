# Audit: History & Myth

Rating spread (186 playable): 1: 10, 2: 42, 3: 69, 4: 46, 5: 19. Few 1s on purpose: most of this domain needs some school history. The real 1s are ancient_egypt, ancient_rome, vikings, knights, castle_parts, pirates, treasure, mythical_creatures, witchcraft, wild_west.

## Redundant

- `dig_site` vs `archaeology_words`: same words (excavation, artifact, archaeologist, fossil, dig). Keep `archaeology_words`, merge `dig_site` into it (or keep `dig_site` only as tools: trowel, brush, grid, bucket, sieve).
- `famous_voyages` vs `explorers`: typical words are the same explorers (Columbus, Marco Polo, Magellan, Captain Cook). Merge into `explorers`, or keep only voyage names (Mayflower, Apollo 11, Kon-Tiki, Beagle).
- `ages_of_history` vs own words of `historical_periods` (Renaissance, Stone Age, Bronze Age, Iron Age): make `historical_periods` a group and keep `ages_of_history`.
- `discoveries` duplicates Science & Tech > science history > famous discoveries (DNA, gravity, X-ray, penicillin). Delete here.
- `greek_philosophers` duplicates Science & Tech > science history > scientists > ancient greek thinkers. Keep one (this one is the better name for play).
- `medieval_weapons` overlaps heavily with People & Society > military > historic weapons. Check the pools; probably keep `medieval_weapons` and narrow the other to gunpowder era.
- `castles` own words mix castle synonyms (fort, fortress, stronghold) with famous castles (Edinburgh, Windsor), which Places > landmarks > famous castles already has. Make `castles` a group over `castle_parts`, or keep it as synonyms only.
- `african_folklore` repeats the orishas (Ogun, Oshun, Shango, Yemoja) of `yoruba_orishas`. Remove them from `african_folklore`.
- `witchcraft` vs `wizard_words` (spell, potion, wand in both) and `fairy_folk` vs `fantasy_races` (elf, goblin, dwarf): close but usable siblings; make sure their shared words are not both typical.

## Silly or unfit

- `revolutions`: words are bare adjectives (Russian, October, Chinese, Cultural, Scientific); no player can see a group. Make it a group over its two children.
- `famous_people`, `wars_and_battles` (468 own words), `folklore`, `fantasy`, `exploration`, `archaeology`, `medieval_times`, `historical_periods`, `monarchs`, `ancient_sites`: catch-alls whose four words could be from any sibling. Make them groups (not played) or trim their own words to a real idea.
- `world_war_ii_terms`: typical words Nazi, Hitler, Holocaust are not for a family game. Ban those words or drop the theme; same for Hitler, Stalin, Mao in `famous_leaders` and Idi Amin, Mugabe, Gaddafi in `african_historical_leaders`.
- `pirate_punishments`: hanging, whipping, lashing, flogging. Keep walk the plank, marooned, brig, shackles, or drop.
- `ottoman_empire`: "harem" is a typical word; ban it.
- `dragons`: typical "Spyro" is a trademark; the rest (Colchian dragon, Dragon King) is obscure.
- `us_presidents`: lowercase "trump", "bush" invite confusion and politics; prefer historic presidents.

## Misplaced

- `vikings`, `feudal_japan`, `byzantine_empire`, `ottoman_empire` (and arguably `celts`) are not ancient; rename `ancient_civilizations` to "civilizations and empires" or move them under `historical_periods`.
- `norse_mythology` sits under `norse_gods`; it should be the reverse (gods are part of the mythology).
- `greek_monsters` and `trojan_war` sit under `greek_gods`; they are not gods. Add a "greek mythology" parent holding gods, titans, monsters, heroes, Trojan War.
- `jousting_tournament` belongs under `knights`, not directly under `medieval_times`.
- `dragons` (fantasy) belongs under `mythical_creatures` next to `winged_beasts`.
- `fossils` is palaeontology; move near Animals > prehistoric life.
- `mesopotamian_gods` includes Gilgamesh (a hero, not a god); `latin_american_folklore` includes Pachamama (an Inca goddess, in `inca_gods`).
- People & Society > jobs > cowboy words would make a good child of `wild_west` (see the missing themes).

## Too thin

- `labors_of_hercules`: 10 words, mostly multi-word and obscure (Geryon, Stymphalian birds).
- `ottoman_sultans`: 16 words that are common Muslim first names (Ahmed, Mustafa, Ibrahim); unreadable as a group.
- `portuguese_explorers` (17), `conquistadors` (21), `latin_american_liberators` (23), `suffragists` (25): mostly specialist names.
- `pirate_ships` (19): mostly generic ship types (frigate, schooner, sloop), not pirate ships.
- `orders_of_knighthood` (20), `inca_gods` (22), `titans` (26), `yoruba_orishas` (26), `turkish_folklore` (27), `sea_monsters` (27, includes the real giant squid), `expedition_ships` (46 but rare).

## Flags

### sensitive
- Religion: `monastery`, `crusades`, `hindu_gods`, `ancient_india`, `yoruba_orishas`, `shinto_kami`, `reformers`, `witchcraft`
- War and violence: `wars_and_battles`, `famous_battles`, `ancient_battles`, `medieval_battles`, `napoleonic_battles`, `world_war_i_battles`, `world_war_ii_battles`, `civil_war_battles`, `war_words`, `world_war_ii_terms`, `cold_war`, `famous_generals`, `soldiers_of_history`, `siege_weapons`, `pirate_punishments`, `french_revolution`
- Death: `black_death`, `tombs_and_burials`, `egyptian_afterlife`
- Politics: `famous_leaders`, `african_historical_leaders`, `us_presidents`, `civil_rights_figures`, `revolutions`, `ottoman_empire`

### englishOnly
- `pirate_words` (arr, ahoy, aye, booty), `superstitions` (crossed fingers, knock on wood idioms), `revolutions` and `empires` (bare English adjectives: British, Roman, October)

## Missing themes

### greek alphabet
Parent: History & Myth > ancient civilizations > ancient greece. Kind: category. Rating: 3.
alpha 1, beta 1, gamma 2, delta 1, omega 1, pi 1, sigma 2, theta 2, lambda 2, epsilon 3, zeta 3, eta 4, iota 3, kappa 3, mu 3, nu 4, xi 4, omicron 4, rho 4, tau 3, upsilon 4, phi 3, chi 3, psi 3

### egyptian symbols
Parent: History & Myth > ancient civilizations > ancient egypt. Kind: category. Rating: 3.
ankh 2, scarab 2, Eye of Horus 2, lotus 2, cobra 3, crook 3, flail 3, falcon 3, cartouche 3, djed 5, obelisk 2, sun disk 3, vulture 4, papyrus 3, feather 3, double crown 4

### wild west legends
Parent: History & Myth > historical periods > wild west. Kind: category. Rating: 3.
Billy the Kid 1, Jesse James 1, Wild Bill Hickok 2, Wyatt Earp 2, Doc Holliday 2, Calamity Jane 2, Annie Oakley 2, Buffalo Bill 1, Butch Cassidy 2, Sundance Kid 2, Belle Starr 4, Bat Masterson 4, Black Bart 4, Pat Garrett 4, Kit Carson 3, Davy Crockett 3

### cowboy gear
Parent: History & Myth > historical periods > wild west. Kind: category. Rating: 2.
lasso 1, spurs 1, saddle 1, cowboy hat 1, chaps 2, bandana (bandanna) 2, holster 2, boots 1, stirrup 2, poncho 3, bolo tie 3, bedroll 3, canteen 2, lariat 3, Stetson 2, rope 2, horseshoe 2, reins 2

### wild west town
Parent: History & Myth > historical periods > wild west. Kind: place. Rating: 2.
saloon 1, sheriff's office 1, jail 1, general store 2, bank 2, livery stable 3, blacksmith 2, stagecoach 1, hitching post 3, swinging doors 2, wanted poster 1, water trough 2, railroad (railway) 2, tumbleweed 1, boardwalk 3, gallows 4, church 3, hotel 3

### pirate clothing
Parent: History & Myth > pirates. Kind: category. Rating: 2.
eyepatch 1, tricorn 2, bandana (bandanna) 1, boots 2, sash 2, earring 2, waistcoat 3, peg leg 1, hook 1, belt 2, buckle 2, frock coat 3, striped shirt 2, headscarf 2, breeches 3, cape 3

### fairy tale objects
Parent: History & Myth > folklore. Kind: category. Rating: 2.
glass slipper 1, poisoned apple 1, spinning wheel 1, beanstalk 1, magic mirror 1, gingerbread house 1, pumpkin coach 1, red hood 1, golden egg 2, pea 2, golden goose 2, breadcrumbs 2, magic beans 1, tower 3, frog prince 2, seven-league boots 4, porridge 2, enchanted rose 2, spindle 2

### giants of legend
Parent: History & Myth > mythology > mythical creatures. Kind: category. Rating: 3.
Goliath 1, Cyclops 2, Polyphemus 4, Atlas 2, Paul Bunyan 3, Ymir 4, Finn McCool 3, Gog 4, Magog 4, ogre 2, troll 2, titan 2, jotun 4, Bran 5, Antaeus 5, Talos 4, Argus 4, frost giant 3

### legendary horses
Parent: History & Myth > mythology. Kind: category. Rating: 3.
Pegasus 1, Trojan Horse 1, unicorn 1, Sleipnir 3, Bucephalus 3, centaur 2, kelpie 3, hippocampus 4, Black Beauty 2, Arion 5, Marengo 4, Copenhagen 5, Shadowfax 4, Rocinante 4, Tulpar 5

### medieval instruments
Parent: History & Myth > medieval times. Kind: category. Rating: 3.
lute 1, harp 1, lyre 2, recorder 2, bagpipes 2, hurdy-gurdy 3, shawm 4, sackbut 4, psaltery 4, tabor 3, dulcimer 3, horn 2, flute 2, fiddle 2, bells 2, drum 2, crumhorn 4, organ 3, rebec 5, pipe 3

### medieval pastimes
Parent: History & Myth > medieval times. Kind: category. Rating: 3.
jousting 1, archery 1, falconry 2, hunting 2, chess 2, dice 2, backgammon 3, wrestling 3, juggling 2, storytelling 3, feasting 2, dancing 3, skittles 3, minstrels 2, hawking 3, tournaments 2, morris dancing 4, mummers 4

### famous knights
Parent: History & Myth > medieval times > knights. Kind: category. Rating: 3.
Lancelot 1, Galahad 2, Gawain 2, Percival 2, Tristan 3, El Cid 3, Richard the Lionheart 2, Ivanhoe 3, Don Quixote 2, Bedivere 4, Sir Kay 4, Mordred 3, William Marshal 4, Saint George 2, Roland 4, Green Knight 3, Black Prince 4

### lost treasures
Parent: History & Myth > pirates > treasure (or History & Myth > mythology > legendary places). Kind: category. Rating: 3.
Holy Grail 1, El Dorado 1, Golden Fleece 2, King Solomon's Mines 3, Crown Jewels 2, Amber Room 4, Fabergé eggs 3, Ark of the Covenant 3, Blackbeard's gold 3, Sword in the Stone 2, Treasure of Lima 5, Templar treasure 4, Lost Dutchman's mine 5, Oak Island 5, Kidd's treasure 4

### symbols of the greek gods
Parent: History & Myth > mythology > greek gods. Kind: category. Rating: 3.
thunderbolt 1, trident 1, owl 2, lyre 2, bow 2, helmet 3, caduceus 3, winged sandals 2, eagle 3, peacock 3, dove 3, olive 3, grapes 3, spear 3, hammer 3, torch 3, wheat 4

### Note on families
Family-ready parents after these additions: `wild_west` (wild west legends, cowboy gear, wild west town, plus cowboy words moved in), `medieval_times` already has many; `mythical_creatures` (sea monsters, winged beasts, shapeshifters, cryptids, undead, giants of legend).
