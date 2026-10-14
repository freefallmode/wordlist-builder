# Audit: Language & Wordplay

171 playable themes rated. Spread: 1 = 18, 2 = 34, 3 = 59, 4 = 45, 5 = 15. That leans harder than the brief's target, on purpose: word origins, hidden words and grammar function words are hard to spot by nature. The easy end is the compound and rhyme themes, greetings, girls' and boys' names, and text speak.

## Redundant

- `hindi_everyday_words` vs `words_from_hindi`: in practice both mean "Hindi words English uses" (yoga, karma, chai, bazaar vs shampoo, jungle, pajamas, bungalow). Keep `hindi_everyday_words` (easier, better words), merge `words_from_hindi` into it, or keep only one per level.
- `hello_around_the_world` duplicates **People & Society > family and friends > greetings > greetings around the world**. Keep one (this one is richer, 101 words) and delete the other.
- `text_speak` duplicates **People & Society > media and communication > texting abbreviations**. Keep `text_speak`, delete the other.
- `goodbye_around_the_world` overlaps **People & Society > family and friends > ways to say goodbye** (check the pools). `goodbye_around_the_world` also shares aloha, ciao and shalom with `hello_around_the_world`. These are fine as close siblings but must never share a level.
- `latin_phrases` overlaps **People & Society > law and order > legal latin** (bona fide, per se, ad hoc). Close but distinct; check that no level puts both on screen.
- `cowboy_slang` overlaps **People & Society > jobs > cowboy words** (lasso, corral, bronco, posse). Decide which owns the tools and places. Ideally slang keeps howdy, yeehaw, varmint, buckaroo and the job theme keeps the rest.
- `words_named_after_places` overlaps **Places & Geography > place names > foods named after places** (champagne, bourbon, tequila). `words_named_after_people` overlaps **Food & Drink > food properties > foods named after people** (sandwich).
- `poetry_forms` overlaps **Arts & Entertainment > literature > poetry terms**. Merge into literature (see Misplaced).
- `silent_letter_words` (parent, 178 own words: would, could, high, night, talk) is a catch-all that holds almost every English word with a "gh" or "l". Make it a group and keep only the k, b and w children (plus the proposed silent g).
- `hidden_animals` (1,773 own words) is a near-superset of its children `hidden_birds` and `hidden_insects`, and any word containing "ant", "cat", "rat" or "hen" qualifies. Make it a group, or restrict it to words where the animal is at least 3 letters and clearly visible.

## Silly or unfit

- `homophones` (618 words: you, for, not, one, which): almost every short word has a homophone, and four on screen show nothing. Delete it, or keep it only through the sounds-like children.
- `letters_in_alphabetical_order` (now, how, first, most) and `reversible_words` (was, but, time, keep): impossible for a player to see as a group. Their typical words are everyday function words. Keep them only as late "expert" themes, or delete them.
- `hidden_names` (time = Tim, market = Mark, danger = Dan): nearly every word hides a name. Delete it.
- `hidden_birds` (when, then = hen; crowd = crow) and `hidden_insects` (want, important = ant; been = bee): the hidden piece is two or three letters inside a common word, so these are unfit. Keep them only with curated, visible examples (sparrowhawk-style long hits).
- Data issue in hidden themes: typical lists include words where nothing is hidden, the word simply is the thing: `hidden_colors` green, `hidden_trees` palm, ash, pine, `hidden_animals` snake, `hidden_body_parts` hand. The checker should require the hidden word to be a strict substring.
- Data issue in the compound themes: some own-word lists hold the whole compound or the base word: `fly` dragonfly, `berry` strawberry and mulberry, `box` box, `foot` footstool and foot, `hand` handbag, `water` watermelon. These break the puzzle. Remove them.
- `silly_sounding_words` (property): a matter of taste, and four of them read as "funny words" at best. Keep it as a late theme, or rename it "fun-sounding words".
- `sounds_like_a_number`: nein, naught and tutu are dubious, which leaves about 4 good words. Delete it, or add only for, too, won, ate, fore, tree (three, accent-dependent, so leave it out).
- `cockney_rhyming_slang`: cryptic to everyone outside London. "berk" comes from a vulgar rhyme, so ban it.
- `1920s_slang`: ban "Sugar Daddy". hooch and speakeasy are about alcohol (see Flags).
- `acronyms`: "AIDS" is a typical word, so ban it for the family audience.
- `brand_names_used_as_words`: mostly trademarks (Google, Ziploc bag, Uber, Photoshop). Restrict it to genericised ones (zipper, aspirin, trampoline, escalator, thermos, frisbee) or flag it for trademarks.
- `flowers_named_after_people` (magnolia, dahlia): on screen it is simply "flowers"; no player can tell the people link. Fine as a sub-pool, unfit as its own theme next to other flowers.
- `grammar_terms` (sentence, tense, singular, past, future): a catch-all that overlaps `tenses`, `parts_of_speech` and `sentence_parts`. Keep it only as a pool parent.

