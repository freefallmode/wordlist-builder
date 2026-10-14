# Audit: Places & Geography

193 playable themes rated. Distribution: 1 = 17, 2 = 54, 3 = 64, 4 = 43, 5 = 15. Geography is knowledge-heavy by nature, so this domain sits a bit above the brief's suggested spread at 3 and 4. The everyday places, the workplaces and the big "famous X" themes carry the easy end.

## Redundant

- `istanbul_landmarks` vs `turkish_landmarks`: the top 7 typical words are the same (Hagia Sophia, Blue Mosque, Grand Bazaar, Bosporus, Topkapı/Topkapi). Keep `istanbul_landmarks`. Either cut `turkish_landmarks` back to non-Istanbul sights (Cappadocia, Ephesus, Pamukkale, Troy, Mount Ararat) or delete it. Both pools spell words two ways (Topkapı/Topkapi, Bosphorus/Bosporus); keep one spelling of each.
- `towers_and_skyscrapers` vs `famous_towers`: the generic theme carries famous names (Big Ben, Empire State, Eiffel Tower). Keep the generic words in `towers_and_skyscrapers` (tower, lighthouse, skyscraper, high-rise, clock tower, minaret) and move the named towers to `famous_towers`.
- `regions` (parent, own words) vs `world_regions`: the parent's own words (Siberia, Scandinavia, New England, Midwest, Highlands) are the same idea as `world_regions` and overlap it (Scandinavia, New England). Move the parent's own words into `world_regions` (or into the matching country region themes) and make `regions` a group.
- `map_words` vs `compass_directions`: `map_words`' most typical words are south, north, west, east. Take the compass points out of `map_words`.
- `famous_natural_features` (parent own words) and `famous_waters` (parent own words) repeat words that already sit in their children (Grand Canyon, Yellowstone, Missouri, Lake Como, Pacific Ocean). Make both parents groups, or put the leftovers into the right child.
- `straits_and_canals` vs `Travel & Transport > boats and ships > famous canals` (another domain): Suez, Panama and the like are in both. Keep the straits here and the canals there, or merge.
- `famous_waterfalls`: word pairs that are forms of one word (Niagara/Niagara Falls, Iguazu/Iguazu Falls). The checker rejects them together, so pick one form of each. The same goes for `famous_mountains` and `himalayan_peaks` (Everest/Mount Everest, Fuji/Mount Fuji, Kailash/Mount Kailash) and `alpine_peaks`.
- `european_holiday_regions` is in practice a mix of `french_regions`, `english_counties`, `italian_regions` and `wine_regions` (Tuscany, Provence, Brittany, Normandy, Cornwall). Delete it, or keep it only as a vague hard theme.

## Silly or unfit

- `port_cities`: nearly every large city is a port (250 words). Four port cities read as "cities". Delete, or keep only as a pool for others.
- `places_named_after_people`: Washington, Victoria, Houston, Seattle. Nobody can see the link from four names. Delete.
- `street_names`: high, market, main, church, park. This is street-naming custom (mostly British and American), not a group. Delete.
- `map_words`: south, key, scale, route. Too vague once the compass points are gone.
- `peninsulas`: the words are bare adjectives ("Korean", "Arabian", "Iberian", "Malay") that read as nationalities. Either list the full names ("Iberian Peninsula") or delete the theme.
- `antarctic_places`: McMurdo, Ross Sea, Weddell Sea. Only experts know these. Keep it for flavour on the Antarctic stops if it is wanted there, but it rates 5.
- `silk_road_cities`: Merv, Khiva, Dunhuang are very obscure for a family audience. Rated 5; consider dropping.
- `national_animals`, `national_flowers` and `national_sports`: on screen they are just "animals", "flowers" and "sports" (lion, rose, cricket). The "national" link cannot be seen and would clash with the real animal, flower and sport themes. Rated 5. Consider using them as data only, not as playable themes.
- Questionable words: Twin Towers (`famous_buildings`, `famous_towers`, `new_york_landmarks`) refers to 9/11, Trump Tower (`famous_towers`) is political, and Gaza (`middle_eastern_cities`) brings in a current war. Ban these words in overrides.

## Misplaced

- Canary Islands and Balearic Islands are own words of `famous_natural_features`. They belong in `famous_islands` (and `spanish_regions`, which already has them).
- `ancient_wonders` mixes the New Seven Wonders (Taj Mahal, Machu Picchu, Great Wall, Colosseum, Petra) with ancient ones (Great Pyramid, Colossus). Rename it "wonders of the world", or split it.
- `world_regions` (under `maps_and_globes`) belongs under `regions`.
- `kinds_of_settlements` (city, town, village, hamlet) sits under `streets_and_roads`. It fits better beside `parts_of_a_town` under a "towns and cities" branch.
- `regions`, `famous_natural_features`, `famous_waters`, `streets_and_roads` and `buildings` should be groups, not playable: their own words are catch-alls.
- `national_dishes` largely repeats `Food & Drink > cuisines`, and `traditional_dwellings` repeats `Travel & Transport > accommodation > traditional lodgings` (other domains). Check for overlap.

