# Audit: Nature & Earth

143 playable themes rated (1: 20, 2: 48, 3: 45, 4: 22, 5: 8). The domain is mostly concrete and friendly, so it leans to 2 and 3.

## Redundant

- `birthstones` is almost a strict subset of `gemstones` (26 words, all of them gems; typical words are the same eight). Keep `gemstones`; delete `birthstones`, or keep it only if the game will never put it on screen with `gemstones`.
- `summer_flowers`: its typical words (rose, lavender, sunflower, lily, daisy, poppy) are just `garden_flowers`. Merge into `garden_flowers`. (`spring_flowers` is fine: bulbs and blossom give it a real identity.)
- `rock_pool` duplicates Animals > sea life > tide pool life (shrimp, crab, anemone, starfish). Keep one. `rock_pool` (a place theme) is the better fit for the game.
- `fossil_fuels` and `renewable_energy` overlap Science & Tech > engineering > energy sources (> fuels). Keep the Nature pair as close siblings and check the Science ones are not the same lists.
- `pond` (habitats) and Animals > animal habitats > pond life; `rainforest` / rainforest animals; `desert` / desert animals: close duplicates across domains. Keep the habitat place themes (broader); make sure the animal ones stay animals only.
- `garden_pests` and Animals > insects and bugs > garden bugs: check overlap; garden bugs should hold the harmless ones (or become "garden helpers", see Missing).
- Cross-domain: Animals > sea life > seaweeds overlaps `coastal_plants` and `water_plants` (seaweed, kelp).

## Silly or unfit

- `cappadocia`: words from the game's own first stop (balloon, fairy chimney, Göreme, cave hotel, pottery, "turkey"). Not a group a player can name; it is a place theme and belongs in Places & Geography if kept. Suggest removing it from play.
- `anatolian_flowers`: tulip, hyacinth, crocus, rose, poppy, carnation; no player can tell these from any garden flowers. Remove or keep only as data.
- `south_american_flowers`: fuchsia, petunia, cosmos, begonia read as ordinary garden flowers. Same problem; remove from play.
- `earth_science` (playable root, 62 own words: atmosphere, continent, rotation, Jurassic, strata): catch-all. Make it a group.
- `environment` (playable root: nature, ecosystem, eco, Earth Day, Greenpeace): catch-all with a brand name. Make it a group.
- `shipwreck_coast_words` (rock, storm, fog, rescue, reef) and `erosion_words` (wind, cliff, canyon, glacier): words point at many themes; vague. Keep only for very late levels or delete.
- `medicinal_plants` contains "cannabis" (typical word no. 4): ban that word.
- Word data issues seen in typical words: "Hurricanes" (capitalised plural, probably a sports team) in `storms` and `natural_disasters`; "turkey" lowercase (the bird) in `cappadocia`; "Gulfstream" (aircraft brand; should be "Gulf Stream") in `tides_and_currents`; "Savannah" (the city spelling) in `savanna`; "Earth" in `soil_words`; "Jasper" capitalised in `quartz_varieties`; "rope" in `fiber_plants` (not a plant).

## Misplaced

- `forests` is playable (`group: false`) but has 0 own words and 7 sub-themes; it should be a group (or get its own words like `trees` has).
- `earth_science`, `environment`: should be groups (above).
- `cappadocia` -> Places & Geography (if kept).
- `gold_rush_words` sits under rocks and minerals; it is history (prospector, California). Better in History & Myth.
- `garden_birds` duplicates the Animals > birds tree in spirit; fine as a garden sibling but check it against Animals > animals of the world > european animals > british wildlife.
- `endangered_animals` (149 words) is an animal list under environment; acceptable, but the pool should be checked against Animals so the same animal is not a member of both trees by accident.

## Too thin

