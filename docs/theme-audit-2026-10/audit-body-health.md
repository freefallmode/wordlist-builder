# Audit: Body & Health

Ratings: 115 playable themes. 1: 12, 2: 42, 3: 35, 4: 19, 5: 7. The domain is mostly everyday, so it leans towards 2 and 3.

## Redundant

- `dental_care` (personal care) vs `dental_words` (medicine): same idea (dentist, brace, toothbrush, toothpaste, floss). Keep `dental_words` and merge `dental_care` into it. `teeth` stays as the anatomy sibling.
- `pharmacy` vs `medicines`: typical words are almost the same (medicine, medication, pill, tablet, antibiotic, aspirin). Keep `medicines`. Either delete `pharmacy` or cut it down to place words (counter, pharmacist, prescription, shelf, queue).
- `ways_of_looking` (body movement) vs `sight_words` (senses): look, watch, glance, stare, gaze are in both. Keep `ways_of_looking` for the verbs, and cut `sight_words` down to nouns (vision, sight, view, glimpse) or merge it in.
- `smelly_things` vs `Qualities > smells > things that smell bad` (other domain): duplicate. Keep one (the Qualities one fits the property tree), delete or merge the other.
- `hospital_words` vs `Places & Geography > workplaces > hospital`, and `dental_words` vs `Places & Geography > workplaces > dentist's office`: these are duplicates across domains. Keep the Body & Health ones, or make the Places ones place-only words.
- `toiletries_for_washing` vs `Travel & Transport > packing > toiletries`: these largely overlap. Close siblings at most, so check that the pools differ.
- `hair_care` vs `Places & Geography > everyday places > hair salon`: these overlap. Acceptable if the salon keeps its place words.
- `doctor_s_office` vs `hospital_words`: the typical words share doctor, patient, nurse, blood pressure and injection. They are close but distinct. Keep both, but tidy the shared words.
- `arms_and_legs` vs `joints`: shoulder, knee and elbow are in both. A deliberate close pair is fine, but the shared words should go to one side only.

## Silly or unfit

- `illegal_drugs` (crack, weed, coke, heroin, meth): not for a family game. Delete it, or at least never play it.
- `massage_types` (Swedish, couple, foot, chair, pregnancy, sports): on their own the words mean nothing. Four of them never point to "massage". Delete it.
- `middle_eastern_remedies` (honey, olive oil, date, pomegranate, saffron) and `african_remedies` (shea, rooibos, hibiscus, baobab): players read these as foods or plants, not as remedies. They are catch-alls. Delete them, or move the words to regional foods and plants.
- `body_movement` own words (extension, rotation, coordination, Twitch, tremor): vague and abstract. Make it a group (`group: true`).
- `mind_and_wellbeing` own words (rest, peace, joy, calm, happiness): vague and overlaps `People & Society > emotions`. Make it a group.
- `european_spa_towns`: real town names that only specialists know (Cheltenham, Vichy, Buxton). "bath" also clashes with the common word. Unplayable for most players. Delete it, or rate it 5 and keep it rare.
- `native_american_remedies` (medicine man, smudging, sweat lodge): these touch sacred practices, and "medicine man" is dated. Review it or drop it.

## Misplaced

- `ways_of_speaking` (shout, whisper, mumble): about speech, not body movement. It belongs under `People & Society` or `Language & Wordplay` (communication).
- `smoking_words` and `illegal_drugs` under `medicine`: these are not medicine. Move them to a "habits and substances" branch beside `bad_habits`, or drop them.
- `massage_types`, `spa`, `turkish_bath`, `european_spa_towns` under `mind_and_wellbeing`: better under `personal care`, or a new `spa and bathing` branch.
- `healthy_snacks` under `nutrition`: its words (apple, banana, grape, yogurt) mostly read as Food & Drink, so it clashes with fruit themes. Move it to Food & Drink or make it rare.
- `korean_skincare`: fine as a child of `skincare_products`, but its words (face mask, serum, essence) are mostly generic skincare. Close to a strict subset.
- `body_parts`, `inside_the_body`, `senses`, `illnesses`, `medicine`, `fitness`, `sleep`, `personal_care`, `nutrition`, `babies_and_birth`: playable parents with 6 to 13 children. Fine as parents for family levels, but their own words should not repeat the children's words.

