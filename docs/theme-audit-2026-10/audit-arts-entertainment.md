# Audit: Arts & Entertainment

Ratings note: this domain is heavy with people-name themes (composers, singers, writers, painters, stars) and region-specific instrument/dance themes, so the spread leans to 3-4 (1: 13, 2: 47, 3: 59, 4: 40, 5: 16).

## Redundant

- `circus` and `circus_acts`: near-identical pools (clown, acrobat, tightrope, juggler, lion tamer). Merge `circus_acts` into `circus`.
- `dance_music` duplicates `dances` / `ballroom_dances` (swing, tango, salsa, waltz, polka, samba, cha-cha). Delete `dance_music`, or narrow it to club genres (disco, house, EDM), which then overlaps `electronic_music_styles`; deleting is cleaner.
- `latin_music_styles` vs `latin_dances`: same core (tango, salsa, samba, mambo, cha-cha, rumba). Keep `latin_dances`; trim `latin_music_styles` to non-dance styles (bossa nova, mariachi, reggaeton, cumbia...) or delete it.
- `african_drums` is almost a subset of `african_instruments` (djembe, talking drum, ashiko...). Merge into `african_instruments`.
- `turkish_instruments` vs `middle_eastern_instruments`: oud, ney, qanun, darbuka in both. Merge Turkish into Middle Eastern (or make it a child of it). `arabic_music_words` repeats the same instruments too; strip them from it.
- `african_music_styles` vs `african_dances`: amapiano, kizomba, soukous in both. Keep the words in one only.
- `shakespeare_plays` vs `shakespeare_characters`: title characters (Hamlet, Macbeth, Julius Caesar, Othello, King Lear) in both, so either can never appear with the other. Drop eponymous characters from `shakespeare_characters`.
- `fairy_tales` vs `fairy_tale_characters`: Cinderella, Snow White, Sleeping Beauty, Rapunzel are both. Keep titles in `fairy_tales` that are not character names (Three Little Pigs, Beauty and the Beast...) or merge.
- Cross-domain duplicates: `movie_theater_words` vs Places > places to visit > movie theater; `art_gallery_words` vs Places > places to visit > art gallery; `magic_show_words` vs Sports & Games > hobbies and crafts > magic tricks; `theater_jobs` overlaps People > jobs > arts jobs; `party_entertainment` overlaps Sports & Games > toys and play > party games; `window_styles` overlaps Home > house and building > windows and doors. Keep one of each pair (suggest: the Places ones for venues, this domain for magic and theater jobs).
- `theme_park_words` vs `fairground_rides`: share coaster, carousel, roller coaster, Ferris wheel. Close siblings by design, but strip the rides from `theme_park_words`.

## Silly or unfit

- `nightclub_words`: bar, shot, bouncer, VIP; nightlife and alcohol, not a family theme. Delete (or flag sensitive and keep very late).
- `music_styles` (parent own words): soundtrack, instrumental, background music, a cappella; a catch-all with no single idea.
- `shows_and_fun` (parent own words): festival, zoo, firework, parade, cinema; catch-all.
- `concert_words`: security, seat, fan, crowd, tour; vague, overlaps `theater_words` and `music_words`.
- `music_terms`: 165 words incl. flat, sharp, score, movement, scale; huge catch-all of everyday-English homonyms.
- `film_and_tv` (parent own words): BBC, Netflix, HBO, CNN, fox, Disney; trademark names only.
- `theater` (parent own words): mostly playwrights, which the name does not say. Move them to a new `playwrights` child (see Missing themes).
- `street_dance_styles`: contains "twerking"; remove the word.
- `music_festivals`: almost all trademark festival names plus Burning Man; weak as a theme.

## Misplaced

- `african_drums` sits under percussion instruments while the other regional instruments are under folk instruments; merge as above.
- `brazilian_carnival_words` belongs with Home & Everyday > holidays and celebrations > festivals of the world.
- `asian_dances` includes kabuki (theater; already in `asian_theater_forms`).
- `notes_and_rests` includes "sol" (solfège syllable, not a note value).
- `jazz_words` includes saxophone, solo (instrument / general music words).
- `film_festivals` uses city names (Venice, Toronto, Cannes) which clash with place themes; better as late-only or removed.

## Too thin

- `andean_instruments`: 26 words inflated by synonyms (pan flute = panpipes = siku = zampoña = antara).
- `column_styles`: really five classical orders; pedestal, pilaster are not styles.
- `polynesian_dances`: 24 words with near-duplicates (haka / kapa haka, Tahitian dance / ori Tahiti).
- `african_drums`: 28 words, mostly obscure.
- `dynamics_markings`: about 8 distinct markings; the rest are spelling variants.
- `film_festivals`: 28, mostly city names and acronyms (SXSW, TIFF).