- `layers_of_the_earth`: 15 words, mostly variants of core/mantle/crust (inner core, upper mantle). About 6 distinct ideas.
- `antarctic_weather`: 22 words, many multi-word (extreme cold, polar vortex, ozone hole).
- `birthstones`: 26 (and redundant).
- `fiber_plants`: 29 incl. "rope", "harakeke"; real members about 10.
- `anatolian_flowers`: 29 generic flowers.
- `quartz_varieties`: 33, includes "crystal" and "flint"; specialist.

## Flags

### sensitive
- `medicinal_plants` (cannabis, likely opium poppy)
- `poisonous_plants` (poisons, death)
- `climate_words` (political in some places)
- Consider: `natural_disasters`, `wildfire_words`, `shipwreck_coast_words` (death and disaster, mild)

### englishOnly
- `scottish_landscape_words` (glen, loch, ben, burn: Scots English words)
- `rain_words`, `wind_words` (drizzle, downpour, gale, gust: shades of one English word; collapse in translation)
- `flowers_with_animal_names` (already wordplay; foxglove, snapdragon only work in English)
- `hedge_plants` is borderline (box, hedgerow are British usage), not flagged.

## Missing themes

Checked against `all-theme-names.txt` (Qualities > things by color, Qualities > textures > prickly things, Qualities > temperature > words for cold, Food > vegetables > mushrooms, Sports > surfing words all exist and are distinct from these).

### yellow flowers
Parent: flowers > flowers by color (new group; family of 5 with the next four). Kind: category. Rating: 2.
sunflower 1, daffodil 1, buttercup 1, dandelion 1, marigold 2, primrose 2, goldenrod 3, forsythia 3, cowslip 3, celandine 4, black-eyed Susan 3, mimosa 3, wattle 4, gorse 3, coreopsis 5, evening primrose 3, rapeseed 3, yellow rose 1

### blue flowers
Parent: flowers > flowers by color. Kind: category. Rating: 3.
bluebell 1, cornflower 1, forget-me-not 1, delphinium 3, morning glory 2, gentian 3, periwinkle 3, grape hyacinth 2, agapanthus 3, hydrangea 2, blue poppy 3, love-in-a-mist 4, borage 4, chicory 4, lobelia 4, plumbago 5

### red flowers
Parent: flowers > flowers by color. Kind: category. Rating: 3.
poppy 1, red rose 1, poinsettia 2, red-hot poker 3, geranium 2, amaryllis 3, scarlet pimpernel 3, cardinal flower 4, anthurium 4, red campion 4, crimson clover 4, flame lily 4, celosia 5, red tulip 1, bee balm 4

### white flowers
Parent: flowers > flowers by color. Kind: category. Rating: 3.
snowdrop 1, lily of the valley 2, jasmine 2, gardenia 2, magnolia 2, edelweiss 2, baby's breath 2, calla lily 2, moonflower 3, orange blossom 2, Queen Anne's lace 3, cow parsley 4, elderflower 3, stephanotis 5, sweet alyssum 4, white rose 1

### purple flowers
Parent: flowers > flowers by color. Kind: category. Rating: 2.
lavender 1, lilac 1, violet 1, wisteria 2, heather 2, crocus 2, foxglove 2, pansy 2, clematis 3, allium 3, verbena 3, aubrietia 5, catmint 4, aster 3, salvia 4, purple thistle 2

### sweet-smelling flowers
Parent: flowers. Kind: property. Rating: 3.
rose 1, jasmine 1, lavender 1, lilac 2, honeysuckle 2, gardenia 2, freesia 3, sweet pea 2, lily of the valley 2, hyacinth 2, frangipani 3, magnolia 3, orange blossom 2, stock 4, mock orange 4, tuberose 4, night-scented stock 5

### flower bulbs
Parent: flowers. Kind: category. Rating: 3. (Close sibling of `spring_flowers`.)
tulip 1, daffodil 1, crocus 1, hyacinth 2, snowdrop 2, allium 3, lily 2, iris 3, bluebell 2, amaryllis 2, grape hyacinth 3, narcissus 2, fritillary 4, gladiolus 3, freesia 4, scilla 5, dahlia 3