## Too thin

- `ancient_wonders` (14 words, and only about 7 true wonders).
- `east_african_countries` (10) and `southern_african_countries` (10): few words, and Burundi, Malawi and similar are hard.
- `canadian_provinces` (13; only 10 provinces and 3 territories in existence).
- `german_states` (14; Berlin, Hamburg and Bremen are also cities and clash with `german_cities`).
- `oceanian_countries` (13; beyond Australia and New Zealand, mostly obscure: Marshall Islands, Vanuatu).
- `flags_with_crescents` (15).
- `middle_eastern_countries` (15): acceptable, but it is also sensitive.

## Flags

### sensitive
- `holy_cities`, `religious_buildings`, `famous_mosques`, `famous_churches`, `famous_temples` (religion)
- `middle_eastern_cities` (Gaza, Jerusalem, Mecca), `middle_eastern_countries` (Israel, Syria, Iraq, Iran: war and politics)
- `old_country_names` (Soviet Union, Yugoslavia, East Germany: politics; mild)
- `famous_squares` (Tiananmen, Tahrir)
- `famous_buildings` (Pentagon, Twin Towers, Kremlin)
- `flags_with_crescents` (religious symbol; mild)
- `police_station` (jail, arrest, suspect; mild)

### englishOnly
- `places_that_are_also_words`, `countries_ending_in_ia`, `places_after_new` (wordplay already)
- `city_demonyms` (Londoner, New Yorker, Parisian are English word forms)
- `street_names` (English street-naming customs)
- `foods_named_after_places` (hamburger, frankfurter, cheddar: the link is the English word; borderline)
- `traffic_words` (amber, pavement and British/American road terms; borderline)

## Missing themes

### places ending in land
- Parent: `place names` (new sibling of `countries_ending_in_ia`). Kind: wordplay. Rating: 3.
- Words: Iceland 1, Finland 1, Poland 1, Ireland 1, Thailand 1, Switzerland 1, Scotland 1, England 1, New Zealand 1, Greenland 1, Holland 2, Lapland 2, Queensland 3, Maryland 3, Northern Ireland 2, Portland 3, Cleveland 3, Auckland 2, Oakland 3, Disneyland 2, Jutland 4, Rhineland 4, Sunderland 4

### american capitals
- Parent: `cities > capital cities` (completes a family with the European, Asian and African capitals). Kind: category. Region: North and South America. Rating: 3.
- Words: Washington 1, Ottawa 2, Mexico City 1, Havana 2, Buenos Aires 2, Lima 2, Santiago 2, Bogotá 2, Caracas 3, Quito 3, Brasília 3, La Paz 3, Montevideo 3, Kingston 3, Panama City 3, San José 4, Guatemala City 3, Nassau 3, Asunción 4, Port-au-Prince 4, Santo Domingo 4, Managua 4, San Salvador 4, Tegucigalpa 5

### mexican cities
- Parent: `cities` (sibling of `american_cities` and `canadian_cities`). Kind: category. Region: North America. Rating: 3.
- Words: Mexico City 1, Cancún 1, Acapulco 2, Guadalajara 2, Tijuana 2, Monterrey 3, Puebla 3, Oaxaca 3, Veracruz 3, Puerto Vallarta 2, Mérida 4, Mazatlán 3, Cabo San Lucas 3, Playa del Carmen 3, Tulum 3, Chihuahua 3, Ciudad Juárez 4, León 4, Querétaro 5

### brazilian cities
- Parent: `cities > south american cities`. Kind: category. Region: South America. Rating: 4.
- Words: Rio de Janeiro 1, São Paulo 1, Brasília 2, Salvador 3, Manaus 3, Recife 3, Fortaleza 4, Belo Horizonte 4, Curitiba 4, Porto Alegre 4, Belém 4, Natal 4, Florianópolis 4, Goiânia 5

### russian cities
- Parent: `cities > european cities`. Kind: category. Region: Europe. Rating: 4.
- Words: Moscow 1, St Petersburg 1, Sochi 2, Vladivostok 2, Volgograd 3, Murmansk 3, Kaliningrad 3, Novosibirsk 3, Yekaterinburg 4, Kazan 3, Omsk 4, Irkutsk 4, Samara 4, Nizhny Novgorod 4, Rostov 4, Krasnoyarsk 5, Perm 5

### us state capitals
- Parent: `cities > american cities` (a sub-theme). Kind: category. Region: North America. Rating: 4. A good close sibling to `american_cities`.
- Words: Boston 1, Atlanta 1, Denver 1, Phoenix 1, Honolulu 1, Nashville 2, Austin 2, Sacramento 2, Salt Lake City 2, Indianapolis 2, Albany 3, Tallahassee 3, Juneau 3, Springfield 3, Olympia 3, Annapolis 3, Richmond 3, Santa Fe 3, Boise 3, Columbus 3, Raleigh 3, Baton Rouge 3, Harrisburg 4, Montgomery 4, Carson City 4

