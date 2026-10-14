# Science & Tech audit

## Redundant
- `polygons` vs Qualities > shapes and patterns > 2d shapes: same idea (square, triangle, hexagon). Keep `2d shapes` for the everyday theme; keep `polygons` only if trimmed to true polygons (pentagon, octagon, decagon...) as a harder sibling, else merge.
- `geometry` vs Qualities > 3d shapes: geometry's typical words (cylinder, sphere, cube, cone) are the 3d shapes pool. Strip the solids from `geometry` (leave it as geometry terms: parallel, angle, vertex...).
- `measuring_instruments` vs Home & Everyday > tools > measuring tools vs `math_tools`: tape measure, ruler, yardstick appear in all three. Keep `measuring_instruments` (scientific gauges: barometer, speedometer) and `measuring tools` (household); remove tape measure, ruler, yardstick from `math_tools`.
- `famous_engineers` vs History & Myth > famous people > inventors: Edison, Tesla, Wright brothers, Watt in both. Merge into one (keep `inventors`, or keep `famous_engineers` limited to builders like Eiffel, Brunel, Stephenson).
- `energy_sources` vs Nature & Earth > environment > renewable energy: wind, solar overlap; fine as parent/child conceptually, but `energy_sources` should not be playable next to `renewable energy`. Consider moving `renewable energy` under `energy_sources` as a sibling of `fuels`.
- `temperature_words` vs `heat_science`: heat, degree, temperature, freezing in both. Keep `heat_science` (thermometer, Celsius, insulation) and make `temperature_words` the adjectives only (hot, cold, warm, cool, chilly).
- `forces` vs `physics_words`: force, gravity, weight, pressure in both; `physics_words` is a catch-all superset. Delete or trim `physics_words`.
- `stars` vs `southern_sky`: Alpha Centauri, Proxima Centauri, Canopus in both. Keep `stars`; `southern_sky` is a thin regional variant (see Too thin).
- `space_missions` vs `space_telescopes` vs Travel > special vehicles > space vehicles: Kepler, Hubble, shuttle, Soyuz overlap. Keep missions and vehicles; fold `space_telescopes` into `space_missions`.
- `imperial_units` cuts across `length_units`, `weight_units`, `volume_units` (foot, pound, gallon are in both). Not a strict duplicate, but it can never share a level with them; fine as a late-game theme only.

## Silly or unfit
- `nobel_laureates`: typical words are Obama, Mandela, Dalai Lama, Mother Teresa: politics and religion, not science, and four famous names never point to "Nobel". Delete or move to People & Society, sensitive.
- `famous_experiments`: Milgram and Stanford prison are not family-friendly topics; Pavlov's dogs, Schrodinger's cat are expert. Remove those two words, or drop the theme.
- `famous_discoveries`: catch-all (Tutankhamun, gravity, DNA, penicillin); four words rarely point to one idea.
- `chemistry_words`, `physics_words`, `biology_words`, `math_terms`: catch-all "X words" pools (solution, metal, element / force, energy / cell, species). Hard to separate from their own sibling themes. Keep only as late fillers, or drop.
- `battery_types`: "açaí" is a typical word, a data error (the berry). Remove; check the pool for other mismatches.
- `ai_words`: contains "Claude", "ChatGPT", "Alexa" (trademarks, fast-dating). Keep the generic words (chatbot, algorithm, prompt).
- `computer_actions`: "Google" as a verb is a trademark; remove.
- `nuclear_words`: "Hiroshima" is a war word; remove from a family game pool.
- `inca_engineering`: very few players could name "Inca engineering" from terrace, stone wall, canal, aqueduct; a place-flavour theme, not a group.

## Misplaced
- `famous_mathematicians`, `famous_engineers`: siblings of `famous_physicists` and `famous_naturalists`; move under `scientists`.
- `science_fields` (+ `branches_of_biology`, `earth_sciences`) is not history; move to the top of Science & Tech.
- `nobel_laureates`: belongs in People & Society or History & Myth > famous people, not science history.
- `inca_engineering`: belongs under History & Myth > ancient civilizations (Inca) or `engineering`.
- `temperature_words` (hot, cold, warm): adjectives, belongs in Qualities > temperature rather than measurement.
- `life_cycle_words` (baby, adult, death, childhood): human life stages, belongs in People & Society; for biology keep only egg, larva, pupa, seed, seedling...
- `famous_discoveries`: Tutankhamun is archaeology; split by field or remove non-science items.
- `robots`: "Android" and "transformer" are trademark or ambiguous; "drone" belongs to gadgets.

