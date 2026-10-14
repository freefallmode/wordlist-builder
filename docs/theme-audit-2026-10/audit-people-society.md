# Audit: People & Society

139 playable themes rated. Distribution: 1 = 16, 2 = 47, 3 = 46, 4 = 22, 5 = 8.

## Redundant

- `texting_abbreviations` duplicates Language & Wordplay > slang and sayings > text speak. Keep one (text speak, under wordplay where it is English-only anyway); delete or merge `texting_abbreviations`.
- `greetings_around_the_world` duplicates Language & Wordplay > foreign words > hello around the world. Keep the wordplay one; delete `greetings_around_the_world` (or keep only as a pointer).
- `legal_latin` overlaps heavily with Language & Wordplay > foreign words > latin phrases (per se, de facto, ad hoc, status quo, pro bono). Keep `legal_latin` only if it is cut down to real legal terms (affidavit, habeas corpus, subpoena); otherwise merge into latin phrases.
- `business_words` and `workplace_words`: same pool in practice (office, meeting, staff, manager, director). Merge into one (`workplace_words`), or give `business_words` only commercial words (profit, merger, supplier, invoice).
- `journalism_words` vs `newspaper_words`: typical words almost identical (news, press, article). Keep both only if journalism is limited to people and actions (reporter, editor, scoop, interview, source) and newspaper to the object (headline, front page, crossword, edition).
- `food_jobs` vs `service_jobs`: waiter, waitress, bartender in both. Remove them from `service_jobs`.
- `classroom_items` vs `stationery`: pen, pencil, marker in both. Keep `classroom_items` to furniture and fixtures (desk, board, globe, projector, locker).
- `cowboy_words` overlaps History & Myth > historical periods > wild west and slang > cowboy slang; `old_time_jobs` overlaps History & Myth > medieval times > medieval jobs. Close siblings are fine, but check that the same words are not in both pools.
- `military` (own words: war, battle, attack, victory, enemy) overlaps History & Myth > wars and battles > war words. Move the war vocabulary to war words and leave `military` as a parent with few own words.
- `royal_titles` overlaps History & Myth > medieval times > feudal ranks (duke, count, baron). Make sure feudal ranks is the non-royal nobility and royal titles the royal family.

## Silly or unfit

- `crimes`: typical words include **rape**, **terrorism**, **murder**, **kidnapping**. Not family-friendly as balloon words. Remove rape and terrorism from the pool; keep the theme to theft, robbery, fraud, burglary, forgery, shoplifting, vandalism.
- `punishments`: **torture** and **death penalty** in the typical words. Remove them.
- `texting_abbreviations`: **lmao** (and probably wtf, omg variants) in the typical words. Remove the swearing ones.
- `international_organizations`: the word **"who"** is stored lower case, so it shows as the pronoun "who", not WHO. Fix the capitalisation in the library (WHO), or drop it.
- `religion` own words include **Scientology** and **voodoo**: contested or loaded for a family game; remove them and keep world religions.
- `famous_saints`: typical words are bare first names (George, Paul, Peter, Mary, Patrick). Unplayable: the player cannot tell them from ordinary names. Either use full forms only (Saint Nicholas, Saint Patrick) or drop the theme.
- `social_media_platforms`: trademarks only (Facebook, Instagram, WhatsApp). Recognisable, but it is a brand list and dates fast; flag as trademark and keep it out of early levels.
- Vague catch-alls where four words rarely point to one idea: `groups_of_people` (team, family, party, club), `words_for_a_person` (man, person, someone), `government_words` (law, policy, department, tax), `workplace_words`, `business_words`, `media_and_communication` (own words), `money_words` (money, bill, poor, price), `parts_of_parliament` (chamber, bill, member, vote, seat). Keep as containers or late-game only (rated 4 to 5).
- `troublemakers`: "rat" in the typical words reads as the animal; minor, remove it.

## Misplaced

