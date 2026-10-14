# Audit: Home & Everyday

## Redundant
- `wardrobe` (where things are kept) is just clothes (dress, suit, shirt, coat, belt, boot): a weaker copy of `clothes`. Delete it, or keep it only as a place theme with storage words (hanger, rail, shoe rack, mothball).
- `laundry_room` vs `laundry_words`: the same typical words (iron, dryer, washing machine, detergent). Keep `laundry_words`, delete `laundry_room`.
- `bathroom_fixtures` vs `bathroom`: the same core words (shower, bath, toilet, sink, tub). Keep `bathroom`; if fixtures stays, limit it to plumbing fittings (tap, faucet, cistern, plughole, showerhead).
- `sewing_kit` vs `sewing_words`: the same core (thread, needle, sewing machine, stitch). Keep `sewing_kit` (concrete). Make `sewing_words` hold only sewing verbs and terms (hem, seam, tack, darn), or merge it.
- `appliances` own words (dryer, washing machine, washer, tumble dryer) repeat `cleaning_appliances` and `laundry_words`. Move them there and make `appliances` a group.
- `clocks_and_calendars` own words (alarm clock, wall clock, grandfather clock, watch) repeat `clock_types`. Keep the calendar words (date, leap year, calendar) on the parent, or rename it `calendar words`.
- `chores` (sweeping, dusting, ironing, mopping) vs `cleaning_verbs` (sweep, dust, wipe, polish): the same idea in two word forms, and form pairs (sweep/sweeping) will clash. Keep `chores` with whole tasks (washing up, making the bed, taking out the trash) and leave the plain verbs to `cleaning_verbs`.
- `things_you_plug_in` is close to a superset of `appliances` and its children (computer, television, iron, fridge, microwave). The checker keeps them apart, but on screen it plays as another appliances theme. Keep it, but only for late levels.
- `majlis` vs `turkish_home`: both are carpet, rug, cushion, tea, tray, lantern. Merge into one Middle East home theme.
- `australian_backyard` vs `american_suburb`: both are pool, lawn, fence, garage, barbecue; the region cannot be told from the words. Merge into one `backyard` theme (and see Task C, `outside the house`).
- Cross-domain duplicates:
  - `traditional_clothes` and `european_folk_costume` vs Places > national symbols > national costumes.
  - `middle_eastern_clothing` vs People > religion > religious clothing (hijab, burqa, niqab).
  - `festivals_of_the_world` (Diwali, Hanukkah, Passover) vs People > religion > religious festivals.
  - Keep one of each pair.

## Silly or unfit
- `time` (own words: now, today, past, soon, early, late): abstract time words with no clear group. Make it a group.
- `household_objects` (key, iron, hammer, ladder, pillow, umbrella): a catch-all. Make it a group.
- `cleaning` own words (mess, dirt, stain, spotless, maid, hygiene): not one idea. Make it a group, or rename it `dirt and mess` and keep only those words.
- `house_and_building` own words are building trades (architect, builder, plumber, electrician). Rename it `building trades` and check it against People > jobs, or make the parent a group.
- `things_with_handles` (178 words) and `things_with_lids` (114 words): so broad that four words rarely point to the property. Late levels only, or drop them.
- `attic` (box, dust, trunk, mouse, spider, ski, tent): not a real group; players cannot work it out.
- `cozy_things`: subjective; most of its words fit other themes (blanket, candle, sweater, quilt).
- `christmas_carols`: has non-carols (turtle dove, partridge, nutcracker) and obscure ones (Coventry Carol, Gaudete).
- `tables_and_desks` contains "Round Table" (Arthurian, not furniture). Ban it.
- `shoes` contains "thong" (an Australian flip-flop, but underwear elsewhere). Ban it.
- `pants` appears in both `pants_and_shorts` and `underwear` (US/UK meaning). Ban it from one of them.
- `fashion_designers` and `home_electronics` (Xbox, iPad) lean on trademark names. Mark them with the v5 trademark flag.