## Misplaced

- `poetry_forms` and `figures_of_speech` sit under `grammar`. They are literature and writing, not grammar: move them to **Arts & Entertainment > literature** (beside poetry terms), or to `alphabets_and_writing`.
- `codes_and_signals` sits under `languages`. It belongs under `alphabets_and_writing` (beside writing_systems and braille).
- `british_english_words` (football, lift, flat, autumn) and `scottish_words` (glen, loch, kilt, haggis) are vocabulary, not slang. Move them to a new branch `varieties of english` (with american english words, australian words and so on), or rename the parent "slang, sayings and dialects".
- `hidden_animals` and `silent_letter_words` are playable parents whose own pools are catch-alls. Make them groups (see Redundant).
- `words_from_nahuatl` is an indigenous language of the Americas and could be a child of `words_from_native_american_languages`. Optional, because the region tags already separate them.
- `spanish_numbers` should join a new group "numbers in other languages", the same pattern as **Qualities > colors > colors in other languages** (see Missing themes).
- `names_around_the_world` and `surnames` are groups with playable children; that is fine.

## Too thin

- `names_that_are_months` (9 words; really only May, April, June, August, January, Julia, July, March).
- `sounds_like_a_number` (9 words, 3 of them dubious).
- `names_that_are_trees` (16), `names_that_are_gems` (20), `names_that_are_virtues` (24): workable, but every one is only just at 8 good words after the checker's clashes (the words also belong to trees, gems or virtues themes on the same screen).
- `parts_of_speech` (19 own words, but only about 9 real parts of speech; the rest will be variants).
- `words_made_of_roman_numerals` (21; mix, mid, civic, ill and mill are good, but many are obscure).
- `sounds_like_a_letter` (24; okay, but the words are mostly function words).
- `words_from_persian` (38) and `words_from_nahuatl` (38): enough words, but many are dubious as "obvious" members.

## Flags

### sensitive