## Too thin
- `space_telescopes`: only Hubble, James Webb and Kepler are widely known; the rest (Tess, Chandra, Gaia, Euclid) are expert or ambiguous.
- `southern_sky`: 32 words, mostly expert (crux, Pointers, Matariki, Canopus).
- `islamic_golden_age_scholars`: 25 names, only Avicenna and Omar Khayyam widely known.
- `australian_inventions`: 24 words, several dubious as "inventions" (Vegemite, didgeridoo, boomerang, stubby holder).
- `circle_parts`: 19 words; about 8 good ones (center, radius, diameter, circumference, arc, chord, sector, tangent). Usable but at the limit.
- `planets`: 14 own words; fine (8 planets plus Pluto), just note it has no room for variety across 600 levels with a 10-level gap.
- `middle_eastern_inventions`: 26, mixes inventions with ideas (algebra, alphabet) and a drink (coffee).

## Flags
### sensitive
- `nobel_laureates` (politics, religion)
- `nuclear_words` (Hiroshima, weapons)
- `nuclear_power_plant` (meltdown, radiation)
- `viruses` (COVID-19, HIV, Ebola)
- `famous_experiments` (Milgram, Stanford prison)
- `evolution_words` (contested in some schools and countries)
- `life_cycle_words` (death)
- `famous_physicists` (Oppenheimer, the bomb) - mild
- `cybersecurity_words` (hacker, phishing) - mild, optional

### englishOnly
- `internet_words` (LOL, English slang and acronyms)
- `keyboard_keys` (key labels differ in other languages: Entf, Échap)
- `big_numbers` (zillion, gazillion)
- `old_units` (furlong, fathom, bushel: English tradition)
- `imperial_units` (foot, stone, pint: anglophone only)
- `computer_actions` (Google as a verb)

## Missing themes

### data units
Parent: Science & Tech > computers. Kind: category. Rating: 2.
bit 1, byte 1, kilobyte 1, megabyte 1, gigabyte 1, terabyte 2, petabyte 3, exabyte 4, zettabyte 4, yottabyte 4, nibble 4, megabit 3, gigabit 3

### computer storage
Parent: Science & Tech > computers. Kind: category. Rating: 2.
hard drive 1, USB stick 1, flash drive 1, memory card 1, SD card 2, floppy disk 1, CD 1, DVD 1, Blu-ray 2, SSD 2, external drive 2, cloud 2, cassette 3, magnetic tape 3, server 3, thumb drive 2

### cables and connectors
Parent: Science & Tech > computers > networking (or gadgets). Kind: category. Rating: 3.
USB 1, HDMI 2, charger 1, adapter 1, plug 1, socket 1, extension cord 1, power strip 2, Ethernet 2, aux cable 2, headphone jack 2, VGA 3, coaxial 4, USB-C 2, power cord 1, splitter 3

### things with screens
Parent: Qualities > things with… Kind: property. Rating: 2.
phone 1, television 1, laptop 1, tablet 1, monitor 1, smartwatch 1, ATM 2, e-reader 2, GPS 2, cinema 2, microwave 3, calculator 2, game console 2, dashboard 3, scoreboard 2, billboard 3, cash register 3, camera 2

### things that run on batteries
Parent: Qualities > things that… Kind: property. Rating: 2.
flashlight (torch) 1, remote control 1, smoke alarm 1, toy car 2, watch 1, calculator 2, hearing aid 2, electric toothbrush 2, doorbell 3, wall clock 2, game controller 2, phone 1, cordless drill 3, scale 3, pacemaker 3, key fob 3, radio 2

### scientific method
Parent: Science & Tech (top level, or science places > science fair). Kind: category. Rating: 3.
question 2, hypothesis 1, prediction 1, experiment 1, observation 1, data 2, results 1, conclusion 1, variable 2, control 2, theory 2, evidence 2, analysis 2, trial 2, measurement 2, research 2, sample 3, peer review 3

### science experiments for kids
Parent: Science & Tech > science places > science fair. Kind: category. Rating: 2.
baking soda volcano 1, slime 1, crystal growing 1, potato battery 2, lava lamp 2, invisible ink 2, egg drop 2, balloon rocket 2, oobleck 3, static balloon 2, rainbow milk 3, elephant toothpaste 3, paper airplane 1, density tower 3, homemade compass 3, magnet maze 3, egg in a bottle 3