## Misplaced
- `boots` is a sibling of `shoes`; it should be a child of `shoes`.
- `zodiac_signs` and `chinese_zodiac` are not time. Move them to beliefs or astrology (History & Myth); `chinese_zodiac` could sit under `lunar_new_year`.
- `bathroom_fixtures`, `electrical_fittings` (not appliances) and `plumbing_words` (not tools) belong under `house_and_building`.
- `painting_and_decorating` (under tools) and `diy_words` (under house and building) cover the same field. Put them under one parent.
- `soft_furnishings`, `window_coverings`, `rugs_and_carpets` and `lights_and_lamps` are not furniture. Make the parent "furniture and furnishings", or give them a `furnishings` branch.
- `household_pests` under cleaning is acceptable, but it overlaps Animals (insects) and Nature > garden pests. Check for duplicates.
- Playable parents whose own words are off-topic and that should be groups: `time`, `household_objects`, `cleaning`, `house_and_building`, `appliances` (only 14 own words).

## Too thin
- `christmas_carols`: 12 words, several dubious.
- `south_american_clothing`: 19 words, mostly rare (bombachas, ruana, pollera).
- `ottoman_clothing`: 25 words, mostly rare (salta, mest, kalpak, yashmak).
- `western_wear`: 23 words.
- `pacific_island_clothing`: 27 words, but the duplicates (Hawaiian shirt, aloha shirt, Hawaiian print; grass skirt, hula skirt) leave about 8 distinct ones.
- `african_clothing`: about 37 words, but the top ones are specialist (Ankara, Dutch wax, wax print).
- `staircase_parts`: 28 words with spelling duplicates (banister, bannister) leave about 8 good ones.
- `necklines`: 31 words, many ambiguous on their own (crew, square, boat, scoop).
- `appliances` own words: 14.

## Flags
### sensitive
- Religion:
  - festivals: `ramadan_and_eid`, `hanukkah`, `diwali`, `holi`, `festivals_of_the_world`.
  - religious dress: `middle_eastern_clothing` (hijab, burqa, niqab).
- Death and war: `day_of_the_dead` (skull, grave, cemetery), `anzac_day` (Gallipoli, war remembrance).
- Alcohol: `oktoberfest` (beer, stein).
- Borderline (probably fine, decide by policy):
  - `halloween` (grave, cemetery, zombie).
  - `st_patrick_s_day` (Guinness).
  - `christmas` and `easter` (religious words such as Good Friday, but everyday holidays).

### englishOnly
- English songs or Anglo customs:
  - `christmas_carols`.
  - `wedding_anniversaries` (paper, silver, ruby: the traditional English list).
- Slang and regional words: `australian_backyard` ("barbie"), `american_suburb` (sidewalk, neighbor).
- Depends on the English idiom "legs" for trousers and furniture: `things_with_legs`.
- The English idea of "cozy": `cozy_things`.
- US/UK meaning clashes (pants, vest, jumper, thong): `underwear`, `pants_and_shorts`, `tops`, `shoes`. Not English-only as concepts, but they need per-word bans for British spelling.

## Missing themes

The first four form a family: a new branch `household objects > tableware` with four children.

### cutlery
- Parent: household objects > tableware (new branch). Kind: category. Rating: 1.
- Words: fork 1, knife 1, spoon 1, teaspoon 1, tablespoon 2, soup spoon 2, butter knife 2, steak knife 2, dessert spoon 2, chopsticks 2, carving knife 2, cake fork 3, fish knife 3, salad fork 3, spork 3, cheese knife 3, grapefruit spoon 4

### crockery
- Parent: household objects > tableware. Kind: category. Rating: 2.
- Words: plate 1, bowl 1, cup 1, saucer 1, mug 1, teacup 1, dinner plate 2, side plate 2, soup bowl 2, cereal bowl 2, egg cup 2, teapot 2, sugar bowl 2, milk jug 2, gravy boat 3, ramekin 3, butter dish 3

### drinking vessels
- Parent: household objects > tableware. Kind: category. Rating: 2.
- Words: glass 1, cup 1, mug 1, tumbler 2, goblet 2, beaker 2, sippy cup 2, water bottle 1, flask 2, jug 2, pitcher 2, carafe 3, tankard 3, chalice 3, canteen 3, decanter 4

### serving dishes
- Parent: household objects > tableware. Kind: category. Rating: 3.
- Words: platter 2, tray 1, salad bowl 2, fruit bowl 2, cake stand 2, cheese board 2, bread basket 2, punch bowl 3, tureen 4, casserole dish 3, serving bowl 2, lazy Susan 3, chip and dip 4, trivet 4