### park
- Parent: `everyday places`. Kind: place. Rating: 1.
- Words: bench 1, swing 1, slide 1, pond 1, duck 1, path 1, grass 1, picnic 1, fountain 2, kite 1, playground 1, seesaw 1, lawn 2, frisbee 2, jogger 2, flower bed 2, bandstand 3, gate 2, statue 2, sandbox (sandpit) 2, dog walker 2, park keeper 3, bin 2

### shopping mall
- Parent: `everyday places`. Kind: place. Rating: 2.
- Words: escalator 1, food court 1, store 1, shopping bag 1, elevator (lift) 1, department store 1, changing room 2, cash register (till) 2, parking lot (car park) 2, security guard 2, mannequin 2, shop window 2, checkout 1, sale 2, receipt 2, kiosk 3, fountain 3, directory 3, gift card 2, window shopping 2

### water park
- Parent: `places to visit` (close sibling of `swimming_pool`). Kind: place. Rating: 2.
- Words: water slide 1, wave pool 1, lazy river 1, splash 1, flume 2, rubber ring 2, inner tube 2, lifeguard 2, swimsuit 1, sunscreen 2, towel 1, locker 2, splash pad 2, water gun 2, rapids 3, kiddie pool (paddling pool) 2, life jacket 2, flip-flops 2, queue 3

### famous parks
- Parent: `landmarks`. Kind: category. Rating: 4.
- Words: Central Park 1, Hyde Park 1, Golden Gate Park 3, Stanley Park 3, Regent's Park 3, Phoenix Park 4, St James's Park 3, Tivoli 3, Gorky Park 3, Park Güell 3, Retiro Park 4, Luxembourg Gardens 3, Tuileries 3, Vondelpark 4, Griffith Park 4, Prospect Park 4, Ueno Park 4, Englischer Garten 5, Villa Borghese 4, Boboli Gardens 4

### flags with a sun
- Parent: `flags of the world` (sibling of stars, crescents and crosses). Kind: property. Rating: 4.
- Words: Japan 1, Argentina 2, Uruguay 3, Kazakhstan 3, Philippines 3, Kyrgyzstan 4, Malawi 4, Rwanda 4, Namibia 4, Taiwan 3, Nepal 3, North Macedonia 4, Kiribati 5, Antigua and Barbuda 5, Bangladesh 4, Niger 4

### flags with animals
- Parent: `flags of the world`. Kind: property. Rating: 4.
- Words: Wales 1, Mexico 2, Bhutan 3, Sri Lanka 3, Albania 3, Egypt 3, Ecuador 4, Bolivia 4, Uganda 3, Papua New Guinea 3, Dominica 4, Zambia 4, Kazakhstan 4, Fiji 4, Montenegro 4, Serbia 4, Moldova 4, Kiribati 5, Zimbabwe 4

### famous canyons and gorges
- Parent: `famous natural features`. Kind: category. Rating: 4.
- Words: Grand Canyon 1, Bryce Canyon 3, Antelope Canyon 3, Copper Canyon 3, Cheddar Gorge 3, Three Gorges 3, Zion 3, Kings Canyon 3, Fish River Canyon 4, Verdon Gorge 4, Colca Canyon 4, Samaria Gorge 4, Tiger Leaping Gorge 4, Waimea Canyon 4, Blyde River Canyon 5, Black Canyon 4, Glen Canyon 4

### famous caves
- Parent: `famous natural features`. Kind: category. Rating: 4.
- Words: Lascaux 3, Mammoth Cave 3, Carlsbad Caverns 3, Blue Grotto 3, Waitomo Caves 3, Son Doong 4, Altamira 4, Fingal's Cave 4, Jenolan Caves 4, Postojna 4, Reed Flute Cave 4, Ajanta Caves 4, Elephanta Caves 4, Cheddar Caves 4, Luray Caverns 4, Škocjan Caves 5

### greek landmarks
- Parent: `landmarks by place`. Kind: category. Region: Europe. Rating: 3.
- Words: Parthenon 1, Acropolis 1, Mount Olympus 2, Olympia 2, Delphi 2, Santorini 2, Knossos 3, Meteora 3, Mycenae 3, Corinth Canal 3, Epidaurus 4, Temple of Poseidon 3, Sounion 4, Mount Athos 4, Plaka 4, Agora 3, Erechtheion 4, Lindos 4, Little Venice 4

### spanish landmarks
- Parent: `landmarks by place`. Kind: category. Region: Europe. Rating: 3.
- Words: Sagrada Família 1, Alhambra 2, Park Güell 2, Prado 2, Las Ramblas 2, Camp Nou 2, Bernabéu 3, Guggenheim 2, Plaza Mayor 3, Puerta del Sol 3, Mezquita 3, Alcázar 3, Giralda 4, Casa Batlló 3, Montserrat 3, Escorial 4, Teide 3, Santiago de Compostela 3, Retiro Park 4