## Too thin

- `cold_weather_ailments` (19 words): includes filler (soup, dry skin, cabin fever). Probably fewer than 8 good words. Merge it into `injuries` or `illnesses`.
- `body_systems` (25 words): doubled entries (nervous / nervous system, immune / immune system), so only about 11 real items, and the bare adjectives (digestive, skeletal) are odd balloons. Keep one form per system.
- `dietary_minerals` (16 words): only about 10 well-known minerals. Borderline.
- `middle_eastern_grooming` (24): henna, kohl and argan oil also appear in `middle_eastern_remedies` and `african_remedies`. Thin once the shared words are taken out.
- `ear_parts` (43 words, but many are drum / eardrum, lobe / earlobe pairs): perhaps 8 to 10 distinct parts.
- `vitamins`: every word contains "vitamin", which makes it a giveaway (rated 1). Fine as an easy reward theme, but it has no depth.

## Flags

### sensitive
- `illegal_drugs`, `smoking_words`, `bad_habits` (smoking, swearing, lying)
- `illnesses`, `infections`, `historic_diseases`, `tropical_diseases` (cancer, dementia, HIV, Ebola, plague, black death)
- `mental_health_words` (depression, trauma, bipolar disorder)
- `pregnancy_words`, `childbirth_words`, `maternity_ward` (birth and pregnancy topics, epidural, C-section)
- `torso` (breast, bottom), `hormones` (testosterone, estrogen)
- `yoga_words` (mantra, karma, guru), `ayurveda_words` (chakra), `native_american_remedies` (sacred practices)
- `operating_room`, `medical_specialties` (plastic surgery, psychiatry, oncology): mild

### englishOnly
- `ways_of_walking`, `ways_of_looking`, `ways_of_speaking`, `sight_words`, `touch_words`, `smell_words`: sets of near-synonyms that collapse into the same word in most languages (stroll / amble, glance / peek, mumble / mutter)
- `body_noises`: partly (onomatopoeic forms)
- `stretches`: phrase-based names (touch toes, arm circle)

## Missing themes

### beard styles
Parent: `Body & Health > body parts > hair`. Kind: category. Rating: 3.
mustache (moustache) 1, goatee 1, stubble 1, full beard 1, sideburns 2, handlebar 2, five o'clock shadow 2, soul patch 3, mutton chops 3, chinstrap 3, walrus 3, horseshoe 3, pencil mustache (pencil moustache) 3, circle beard 4, Van Dyke 4

### hair colors (hair colours)
Parent: `Body & Health > body parts > hair`. Kind: category. Rating: 2.
blond 1, brunette 1, redhead 1, ginger 1, black 1, gray (grey) 1, auburn 2, silver 2, platinum 2, strawberry blond 2, chestnut 2, sandy 2, salt and pepper 2, jet black 2, raven 3, mousy 3, copper 3, honey 3

### ways of laughing
Parent: `Body & Health > body movement`. Kind: category. Rating: 2. (Close sibling of the next theme; together with `ways_of_walking` and the rest this makes a "ways of" family.)
giggle 1, chuckle 1, snicker (snigger) 2, cackle 2, snort 2, belly laugh 2, hoot 2, roar 2, crack up 2, guffaw 3, chortle 3, titter 3

### ways of crying
Parent: `Body & Health > body movement`. Kind: category. Rating: 2.
sob 1, weep 1, wail 2, whimper 2, bawl 2, sniffle 2, whine 2, tear up 2, blubber 3, howl 3, snivel 3, boohoo 3, well up 3, mewl 4

### ways of breathing
Parent: `Body & Health > body movement`. Kind: category. Rating: 3.
inhale 1, exhale 1, gasp 1, pant 1, sigh 1, wheeze 2, puff 2, huff 2, snore 2, sniff 2, yawn 2, gulp 3, hyperventilate 3