- `government` has 0 own words and 12 sub-themes but is `group: false`: make it a group.
- `money` has 1 own word ("coin") and 10 sub-themes: make it a group (move "coin" to `coins`).
- `navy_words` typical words (port, deck, harbor, dock, anchor) are sailing and harbour words, not navy words; they belong under Travel & Transport > boats and ships. Refill `navy_words` with naval words (fleet, admiral, sailor, torpedo, sonar, convoy) or merge into `military`.
- `air_force_words` typical words (pilot, jet, runway, cockpit) are aviation words; same problem. Refill with air-force-specific words (squadron, bomber, fighter, wingman, airbase, sortie).
- `medals_and_honors` typical words are Olympic medals (gold, silver, bronze, gold medal): belongs with Sports & Games > sporting events > trophies and prizes, or should be refilled with military and civil honours (Purple Heart, Victoria Cross, knighthood, OBE).
- `cowboy_words` and `gaucho_words` are cultures, not jobs: move to `society` (next to `maori_culture`, `aboriginal_culture`).
- `honorifics` sits under family and friends; it belongs under `society` or `kinds of people`.
- `greetings` (with its child) and `ways_to_say_goodbye` would sit better under `manners_and_etiquette` or `media_and_communication` than family and friends.

## Too thin

No theme has fewer than 34 own words, but some pools are inflated by forms of one word (the checker bans those together, so the usable pool is far smaller):

- `latin_american_currencies`: peso, Mexican peso, Argentine peso; real, Brazilian real.
- `asian_currencies`: yen, Japanese yen; yuan, Chinese yuan; rupee, Indian rupee; won, Korean won.
- `african_currencies`: naira, Nigerian naira; pound, Egyptian pound.
- `european_currencies`: pound, pound sterling, sterling; euro, Euros; franc, Swiss franc.
- `university_degrees`: bachelor, bachelor's, bachelor's degree; master's, master's degree; plus "computer science" (a subject, not a degree).
- `ottoman_titles`: Aga, agha; vizier, grand vizier; sultan, sultana. Probably under 15 distinct, mostly rare.
- `medals_and_honors`: gold, gold medal; silver, silver medal; bronze, bronze medal.
- `graduation_words` (34): graduate, graduation, graduation day. Thin once forms are merged.

## Flags

### sensitive

- Religion: `religion`, `religion_words`, `religious_festivals`, `religious_leaders`, `holy_books`, `angels_and_spirits`, `places_of_worship`, `pilgrimage_sites`, `famous_saints`, `religious_clothing`, `afterlife_words`, `islam_words`, `judaism_words`, `buddhism_words`, `hinduism_words`.
- War and weapons: `military`, `army_words`, `modern_weapons`, `historic_weapons`, `warships`, `military_units`.
- Crime and punishment: `crimes`, `punishments`, `prison_words`.
- Politics: `political_ideologies`, `types_of_government`, `election_words`, `us_government`, `british_politics`, `protest_words`, `social_classes`.
- Death, divorce, grief: `life_events` (funeral, divorce), `relationships` (divorce), `sad_words` (depressed, depression, grief).
- `spy_words` (mild; espionage, assassin likely in the pool).

### englishOnly

- `money_slang`, `texting_abbreviations`, `terms_of_endearment`, `words_for_friend` (mate, bro, dude), `greetings`, `ways_to_say_goodbye`, `surprised_words` (wow, whoa, oh my), `disgust_words` (ugh, eww, yuck), `honorifics` (Mrs., Miss), `words_for_a_person` (guy, dude), `legal_latin`, `troublemakers` (rascal, brat).
- Culture-specific rather than language (consider the same flag or a region tag): `coins` (penny, nickel, dime, quarter), `tax_words` (IRS), `british_politics`, `us_government`.

## Missing themes

Checked against `all-theme-names.txt` (gestures, facial expressions, ways of speaking, railroad jobs, flight crew, ship crew, hotel staff, theater jobs, sports officials, nationalities, superstitions, in a wallet, party supplies and party games already exist).

### emergency workers
- Parent: jobs. Kind: category. Rating: 1.
- firefighter 1, paramedic 1, police officer 1, lifeguard 1, ambulance driver 1, coastguard 2, rescue worker 2, dispatcher 3, fire chief 3, search and rescue 3, mountain rescuer 3, lifeboat crew 3, EMT 3, park ranger 3, first responder 2, bomb disposal 4

### transport jobs
- Parent: jobs. Kind: category. Rating: 2.
- pilot 1, bus driver 1, taxi driver 1, truck driver (lorry driver) 1, train driver 1, chauffeur 2, courier 2, flight attendant 2, sailor 2, ferryman 3, delivery driver 1, cabbie 3, trucker 2, ship captain 2, tram driver 3, rickshaw driver 3, air traffic controller 3

