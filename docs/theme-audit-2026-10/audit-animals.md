# Audit: Animals

Ratings: 169 playable themes. Distribution 1: 22, 2: 51, 3: 52, 4: 33, 5: 11.

## Redundant

- `whales_and_dolphins` (under mammals) and `sea_mammals` (under sea life): the same animals in two branches, and `seals_and_sea_lions` is already a child of `sea_mammals`. Keep both themes but move `whales_and_dolphins` under `sea_mammals` so the two siblings (cetaceans, pinnipeds) sit together and are never on screen with their parent.
- `extinct_animals` vs `prehistoric_life`: typical words nearly the same (dinosaur, mammoth, mastodon, woolly mammoth, dire wolf, sabertooth). Keep both only if `extinct_animals` is cut back to recent extinctions (dodo, passenger pigeon, thylacine, great auk, quagga, Steller's sea cow, moa); otherwise merge it into `prehistoric_life`.
- `savanna_animals` vs `african_animals`: savanna is practically a subset (lion, elephant, rhino, zebra, giraffe, cheetah, hippo). Keep `savanna_animals` (crisper), turn `african_animals` into a group or make sure the two are never on screen together.
- `antarctic_animals` vs its child `penguins`: the parent's typical words are almost all penguins. Either make `antarctic_animals` a group or strip the penguin species from its own words (keep seals, krill, orca, albatross, skua, petrel).
- `amazon_animals` vs `rainforest_animals`: heavy overlap (jaguar, sloth, toucan, macaw, dart frog). Close-sibling on purpose is fine, but they are in different branches and the checker must treat them as overlapping.
- `himalayan_animals`, `alpine_animals`, `andean_animals` vs `mountain_animals`: `mountain_animals` is the union of the three. Fine as a parent idea; flag only so the overlap is known.
- `ocean_giants` largely repeats `whales_and_dolphins` plus whale shark, manta, giant squid. Keep (property theme), low priority.

## Silly or unfit

- `animal_words` (species, pet, wildlife, breed, prey, habitat): a catch-all; four words never point to one idea. Make it a group (never played).
- `british_wildlife` (280 own words), `north_american_animals`, `north_american_birds` (215), `european_animals`, `middle_eastern_animals`: catch-alls of common animals (fox, wolf, deer, robin, goat) that no player can tell apart from any other animal theme. Play only as groups, or cut each to animals that are distinctive for the region.
- `turkish_animals`: wolf, goat, wild boar, brown bear plus Kangal and mouflon; not a recognisable group outside Turkey.
- Word-level problems: `female_animals` has "bitch" (ban the word); `horse_family` has "ass" and "jackass" (ban); `male_animals` "cock" (prefer rooster, ban in early levels); `sheep_breeds` lists "wool" and "fleece", `chicken_breeds` lists "rooster" (not breeds); `deer` lists "antler"; `reptiles_and_amphibians` lists "dinosaur" and "pterodactyl" (not modern reptiles, and they clash with `prehistoric_life`).
- `dinosaur_words` (egg, bone, dig, nest) and `animal_diets` ("feed") contain weak generic words; usable only with careful word choice.

## Misplaced

- `whales_and_dolphins` should sit under `sea_mammals` (see Redundant).
- `animal_words` should be a group (see above). Same for `african_animals` and `antarctic_animals` if they are not trimmed.
- `prehistoric_periods` mixes geological periods (Jurassic, Cretaceous, Triassic) with archaeological ages (Stone Age, Bronze Age, Iron Age); the ages belong under History. Split or move the ages out.
- `prehistoric_life` lists "Neanderthal" and "prehistory": human prehistory, not animals.
- `horses` (top level) duplicates the branch `hoofed_mammals`; acceptable for browsing, but `horse_family` overlaps `hoofed_mammals` and `working_animals` (donkey, mule).
- `bird_body_parts`, `fish_body_parts`, `insect_body_parts` and `parts_of_a_horse` are not children of `animal_body_parts`; they would make a natural family under it.

## Too thin

- `vultures`: 22 words, mostly variants (griffon / griffon vulture, condor / Andean condor / California condor); fewer than 8 distinct names a player knows.
- `animals_with_tusks`: 28 words but mostly elephant and mammoth variants; distinct ones are about elephant, walrus, warthog, narwhal, mammoth, boar, hippo.
- `seaweeds`: words mostly rare (laver, wrack, frond, agar).
- `jellyfish_and_relatives`: beyond jellyfish types, words are specialist (Hydra, medusa, polyp, sea wasp).
- `pony_breeds`: almost all British place names (Dartmoor, Exmoor, Connemara, New Forest); rare outside the UK.
- `sea_reptiles`, `flying_reptiles`: apart from plesiosaur and pterodactyl, Latin genus names only experts know.
- `galapagos_animals`: 31 words but mostly "Galápagos X" variants.
- `antarctic_animals`: few non-penguin words.

## Flags

### sensitive
- `prehistoric_life`, `prehistoric_periods`, `ice_age_animals` (evolution, Neanderthal): mild; only if schools in some markets are a concern.
- `game_birds` (hunting context): mild.
- No theme in this domain is strongly sensitive; handle the word-level cases above (bitch, ass, jackass, cock; "murder" in `collective_nouns`) by banning words instead.

### englishOnly
- `animal_sounds` (onomatopoeia differs per language: moo, quack, meow, tweet).
- `collective_nouns` (English idiom: murder, parliament, pride, school).
- `male_animals`, `female_animals` (English-specific names: drake, cob, jill, vixen, ewe; many languages have none).
- `baby_animals` (joey, kid, cygnet, leveret: many have no single-word equivalent).
- `animal_adjectives` (canine, feline, bovine, equine: Latinate English).
- `horse_colors` (bay, pinto, piebald, skewbald, roan).
- `biting_bugs` has the slang "mozzie" (word-level; ban or keep only in British/Australian contexts).
- `terriers` uses English nicknames (Yorkie, Westie, Scottie): word-level.

## Missing themes

### crows and ravens
Parent: Animals > birds > songbirds. Kind: category. Rating: 3.
crow 1, raven 1, magpie 1, jay 2, blue jay 2, rook 3, jackdaw 3, chough 5, nutcracker 4, carrion crow 3, hooded crow 4, treepie 5, common raven 2, American crow 3

### pigeons and doves
Parent: Animals > birds. Kind: category. Rating: 2.
pigeon 1, dove 1, turtle dove 2, wood pigeon 2, mourning dove 3, rock dove 3, homing pigeon 2, carrier pigeon 2, racing pigeon 2, collared dove 3, crowned pigeon 4, passenger pigeon 3, fantail 4, ring-necked dove 4, dodo 4

### camels and llamas
Parent: Animals > mammals > hoofed mammals. Kind: category. Rating: 2.
camel 1, llama 1, alpaca 1, dromedary 2, Bactrian camel 3, vicuña 4, guanaco 4, hump 2, camel train 3, cria 5, Arabian camel 3, wild camel 3 (a small family: about 7 real members)

### wild pigs
Parent: Animals > mammals > hoofed mammals. Kind: category. Rating: 3.
boar 1, wild boar 1, warthog 1, hog 2, peccary 4, javelina 4, babirusa 4, bushpig 4, red river hog 4, forest hog 5, pygmy hog 5, razorback 4, tusker 4

### flies
Parent: Animals > insects and bugs. Kind: category. Rating: 2.
fly 1, housefly 1, fruit fly 1, horsefly 2, bluebottle 3, blowfly 3, gnat 2, crane fly 3, mayfly 2, sandfly 3, tsetse fly 3, botfly 4, hoverfly 3, greenbottle 4, daddy longlegs 2, midge 2

### ants and termites
Parent: Animals > insects and bugs. Kind: category. Rating: 2.
ant 1, termite 1, anthill 1, fire ant 2, army ant 2, leafcutter ant 3, carpenter ant 3, bullet ant 4, queen ant 2, worker ant 2, soldier ant 3, ant colony 2, white ant 4, weaver ant 4, honeypot ant 4, termite mound 2

### grasshoppers and crickets
Parent: Animals > insects and bugs. Kind: category. Rating: 2.
grasshopper 1, cricket 1, locust 1, katydid 3, mole cricket 4, bush cricket 4, cave cricket 4, field cricket 3, house cricket 3, swarm 2, chirp 2, desert locust 3, lubber 5

### worms
Parent: Animals > insects and bugs (or new branch "worms and slugs"). Kind: category. Rating: 2.
worm 1, earthworm 1, glowworm 2, silkworm 2, tapeworm 2, roundworm 3, flatworm 3, lugworm 4, ragworm 4, bloodworm 4, mealworm 2, inchworm 2, wireworm 4, hookworm 3, leech 2, nightcrawler 3

### starfish and sea urchins
Parent: Animals > sea life. Kind: category. Rating: 3.
starfish 1, sea star 1, sea urchin 1, sand dollar 2, sea cucumber 2, brittle star 3, feather star 4, crown-of-thorns 3, sunflower star 4, sea lily 4, basket star 5, cushion star 4

### rabbits and hares
Parent: Animals > mammals. Kind: category. Rating: 1.
rabbit 1, bunny 1, hare 1, jackrabbit 2, cottontail 2, snowshoe hare 3, Arctic hare 3, mountain hare 3, pika 4, lop 3, Angora 3, buck 3, doe 3, kit 4, warren 3, burrow 2

### dog commands
Parent: Animals > domestic animals > pets (new). Kind: category. Rating: 2. (Partly English: flag englishOnly.)
sit 1, stay 1, fetch 1, heel 2, beg 1, roll over 1, shake 2, paw 2, down 2, come 1, drop it 2, leave it 2, speak 2, play dead 3, high five 2

### cat behaviors (cat behaviours)
Parent: Animals > domestic animals > pets (new). Kind: category. Rating: 2.
purr 1, hiss 1, pounce 1, scratch 1, knead 2, groom 2, meow (miaow) 1, stalk 2, nap 1, lick 1, chirrup 4, swish 3, arch 2, prowl 2, curl up 2, hairball 2

### spiny animals
Parent: Animals > animal traits. Kind: property. Rating: 2.
hedgehog 1, porcupine 1, echidna 2, sea urchin 1, pufferfish 2, thorny devil 3, lionfish 3, stingray 3, tenrec 4, crown-of-thorns 3, porcupinefish 4, spiny lobster 3, spiny mouse 4, horned lizard 3

### hopping animals
Parent: Animals > animal traits. Kind: property. Rating: 2.
kangaroo 1, rabbit 1, frog 1, wallaby 1, grasshopper 1, toad 2, hare 2, flea 2, jerboa 3, kangaroo rat 3, springbok 3, cricket 2, springhare 4, tree kangaroo 4, sifaka 4

### long-necked animals
Parent: Animals > animal traits. Kind: property. Rating: 2.
giraffe 1, swan 1, ostrich 1, flamingo 1, llama 2, camel 2, heron 2, emu 2, alpaca 2, gerenuk 4, okapi 3, crane 2, brontosaurus 2, Diplodocus 3, plesiosaur 4, cormorant 3

### pink animals
Parent: Animals > animal traits. Kind: property. Rating: 2.
flamingo 1, pig 1, axolotl 2, roseate spoonbill 3, pink river dolphin 3, piglet 1, shrimp 2, prawn 2, galah 4, pink fairy armadillo 4, orchid mantis 4, starfish 3, salmon 3, naked mole rat 3, pink cockatoo 4

### tentacled animals
Parent: Animals > animal traits. Kind: property. Rating: 3.
octopus 1, squid 1, jellyfish 1, cuttlefish 2, sea anemone 2, nautilus 3, Portuguese man-of-war 3, giant squid 2, snail 3, sea cucumber 4, star-nosed mole 4, hydra 4, comb jelly 4

### gliding animals
Parent: Animals > animal traits. Kind: property. Rating: 3.
flying squirrel 1, sugar glider 2, flying fish 1, flying frog 2, flying lemur 3, colugo 4, flying snake 3, flying lizard 3, flying gecko 4, draco 4, flying squid 3, greater glider 4, gliding possum 3

### insect eaters
Parent: Animals > animal traits. Kind: property. Rating: 3.
anteater 1, aardvark 1, pangolin 2, armadillo 2, echidna 2, numbat 3, shrew 2, mole 2, woodpecker 2, swallow 3, chameleon 2, gecko 2, Venus flytrap 2, aardwolf 4, swift 3, bat 2

### hybrid animals
Parent: Animals > animal words. Kind: category. Rating: 3.
mule 1, liger 1, tigon 2, hinny 4, zorse 2, zonkey 2, wholphin 3, beefalo 3, cama 4, grolar bear 3, pizzly bear 3, dzo 5, leopon 4, labradoodle 2, cockapoo 2, geep 3