### body positions
Parent: `Body & Health > body movement`. Kind: category. Rating: 2.
kneel 1, crouch 1, squat 1, lie 1, sit 1, stand 1, lean 1, slouch 2, sprawl 2, recline 2, hunch 2, cross-legged 2, curl up 2, perch 3, stoop 3, straddle 3, lounge 3

### mouth actions
Parent: `Body & Health > body movement`. Kind: category. Rating: 2. (Sibling of `hand_actions`.)
chew 1, bite 1, lick 1, kiss 1, swallow 1, whistle 1, sip 1, blow 1, spit 2, gulp 2, suck 2, nibble 2, slurp 2, munch 2, gargle 2, yawn 2, pout 3

### sports injuries
Parent: `Body & Health > illnesses`. Kind: category. Rating: 3. (Close sibling of `injuries`.)
sprain 1, blister 1, cramp 1, strain 2, tennis elbow 2, concussion 2, dislocation 2, pulled muscle 2, black eye 2, shin splints 3, torn ligament 3, runner's knee 3, stitch 3, whiplash 3, groin strain 4, jumper's knee 4

### cold and flu remedies
Parent: `Body & Health > medicine`. Kind: category. Rating: 2.
tissue 1, cough drop 1, chicken soup 1, cough syrup 1, lozenge 2, honey and lemon 2, nasal spray 2, vapor rub (vapour rub) 2, hot water bottle 2, steam 2, bed rest 2, painkiller 2, decongestant 3, throat spray 3, ginger tea 3

### digestive system
Parent: `Body & Health > inside the body`. Kind: category. Rating: 3. (Close sibling of `organs`.)
stomach 1, gut 1, intestine 2, liver 2, appendix 2, small intestine 2, large intestine 2, saliva 2, esophagus (oesophagus) 3, gallbladder 3, pancreas 3, colon 3, bowel 3

### shaving
Parent: `Body & Health > personal care`. Kind: category. Rating: 3.
razor 1, shaving cream 1, aftershave 1, stubble 2, blade 2, lather 2, beard trimmer 2, shaving brush 2, clippers 2, foam 2, wax 2, electric razor 2, nick 3, close shave 3, safety razor 3

### sun care
Parent: `Body & Health > personal care`. Kind: category. Rating: 2.
sunscreen 1, sunblock 1, sun hat 1, sunglasses 1, sunburn 1, SPF 2, aloe vera 2, after-sun 2, shade 2, tan 2, UV 2, parasol 3, lip balm 3, rash guard 3, self-tanner 3

### things with eyes
Parent: `Qualities > things with…`. Kind: property. Rating: 3. (Body-part property family with the existing teeth and legs themes, plus the four below.)
needle 1, potato 1, owl 1, hurricane 2, storm 2, teddy bear 2, doll 2, snowman 2, spider 2, peacock feather 3, cyclops 3, target 3

### things with necks
Parent: `Qualities > things with…`. Kind: property. Rating: 3.
bottle 1, guitar 1, giraffe 1, swan 1, violin 2, vase 2, shirt 2, flamingo 2, ostrich 2, cello 2, banjo 2, ukulele 2, jar 3, sweater (jumper) 3, lute 3, flask 3

### things with faces
Parent: `Qualities > things with…`. Kind: property. Rating: 3.
clock 1, watch 1, mask 1, coin 2, cliff 2, emoji 2, snowman 2, doll 2, jack-o'-lantern 2, die 2, totem pole 3, mountain 3, compass 3, sundial 3, cube 3

### things with tongues
Parent: `Qualities > things with…`. Kind: property. Rating: 4.
shoe 1, snake 1, sneaker (trainer) 2, boot 2, bell 2, frog 2, chameleon 2, anteater 2, lizard 2, giraffe 2, flame 3, buckle 3, loafer 3

### things with arms
Parent: `Qualities > things with…`. Kind: property. Rating: 3.
chair 1, armchair 1, octopus 1, starfish 1, sofa 2, robot 2, crane 2, squid 2, glasses 3, signpost 3, record player 3, galaxy 4