## Flags

### sensitive
- `church_parts`, `mosque_parts`, `asian_temple_features`, `islamic_art_words` (religion)
- `middle_eastern_dances` (whirling dervish, Sufi whirling, sema are religious practice)
- `nightclub_words` (alcohol), if kept

### englishOnly
- `comic_book_words` (pow, boom, English onomatopoeia)
- `hip_hop_words`, `jazz_words` (slang: flow, bars, gig, groove, riff)
- `poetry_terms` (rhyme schemes, meter, couplet tied to English verse)
- `notes_and_rests`: American names (half note, quarter note); British uses minim, crotchet, quaver, so the UK spelling field cannot fix it. Needs UK forms or englishOnly plus a US/UK caveat.

## Missing themes

### instrument players
Parent: Arts & Entertainment > musicians. Kind: category. Rating 1.
pianist 1, guitarist 1, drummer 1, violinist 1, cellist 2, flutist (flautist) 2, trumpeter 1, harpist 2, organist 2, saxophonist 2, bassist 2, clarinetist (clarinettist) 2, trombonist 3, percussionist 3, oboist 4, keyboardist 3, fiddler 2, accordionist 3, banjoist 4, violist 4

### classroom instruments
Parent: Arts & Entertainment > instruments. Kind: category. Rating 2.
recorder 1, xylophone 1, tambourine 1, triangle 1, maracas 1, kazoo 2, glockenspiel 3, castanets 2, harmonica 2, woodblock 3, rainstick 3, egg shaker 3, cowbell 2, claves 4, slide whistle 3, hand bells 2, bongos 2, boomwhacker 4

### music players
Parent: Arts & Entertainment > music words. Kind: category. Rating 2.
record player 1, jukebox 1, cassette 1, CD 1, radio 1, gramophone 2, turntable 2, boombox 2, phonograph 3, vinyl 2, music box 1, headphones 1, speaker 1, MP3 player 2, stereo 2, eight-track 4, reel-to-reel 4, earbuds 1

### guitar parts
Parent: Arts & Entertainment > instruments > instrument parts (make it a group). Kind: category. Rating 3.
neck 2, fret 2, fretboard 2, headstock 3, tuning peg 2, soundhole 2, bridge 2, pickup 3, strings 1, pick 1, capo 3, nut 4, saddle 4, strap 2, body 2, whammy bar 4

### piano parts
Parent: Arts & Entertainment > instruments > instrument parts. Kind: category. Rating 3.
key 1, pedal 1, hammer 2, lid 2, keyboard 1, soundboard 4, damper 3, piano bench 2, music stand 2, black keys 1, white keys 1, middle C 2, felt 4, sustain pedal 3

### famous musicals
Parent: Arts & Entertainment > theater > musicals words. Kind: category. Rating 3.
Cats 2, Annie 2, Grease 1, Wicked 2, Hamilton 2, Les Misérables 2, Oliver 2, Evita 3, Chicago 3, Hairspray 3, Matilda 2, Mamma Mia 1, Oklahoma 3, Cabaret 3, The Sound of Music 1, West Side Story 2, Phantom of the Opera 2, The Lion King 1, Mary Poppins 1, Rent 4, Miss Saigon 4