### science fiction gadgets
Parent: Science & Tech > gadgets. Kind: category. Rating: 2.
time machine 1, teleporter 1, ray gun 1, jetpack 1, hoverboard 1, force field 2, tractor beam 2, warp drive 3, invisibility cloak 2, shrink ray 2, flying car 1, hologram 2, laser sword 2, robot butler 2, cloning machine 3, stasis pod 4, universal translator 3

### optical instruments
Parent: Science & Tech > physics > light words. Kind: category. Rating: 2.
telescope 1, microscope 1, binoculars 1, magnifying glass 1, periscope 2, kaleidoscope 2, spyglass 2, monocle 2, camera 2, projector 2, loupe 3, spectacles 1, contact lens 2, prism 3, sextant 4, opera glasses 3

### rocket parts
Parent: Science & Tech > space > spaceflight words. Kind: category. Rating: 3.
nose cone 1, fins 1, booster 2, engine 1, fuel tank 1, nozzle 2, capsule 2, payload 3, stage 2, thruster 2, heat shield 2, launch escape tower 4, oxidizer tank 4, guidance system 3, parachute 2

### astronaut gear
Parent: Science & Tech > space > spaceflight words. Kind: category. Rating: 2.
spacesuit 1, helmet 1, visor 2, gloves 1, boots 1, oxygen tank 1, tether 2, jetpack 2, backpack 2, radio 2, space food 2, sleeping bag 3, diaper 3, cooling garment 4, mission patch 3, checklist 3

### machine parts
Parent: Science & Tech > engineering. Kind: category. Rating: 2.
gear 1, cog 1, spring 1, bolt 1, nut 1, axle 1, piston 2, crank 2, bearing 2, sprocket 3, shaft 2, flywheel 3, valve 2, belt 2, chain 1, hinge 2, camshaft 4, pulley 2, lever 1

### bridge parts
Parent: Science & Tech > engineering. Kind: category. Rating: 3.
deck 2, pier 2, span 2, cable 2, tower 1, arch 1, girder 3, truss 3, abutment 4, railing 1, roadway 2, pylon 3, foundation 2, beam 2, keystone 3, suspension cable 3

### metric units
Parent: Science & Tech > measurement (close sibling of imperial units). Kind: category. Rating: 2.
meter (metre) 1, centimeter (centimetre) 1, millimeter (millimetre) 1, kilometer (kilometre) 1, gram 1, kilogram 1, milligram 2, liter (litre) 1, milliliter (millilitre) 1, tonne 2, hectare 2, Celsius 2, centiliter (centilitre) 3, decimeter (decimetre) 3, hectoliter (hectolitre) 4

### material properties
Parent: Science & Tech > engineering > materials science. Kind: property. Rating: 3.
transparent 1, opaque 2, translucent 2, flexible 1, rigid 2, brittle 2, magnetic 1, waterproof 1, absorbent 2, elastic 1, durable 2, malleable 3, conductive 3, insulating 3, fireproof 2, porous 3, dense 3

### lab safety gear
Parent: Science & Tech > chemistry > lab equipment. Kind: category. Rating: 2.
goggles 1, lab coat 1, gloves 1, apron 2, face shield 2, fire extinguisher 1, eyewash station 3, fume hood 3, safety shower 3, fire blanket 2, mask 2, first aid kit 1, sharps bin 4, spill kit 4

### ordinal numbers
Parent: Science & Tech > math > numbers. Kind: category. Rating: 1.
first 1, second 1, third 1, fourth 1, fifth 1, sixth 1, seventh 1, eighth 1, ninth 1, tenth 1, eleventh 2, twelfth 2, twentieth 2, hundredth 2, thousandth 3, last 2
(Note: clashes with `fractions` (third, fourth); the checker keeps them apart, and they make a good close pair late on.)

### electromagnetic spectrum (family-friendly late theme)
Parent: Science & Tech > physics > light words. Kind: category. Rating: 3.
radio waves 2, microwaves 2, infrared 2, visible light 2, ultraviolet 2, X-rays 1, gamma rays 2, UV 2, terahertz 5, long wave 4, shortwave 3, light 1
(Only about 8 strong words; add only if the game accepts 8-word pools.)
