# Audit: Travel & Transport

## Redundant

- `american_road_trip` vs `road_trip_words`: same idea (highway, GPS, diner, gas station, motel, back seat). Keep `road_trip_words`, merge `american_road_trip` into it (or cut it down to US-only words such as interstate, Route 66, rest stop).
- `european_rail` vs `station_words` / `railway_words`: its typical words (station, platform, conductor, first class) are generic railway words. Keep the two railway themes; cut `european_rail` down to Europe-specific words (Eurostar, railpass, Orient Express) or delete it.
- `famous_hiking_trails` vs `famous_routes`: share Appalachian Trail, Inca Trail and others. Keep both, but move the walking trails out of `famous_routes` (keep it for trade and historic routes: Silk Road, Route 66, Oregon Trail, Pony Express).
- `animal_powered_travel` vs `horse_drawn_vehicles`: wagon, carriage, chariot in both. Keep `horse_drawn_vehicles` for vehicles; make `animal_powered_travel` the animals only (horse, camel, elephant, donkey, mule, yak, husky).
- `flying_machines` vs `aircraft_types`: helicopter, glider, airplane in both; `flying_machines` is the vaguer one (kite, drone, rocket). Keep both only if the shared words are removed from one; otherwise merge into `aircraft_types`.
- `beach_vacation` vs `beach_gear`: bikini, sunglasses in both, and `beach_vacation` is a looser mix. Close siblings on purpose is fine, but strip the shared gear words from `beach_vacation`.
- `motorcycle_brands` shares BMW, Honda, Suzuki with `car_brands` / `japanese_car_brands`, so these words can never sit beside each other; fine, just note it.
- Cross-domain: `airport_words` vs Places & Geography > places to visit > airport; `ski_trip` vs Places > ski resort and Sports > skiing words; `beach_vacation` vs Places > beach; `beach_destinations` vs Places > famous beaches; `giving_directions` vs Places > maps and globes > compass directions; `driving_words` vs Places > streets and roads > traffic words; `famous_routes` (Silk Road) vs History > exploration > silk road. Pick one home for each pair; keep the Travel one for airport, ski trip and beach vacation, the Places one for compass directions and traffic words.
- `sailing_ships` vs History > pirates > pirate ships (galleon, brig, sloop): close siblings, acceptable, but check the pools are not near-identical.

## Silly or unfit

- `things_to_pack`: catch-all (book, phone, key, cash, dress); four words never point to one idea. Delete or keep as a group only.
- `tourist_attractions`: catch-all (market, church, park, beach, museum). Delete or make a group.
- `sightseeing_words`: vague (tour, photo, camera, map, ticket); weak, keep only for very late levels.
- `travel_verbs`: generic verbs (leave, board, visit, arrive) that fit many themes; weak.
- `room_types`: single, double, twin, king, queen are ambiguous words; the group is hard to see.
- `survival_skills`: fishing, hunting, swimming, first aid overlap `outdoor_activities` and sports; vague.
- `cycling_races`: so obscure (Dauphiné, Lombardia, Paris-Brest) that almost no player could work it out.
- `famous_locomotives`, `traditional_lodgings`, `african_transport`: expert only (rated 5); fine as rare late themes, not unfit.

## Misplaced

- `skateboard_tricks` belongs under Sports & Games (next to winter sports > snowboard tricks).
- `cycling_races` belongs under Sports & Games > sporting events (beside famous races).
- `motor_racing` and `famous_race_tracks` fit Sports & Games as well as cars; acceptable where they are.
- `climbing_gear` sits apart from Sports > adventure and outdoor sports > climbing words; acceptable.
- `cable_cars_and_lifts` (elevator, escalator) is not public transportation; better under special vehicles or a new "lifts" branch.
- `space_vehicles` under special vehicles is fine; Science & Tech > space also holds spaceflight words, so keep word pools apart.
- `trains` (7 own words) and `cars`, `boats_and_ships`, `air_travel`, `public_transportation`: playable parents; good as family parents, keep playable.
- `national_parks` (playable parent): its own words are a mix (ranger, glacier, Lake District, Kruger) and work poorly as a theme; make it a group.
- `special_vehicles` (playable): vague as a theme of its own (hearse, forklift, taxi, sled); better as a group/family parent only.
- `safari_words` is mostly animal names (lion, zebra, rhino) and will collide with Animals themes; consider keeping only the non-animal words (jeep, binoculars, game drive, ranger, lodge).

## Too thin

- `trains` own words (7), but the pool is fine through its sub-themes.
- `flight_crew` (21): few distinct words (captain, pilot, steward, stewardess, copilot, first officer); thin.
- `cycling_races` (21): thin and obscure.
- `middle_eastern_airlines` (25), `famous_locomotives` (25): most words rare.
- `traditional_lodgings` (34): most words rare (riad, ryokan, caravanserai, ger, posada).
- `african_transport` (32): mostly rare (taxi brousse, matatu, felucca).
- `on_a_bus` (34): words mostly generic (seat, window, passenger, fare).

## Flags

### sensitive

- `military_vehicles` (war: tank, bomber, Panzer).
- `famous_routes` (Underground Railroad: slavery).
- `famous_ships` (Titanic and other wrecks; war ships such as Victory, Bismarck if present).
- `knots` (contains noose; ban the word or flag).
- `special_vehicles` (hearse).
- Word-level, ban rather than flag: hookah (`turkish_souvenirs`), tequila (`mexican_souvenirs`), sake (`japanese_souvenirs`).