### beauty jobs
- Parent: jobs. Kind: category. Rating: 2.
- hairdresser 1, barber 1, makeup artist 1, stylist 2, manicurist 2, beautician 2, hair stylist 2, nail technician 2, colorist (colourist) 3, massage therapist 2, esthetician (aesthetician) 4, tattoo artist 2, wig maker 3, personal shopper 3, image consultant 4

### shopkeepers
- Parent: jobs. Kind: category. Rating: 2. Good close sibling to `food_jobs` and `old_time_jobs`.
- grocer 1, florist 1, jeweler (jeweller) 1, baker 1, butcher 1, greengrocer 2, fishmonger 2, newsagent 3, bookseller 2, pharmacist 1, optician 2, tailor 2, cobbler 2, shoemaker 2, toymaker 3, ironmonger 4, stationer 3, confectioner 3

### family nicknames (new sub-branch of family and friends, a family of four)

#### words for mother
- Parent: family and friends > family nicknames. Kind: category. Rating: 2.
- mom (mum) 1, mommy (mummy) 1, mama 1, mother 1, ma 2, mamma 2, mother dear 3, mater 4, momma 2, mammy 3, mumsy 4, mam 3

#### words for father
- Parent: family and friends > family nicknames. Kind: category. Rating: 2.
- dad 1, daddy 1, papa 1, father 1, pa 2, pop 2, pops 3, pappy 3, old man 3, da 4, pater 4, poppa 3

#### words for grandparents
- Parent: family and friends > family nicknames. Kind: category. Rating: 2.
- grandma 1, grandpa 1, granny 1, nana 1, gran 2, nan 2, gramps 2, granddad 1, grandpappy 3, pop-pop 3, nanna 2, gramma 3, grandmama 3, grandpapa 3, meemaw 4, peepaw 4

#### words for kids
- Parent: family and friends > family nicknames. Kind: category. Rating: 2.
- kid 1, child 1, kiddo 2, tot 2, toddler 1, youngster 2, little one 2, tyke 3, munchkin 3, rugrat 3, nipper 4, whippersnapper 4, sprog 4, bairn 4, sprout 3

### kinds of party
- Parent: family and friends. Kind: category. Rating: 1.
- birthday party 1, sleepover 1, picnic 1, barbecue 1, tea party 1, costume party 2, pool party 1, baby shower 2, housewarming 2, potluck 3, surprise party 1, dinner party 1, prom 2, reunion 2, slumber party 2, garden party 2, block party 3, pajama party (pyjama party) 2, bridal shower 3, farewell party 2

### school events
- Parent: school. Kind: category. Rating: 2.
- field trip 1, sports day 1, prom 2, assembly 2, science fair 2, bake sale 2, spelling bee 2, talent show 1, school play 1, open day 3, parents' evening 3, show and tell 2, book fair 2, school dance 2, picture day 2, fire drill 1, graduation 1, homecoming 3

### places in a school
- Parent: school. Kind: category. Rating: 1.
- classroom 1, library 1, gym 1, playground 1, cafeteria (canteen) 1, hallway (corridor) 1, principal's office 2, science lab 1, locker room 2, auditorium 2, staff room 2, school hall 2, art room 1, music room 1, computer lab 2, nurse's office 2, sports field 1

### things you do with money
- Parent: money. Kind: category. Rating: 2. Close sibling of `banking_words`.
- spend 1, save 1, earn 1, pay 1, borrow 1, lend 1, owe 2, invest 2, donate 1, waste 1, budget 2, splurge 2, tip 1, bargain 2, haggle 2, squander 3, hoard 3, withdraw 2, deposit 2, refund 2

### ways to say yes
- Parent: family and friends (or media and communication). Kind: category. Rating: 2. englishOnly.
- yes 1, yeah 1, sure 1, okay 1, yep 1, of course 1, absolutely 1, certainly 2, definitely 1, indeed 2, aye 3, affirmative 2, uh-huh 2, you bet 2, roger 3, by all means 3, totally 2

### ways to say no
- Parent: family and friends (or media and communication). Kind: category. Rating: 2. englishOnly; pairs with ways to say yes.
- no 1, nope 1, nah 1, never 1, no way 1, not at all 2, negative 2, no thanks 1, certainly not 2, absolutely not 2, by no means 3, uh-uh 2, not likely 3, no chance 2, out of the question 3, nay 3