### christmas plants
Parent: plants. Kind: category. Rating: 2.
holly 1, mistletoe 1, ivy 2, poinsettia 1, fir 1, pine 2, spruce 2, Christmas cactus 2, amaryllis 3, Christmas rose 3, yew 4, cranberry 3, Norway spruce 3, Nordmann fir 4

### desert plants
Parent: plants. Kind: category. Rating: 2. (Close sibling of `cacti_and_succulents`.)
cactus 1, saguaro 2, agave 2, yucca 2, Joshua tree 2, tumbleweed 1, date palm 2, aloe 2, prickly pear 2, sagebrush 3, barrel cactus 3, ocotillo 5, mesquite 3, creosote bush 4, welwitschia 5, desert rose 3, acacia 3

### thorny plants
Parent: plants. Kind: property. Rating: 3.
rose 1, bramble 1, thistle 1, holly 2, cactus 1, gorse 3, hawthorn 2, blackthorn 3, acacia 3, bougainvillea 4, raspberry 3, barberry 4, pyracantha 4, prickly pear 2, firethorn 4, blackberry 2

### seeds and pips
Parent: plants. Kind: category. Rating: 3.
acorn 1, conker 2, pip 1, pit 2, kernel 2, sunflower seed 1, pumpkin seed 1, sesame seed 2, poppy seed 2, pine nut 2, grain 2, dandelion clock 3, sycamore key 3, apple seed 1, peach stone 2, birdseed 2

### things made from trees
Parent: trees. Kind: property. Rating: 2.
paper 1, cork 1, rubber 2, maple syrup 1, sap 2, resin 3, charcoal 2, timber 1, cinnamon 3, latex 3, turpentine 4, chicle 5, plywood 2, sawdust 2, amber 3, pencil 2, cardboard 2

### foraging finds
Parent: forests. Kind: category. Rating: 3.
blackberry 1, elderberry 2, sloe 3, rose hip 3, wild garlic 3, mushroom 1, chestnut 2, hazelnut 2, nettle 3, bilberry 4, crab apple 3, elderflower 3, wild strawberry 2, sorrel 4, chanterelle 4, wild blueberry 2, beechnut 4

### fungi
Parent: forests. Kind: category. Rating: 3. (Wild fungi, unlike Food > vegetables > mushrooms.)
toadstool 1, mushroom 1, puffball 2, fly agaric 3, morel 3, truffle 2, bracket fungus 3, death cap 3, mold (mould) 2, yeast 3, mildew 3, chanterelle 3, porcini 3, spore 3, mycelium 4, stinkhorn 4, lichen 4

### garden helpers
Parent: garden. Kind: property. Rating: 3. (Close sibling of `garden_pests`.)
ladybug (ladybird) 1, earthworm 1, bee 1, bumblebee 1, butterfly 2, hoverfly 3, lacewing 4, frog 2, toad 2, hedgehog 2, spider 2, ground beetle 4, robin 3, thrush 3, bat 3, centipede 4

### wave words
Parent: seashore. Kind: category. Rating: 2.
wave 1, surf 1, swell 2, breaker 2, ripple 1, crest 2, foam 2, spray 2, whitecap 3, tsunami 1, roller 3, trough 3, surge 3, tidal wave 1, undertow 4, rip current 3

### island types
Parent: landscapes. Kind: category. Rating: 3.
island 1, isle 1, islet 2, atoll 2, archipelago 2, key 3, cay 4, sandbar 3, reef 2, sandbank 3, skerry 5, volcanic island 2, desert island 1, coral island 2

### hot weather words
Parent: weather. Kind: category. Rating: 3. englishOnly. (Sibling of Qualities > temperature > words for cold.)
sweltering 2, scorching 1, boiling 1, baking 2, muggy 2, humid 1, sultry 3, balmy 3, heatwave 1, sizzling 2, roasting 2, stifling 3, tropical 2, sunny 1, sticky 3, close 4