### englishOnly

- `room_types` (twin, king, queen as English hotel usage).
- `road_signs` (yield, wrong way, dead end: English sign wording).
- `nautical_directions` (port, starboard, fore: English terms).
- `metro_systems` (tube, underground, overground: English nicknames).
- `taxis_of_the_world` (cab, black cab, yellow cab).
- `parking_words` (US/UK wording: parking lot vs car park).

## Missing themes

### hot air balloon parts
- Parent: Travel & Transport > air travel. Kind: category. Rating: 3.
- Words: balloon 1, basket 1, burner 1, envelope 3, propane 3, gondola 3, sandbag 2, ballast 3, tether 3, rope 2, vent 4, flame 2, crown line 5, skirt 4, gas tank 3.

### sled types
- Parent: Travel & Transport > special vehicles. Kind: category. Rating: 2.
- Words: sled (sledge) 1, sleigh 1, toboggan 2, bobsled (bobsleigh) 2, dog sled 1, snowmobile 2, luge 3, skeleton 4, saucer 3, snow tube 3, snowcat 4, kicksled 5, pulk 5, komatik 5.

### car accessories
- Parent: Travel & Transport > cars. Kind: category. Rating: 3.
- Words: car seat 1, booster seat 2, roof rack 2, air freshener 2, floor mat 2, sunshade 3, phone mount 3, dash cam 3, jumper cables (jump leads) 3, ice scraper 2, seat cover 2, bike rack 2, tow bar 3, cargo box 3, mud flaps 3, steering wheel cover 3, spare tire (spare tyre) 2.

### motorcycle parts
- Parent: Travel & Transport > bikes and boards. Kind: category. Rating: 3.
- Words: handlebar 1, kickstand 2, throttle 2, exhaust 2, clutch 2, fuel tank 2, saddle 3, headlight 1, mirror 1, chain 2, fender (mudguard) 3, windshield (windscreen) 2, footpeg 4, fairing 4, sprocket 4, spoke 3, shock absorber 3.

### skate park features
- Parent: Travel & Transport > bikes and boards. Kind: place. Rating: 3.
- Words: ramp 1, half-pipe 2, quarter pipe 3, bowl 2, rail 2, ledge 3, funbox 4, kicker 4, coping 5, vert ramp 4, mini ramp 3, stairs 2, pyramid 4, hip 5.

### skateboard parts
- Parent: Travel & Transport > bikes and boards. Kind: category. Rating: 4.
- Words: deck 2, truck 3, wheel 1, bearing 3, grip tape 3, kingpin 4, bushing 4, nose 2, tail 2, baseplate 4, riser pad 5, axle 3.

### pleasure boats
- Parent: Travel & Transport > boats and ships > boat types (sibling of small, sailing, working, traditional boats; makes a 5-child family). Kind: category. Rating: 2.
- Words: yacht 1, speedboat 1, jet ski 1, pedal boat (pedalo) 2, banana boat 2, houseboat 2, catamaran 2, motorboat 1, cabin cruiser 3, pontoon boat 3, glass-bottom boat 3, superyacht 3, party boat 3, airboat 3.

### vehicle sounds
- Parent: Travel & Transport > special vehicles (or Qualities > sounds as a sibling of machine sounds). Kind: category. Rating: 2. englishOnly.
- Words: honk 1, beep 1, vroom 1, choo-choo 1, toot 1, screech 2, rumble 2, chug 2, clickety-clack 3, putt-putt 3, whoosh 2, ding 2, purr 3, roar 2, siren 1, nee-naw 4.

### bike accessories
- Parent: Travel & Transport > bikes and boards. Kind: category. Rating: 2.
- Words: helmet 1, bell 1, lock 1, basket 1, pump 1, light 1, reflector 2, water bottle 2, bottle cage 3, panniers 3, child seat 2, kickstand 2, mudguard 3, bike rack 2, cycle computer 4, trailer 3, saddlebag 3.

### electric vehicles
- Parent: Travel & Transport > special vehicles. Kind: property. Rating: 3.
- Words: e-bike 1, electric scooter (e-scooter) 1, electric car 1, tram 2, trolleybus 3, Segway 2, hoverboard 2, golf cart 2, monorail 3, maglev 4, milk float 4, electric bus 2, mobility scooter 3, forklift 3.

### in a hotel room
- Parent: Travel & Transport > accommodation. Kind: place. Rating: 2.
- Words: minibar 2, key card 2, bathrobe 2, slippers 2, hair dryer 2, safe 2, kettle 2, remote 2, ironing board 3, coat hanger 2, mini fridge 2, do not disturb 1, room service menu 3, wardrobe 2, bedside lamp 2, pillow 1.

### submarine words
- Parent: Travel & Transport > boats and ships. Kind: category. Rating: 3.
- Words: periscope 1, sonar 2, hatch 2, dive 1, surface 2, submerge 2, ballast 3, conning tower 4, depth 2, propeller 2, hull 3, porthole 3, captain 2, submariner 3.

### road trip games
- Parent: Travel & Transport > journeys. Kind: category. Rating: 4. englishOnly.
- Words: I spy 1, twenty questions 2, license plate game (number plate game) 3, car bingo 3, punch buggy 3, alphabet game 3, would you rather 2, sing-along 2, the quiet game 3, rock paper scissors 2, travel bingo 3, hangman 2.