### playwrights
Parent: Arts & Entertainment > theater (move the parent's own playwright words here). Kind: category. Rating 4.
Shakespeare 1, Chekhov 3, Oscar Wilde 2, Arthur Miller 3, Tennessee Williams 3, Ibsen 3, Molière 3, Samuel Beckett 4, George Bernard Shaw 3, Sophocles 3, Euripides 4, Harold Pinter 4, Eugene O'Neill 4, Noël Coward 4, Christopher Marlowe 4, Brecht 4

### camera shots
Parent: Arts & Entertainment > film and tv. Kind: category. Rating 3.
close-up 1, wide shot 2, zoom 1, pan 2, tilt 3, slow motion 1, flashback 2, montage 2, fade 2, freeze frame 2, jump cut 3, tracking shot 3, aerial shot 2, long shot 2, crane shot 4, dolly zoom 4, split screen 2, time-lapse 2

### story roles
Parent: Arts & Entertainment > literature. Kind: category. Rating 3.
hero 1, villain 1, sidekick 1, narrator 2, mentor 2, protagonist 3, antagonist 3, heroine 1, love interest 2, rival 2, henchman 2, comic relief 3, underdog 2, anti-hero 3, damsel 3, trickster 3

### book formats
Parent: Arts & Entertainment > literature. Kind: category. Rating 2.
paperback 1, hardcover (hardback) 1, ebook 1, audiobook 1, picture book 1, pop-up book 1, graphic novel 2, comic 1, magazine 1, anthology 3, pamphlet 2, booklet 2, scroll 2, board book 3, chapbook 4, large print 3, box set 2

### fictional detectives
Parent: Arts & Entertainment > literature. Kind: category. Rating 3.
Sherlock Holmes 1, Hercule Poirot 2, Miss Marple 2, Nancy Drew 3, Inspector Clouseau 3, Columbo 3, Dick Tracy 4, Father Brown 4, Inspector Morse 4, Philip Marlowe 4, Sam Spade 4, Encyclopedia Brown 4, Inspector Gadget 2, Scooby-Doo 2, Dr. Watson 2, Hardy Boys 3

### fairy tale villains
Parent: Arts & Entertainment > literature (new group "fairy tales" with `fairy_tales`, `fairy_tale_characters`, this and the next). Kind: category. Rating 2.
big bad wolf 1, wicked witch 1, evil queen 1, stepmother 1, giant 1, troll 1, ogre 2, Rumpelstiltskin 2, Captain Hook 1, sea witch 2, evil fairy 2, stepsisters 2, Maleficent 2, Ursula 3, Jafar 3, Baba Yaga 4

### fairy tale objects
Parent: as above. Kind: category. Rating 2.
glass slipper 1, poisoned apple 1, magic mirror 1, beanstalk 1, spinning wheel 2, pumpkin coach 1, gingerbread house 1, magic lamp 1, golden egg 2, magic beans 1, red hood 2, pea 3, flying carpet 1, glass coffin 3, golden goose 2, seven-league boots 4, magic harp 3

### children's book characters
Parent: Arts & Entertainment > literature. Kind: category. Rating 2.
Paddington 1, Winnie-the-Pooh 1, Peter Rabbit 1, Gruffalo 2, Matilda 2, Pippi Longstocking 2, Heidi 2, Alice 1, Mary Poppins 1, Peter Pan 1, Tigger 1, Eeyore 2, Charlie Bucket 3, Willy Wonka 1, Very Hungry Caterpillar 2, Cat in the Hat 1, Babar 3, Madeline 3, Curious George 2, Tintin 2

### superheroes
Parent: Arts & Entertainment > literature > comic book words (make a family group "superheroes" with the next two). Kind: category. Rating 1. (Trademark names, but a real theme.)
Superman 1, Batman 1, Spider-Man 1, Wonder Woman 1, Iron Man 1, Captain America 1, Hulk 1, Thor 2, Black Panther 2, Aquaman 2, Flash 2, Wolverine 2, Black Widow 2, Green Lantern 3, Supergirl 2, Robin 2, Hawkeye 3, Ant-Man 3

### superpowers
Parent: as above. Kind: category. Rating 2.
flight 1, invisibility 1, super strength 1, telepathy 2, x-ray vision 1, teleportation 2, super speed 1, shapeshifting 2, mind reading 1, time travel 2, force field 2, laser eyes 2, healing 2, super hearing 2, telekinesis 3, night vision 2, wall crawling 3

### supervillains
Parent: as above. Kind: category. Rating 3.
Joker 1, Lex Luthor 2, Thanos 2, Magneto 2, Green Goblin 2, Penguin 2, Riddler 2, Doctor Octopus 2, Loki 2, Venom 3, Catwoman 3, Two-Face 3, Doctor Doom 3, Ultron 3, Mystique 3, Bane 3

### dress-up costumes
Parent: Arts & Entertainment > theater (or Home & Everyday > holidays and celebrations). Kind: category. Rating 1.
pirate 1, princess 1, superhero 1, cowboy 1, astronaut 1, fairy 1, witch 1, ninja 1, knight 1, clown 1, vampire 1, dinosaur 1, firefighter 2, mermaid 1, robot 2, ghost 1, wizard 1, cat 2, unicorn 2, zombie 2

### famous sculptors
Parent: Arts & Entertainment > art > sculpture words. Kind: category. Rating 4.
Michelangelo 1, Rodin 2, Donatello 2, Bernini 3, Henry Moore 3, Brancusi 4, Giacometti 4, Barbara Hepworth 4, Louise Bourgeois 4, Canova 4, Anish Kapoor 4, Antony Gormley 4, Alexander Calder 3, Jeff Koons 4, Bartholdi 4, Praxiteles 5