### socks and hosiery
- Parent: clothes. Kind: category. Rating: 2.
- Words: sock 1, stocking 1, tights 2, pantyhose 2, knee sock 2, ankle sock 2, leg warmer 2, garter 3, fishnets 3, bed socks 2, sports socks 2, toe socks 3, compression socks 3

### rain gear
- Parent: clothes. Kind: category. Rating: 1.
- Words: umbrella 1, raincoat 1, rain boots 1, poncho 2, galoshes 2, wellington 2, rain hat 2, sou'wester 3, slicker 3, mackintosh 3, waterproof jacket 2, anorak 3, rain cover 3, cagoule 4

### winter clothes
- Parent: clothes. Kind: category. Rating: 1.
- Words: scarf 1, mittens 1, gloves 1, beanie 1, earmuffs 1, parka 2, snow boots 1, puffer jacket 2, snowsuit 2, balaclava 3, long johns 3, thermal underwear 3, woolly hat 2, ski jacket 2, neck warmer 2

### dress-up costumes
- Parent: clothes. Kind: category. Rating: 2.
- Words: pirate 1, princess 1, superhero 1, witch 1, fairy 1, cowboy 1, astronaut 1, knight 1, clown 1, ninja 2, mermaid 1, wizard 1, robot 2, dinosaur 2, ghost 2, firefighter 2, unicorn 2

### gift wrapping
- Parent: holidays and celebrations. Kind: category. Rating: 2.
- Words: wrapping paper 1, ribbon 1, bow 1, gift tag 1, gift bag 1, tissue paper 2, gift box 1, sticky tape 2, card 1, curling ribbon 2, gift card 2, envelope 2, cellophane 3

### types of party
- Parent: holidays and celebrations. Kind: category. Rating: 2.
- Words: birthday party 1, sleepover 1, tea party 1, pool party 1, dinner party 2, garden party 2, costume party 2, baby shower 2, housewarming 2, surprise party 1, slumber party 2, block party 3, street party 2, potluck 3, farewell party 2, prom 2

### fireworks
- Parent: holidays and celebrations. Kind: category. Rating: 2.
- Words: sparkler 1, rocket 1, firecracker 1, Roman candle 3, Catherine wheel 3, pinwheel 3, fountain 2, fuse 2, cracker 3, bang 2, spark 2, fireworks display 2, sky lantern 3, flare 3

### outside the house
- Parent: rooms. Kind: place. Rating: 2.
- Words: porch 1, patio 2, balcony 1, deck 2, driveway 1, front yard 2, backyard 1, lawn 1, fence 1, gate 1, mailbox (postbox) 2, doorstep 1, path 2, veranda 3, terrace 3, shed 2, hedge 2

### locks and keys
- Parent: household objects. Kind: category. Rating: 2.
- Words: key 1, lock 1, padlock 1, keyhole 1, keyring 2, latch 2, deadbolt 3, combination lock 2, key card 2, skeleton key 3, spare key 2, door chain 2, bolt 2, safe 2, master key 3

### in the fridge
- Parent: where things are kept. Kind: place. Rating: 1.
- Words: milk 1, butter 1, cheese 1, eggs 1, yogurt (yoghurt) 1, juice 1, ham 2, lettuce 2, leftovers 2, ketchup 2, mayonnaise 2, cream 2, sausages 2, salad 2, pickles 3, ice cubes 2

### moving house
- Parent: house and building. Kind: category. Rating: 3.
- Words: cardboard box 1, packing tape 2, moving van (removal van) 2, bubble wrap 1, label 2, movers (removers) 3, packing 2, unpacking 2, new address 2, housewarming 2, storage unit 3, change of address 3, moving day 2, dolly 4

### home safety
- Parent: house and building. Kind: category. Rating: 2.
- Words: smoke alarm 1, fire extinguisher 1, burglar alarm 2, smoke detector 1, first aid kit 1, fire blanket 3, stair gate 2, carbon monoxide detector 3, security camera 2, peephole 2, sprinkler 3, fire escape 2, security light 3, outlet cover (socket cover) 3