- `1920s_slang` (alcohol: hooch, speakeasy; Sugar Daddy).
- `british_slang` (bloody, bum; mild swearing).
- `polite_swears` (the theme is about swearing, even though the words are clean).
- `old_fashioned_insults` (insults; mild).
- `words_from_afrikaans` (apartheid, commando, Boer).
- `words_from_yiddish` (yarmulke, kosher; religion).
- `hindi_everyday_words` (karma, dharma, mantra, guru; religion).
- `biblical_names` (religion; mild).
- `latin_phrases` and `french_phrases_in_english`: only at word level (coup d'état, per se is fine). Ban or flag individual words rather than the theme.
- Word level, not theme level: `acronyms` AIDS, `words_from_italian` mafia, `words_from_arabic` alcohol, `portmanteau_words` Brexit, `gen_z_slang` (check the full list for thirsty, simp or sus-type words).

### englishOnly (beyond the wordplay-kind themes, which already are)

- **Slang and sayings, all 15:** `text_speak`, `gen_z_slang`, `1920s_slang`, `british_slang`, `british_english_words`, `scottish_words`, `cockney_rhyming_slang`, `australian_slang`, `canadian_slang`, `cowboy_slang`, `baby_talk`, `old_fashioned_insults`, `polite_swears`, `words_meaning_nonsense`, `silly_sounding_words`.
- **Grammar that is about English itself:** `pronouns`, `prepositions`, `conjunctions`, `interjections`, `irregular_past_tenses`, `irregular_plurals`, `tenses`, `grammar_terms`, `sentence_parts`. `parts_of_speech`, `figures_of_speech` and `poetry_forms` translate, so they are not flagged.
- **Word origins, all children:** each is "English words borrowed from X", which is meaningless in a translated edition (French words in the French edition): `words_from_french`, `words_from_spanish`, `words_from_italian`, `words_from_german`, `words_from_dutch`, `words_from_yiddish`, `words_from_arabic`, `words_from_persian`, `words_from_turkish`, `words_from_hindi`, `words_from_japanese`, `words_from_chinese`, `words_from_afrikaans`, `words_from_native_american_languages`, `words_from_nahuatl`, `words_from_south_american_languages`, `words_from_mythology`, `words_named_after_people`, `flowers_named_after_people`, `words_named_after_places`, `brand_names_used_as_words`.
- **Foreign words used in English:** `french_phrases_in_english`, `latin_phrases`. (Hello, thank you and goodbye around the world, and Spanish numbers, translate, except in the matching language's edition.)
- **Names that depend on English words or English naming:** `names_that_are_flowers`, `names_that_are_gems`, `names_that_are_months`, `names_that_are_places`, `names_that_are_virtues`, `names_that_are_colors`, `names_that_are_trees`, `surnames_that_are_jobs`, `short_forms_of_names`, `unisex_names`, `old_fashioned_names`.
- **Writing:** `typography_words` (uppercase, lowercase, bold) is borderline; `handwriting_words` and `punctuation` translate fine.

## Missing themes

Note: wordplay themes (compounds, rhymes, silent letters) cannot be translated and need a checker rule or a curated list. The checker tests only `___ball` and `fire___` compounds by rule, so new compounds rely on their lists. Themes 9 to 16 below translate.

### silent g words
Parent: letter play > silent letter words · wordplay · rating 3 · gives the silent-letter parent a fourth child, so it can be a family.
gnome 1, sign 1, design 1, gnat 2, gnaw 2, foreign 2, reign 2, champagne 2, campaign 2, align 2, resign 2, assign 2, gnash 3, gnu 3, gnarled 3, cologne 3, benign 3, feign 3, malign 4, poignant 4

### ___time
Parent: words before · wordplay · rating 1
bed 1, lunch 1, play 1, bath 1, dinner 1, summer 1, day 1, night 1, half 2, over 2, story 2, winter 2, spring 2, show 2, life 2, part 2, full 2, tea 2, nap 2, meal 2, snack 2, any 2, some 2, past 2

### ___room
Parent: words before · wordplay · rating 2
bed 1, bath 1, class 1, mush 2, ball 2, show 2, store 2, rest 2, play 2, board 2, sun 2, chat 2, news 2, court 2, leg 2, staff 3, cloak 3, dark 3, head 3, stock 3, wash 3

### home___
Parent: words after · wordplay · rating 2
work 1, made 1, sick 2, town 2, land 2, page 2, school 2, coming 2, grown 2, owner 2, room 3, stead 3, body 3, ward 3, maker 3

### key___
Parent: words after · wordplay · rating 2
board 1, hole 1, chain 1, pad 2, word 2, ring 2, card 2, note 3, stone 3, stroke 3

### air___
Parent: words after · wordplay · rating 2
plane 1, port 1, line 2, bag 2, craft 2, mail 2, ship 2, tight 2, bed 2, show 3, way 3, lift 3, strip 3, field 3

### rhymes with cat
Parent: sound-alikes · wordplay · rating 1 · a good opener: every word shares the "-at" ending, so the checker's ending rule works.
hat 1, bat 1, mat 1, rat 1, sat 1, pat 1, that 1, flat 2, chat 2, splat 2, brat 2, spat 2, doormat 2, gnat 3, acrobat 3, format 3, habitat 3, diplomat 3, thermostat 3, combat 3

### old-fashioned english words
Parent: slang and sayings · category · rating 3 · englishOnly
thou 1, thee 1, thy 2, hath 2, doth 2, alas 1, wherefore 3, forsooth 3, prithee 3, anon 3, ere 3, hither 3, thither 3, whence 3, methinks 2, verily 3, 'tis 2, ye 1, oft 3, betwixt 3

### constructed languages
Parent: languages · category · rating 3 · translatable
Esperanto 2, Klingon 2, Elvish 2, Dothraki 3, Na'vi 3, Simlish 3, Pig Latin 3, Newspeak 4, Sindarin 4, Quenya 4, Toki Pona 4, Volapük 5, Interlingua 5, Ido 5, Lojban 5

### numbers in other languages (new group, family of 4 with spanish numbers moved in)
Parent: foreign words · category · translatable. Children below, plus the existing `spanish_numbers`. Never put spanish and italian on one level (uno, mille).

#### numbers in french · rating 2
un 1, deux 1, trois 1, quatre 2, cinq 2, sept 2, huit 2, neuf 2, dix 2, onze 3, douze 3, vingt 3, cent 3, mille 3

#### numbers in german · rating 2
eins 1, zwei 1, drei 1, vier 2, fünf 2, sechs 2, sieben 2, acht 2, neun 2, zehn 2, zwölf 3, zwanzig 3, hundert 3, tausend 3

#### numbers in italian · rating 3
due 2, tre 2, quattro 2, cinque 2, sei 2, sette 2, otto 2, nove 2, dieci 2, venti 3, cento 3

#### numbers in japanese · rating 3
ichi 2, san 2, yon 3, roku 3, nana 3, hachi 3, kyu 3, ju 3, hyaku 4, sen 4

### names for grandparents
Parent: People & Society > family and friends · category · rating 1 · translatable (a deliberate mix of languages)
grandma 1, grandpa 1, granny 1, nana 1, grandad (granddad) 1, gran 2, nan 2, gramps 2, papa 2, oma 2, opa 2, abuela 2, abuelo 2, nonna 2, nonno 2, meemaw 3, pawpaw 3, mimi 3, yaya 3, bubbe 3, lola 3, babcia 4

### words for toilet
Parent: slang and sayings · category · rating 2 · englishOnly words, but the idea translates
toilet 1, bathroom 1, restroom 1, potty 1, loo 2, lavatory 2, washroom 2, outhouse 2, ladies 2, gents 2, WC 3, latrine 3, powder room 3, john 3, privy 4

### ways of laughing
Parent: Body & Health > body movement (beside ways of speaking) · category · rating 2 · translatable concept
giggle 1, chuckle 1, snicker 2, snigger 2, cackle 2, hoot 2, howl 2, roar 2, snort 2, belly laugh 2, crack up 2, guffaw 3, chortle 3, titter 3

### things you read
Parent: alphabets and writing · category · rating 2 · translatable
book 1, newspaper 1, magazine 1, comic 1, menu 1, letter 1, novel 1, dictionary 1, sign 1, map 2, label 2, recipe 2, poster 2, diary 2, catalog (catalogue) 2, manual 2, postcard 2, atlas 2, encyclopedia (encyclopaedia) 2, brochure 3, leaflet 3

### writing tools
Parent: alphabets and writing · category · rating 1 · translatable (the parent's own words today: pen, ink, pencil, chalk; this makes them a crisp child; check it against People & Society > school > stationery, and drop it if stationery already covers these)
pen 1, pencil 1, crayon 1, marker 1, chalk 1, highlighter 2, quill 2, fountain pen 2, ballpoint 2, felt-tip 2, typewriter 2, stylus 3, charcoal 3, nib 3, inkwell 3
