# Audit: Food & Drink

181 playable themes rated (1: 17%, 2: 28%, 3: 30%, 4: 17%, 5: 8%).

## Redundant

- `milk_products` vs `dairy_and_eggs`: the typical words are almost the same (milk, cream, cheese, butter, yogurt). Delete `milk_products` or merge it into `dairy_and_eggs`.
- `baking_words` (under cooking) vs the own words of `breads_and_baking` (baker, oven, dough, bake, flour): the same pool. Merge `baking_words` into `breads_and_baking`.
- `kitchen_utensils` vs `table_setting`: both lead with bowl, knife, fork, spoon. Keep both, but trim `kitchen_utensils` to preparation tools (whisk, ladle, spatula, grater, peeler) so they become distinct siblings.
- `turkish_drinks` vs `hot_drinks` / `teas`: its typical words are just coffee and tea variants (Turkish coffee, Turkish tea, black tea, tea glass). Merge it into `turkish_food`.
- `cured_meats` vs `sausages`: heavy overlap (pepperoni, salami, chorizo). They are close siblings, but the checker will often fail to place both; consider moving the dry sausages to only one of them.
- Across domains (check): `soft_drinks` vs Qualities > tastes > food textures > fizzy drinks; `restaurant_words` vs Places > everyday places > restaurant; `breads_and_baking` vs Places > everyday places > bakery; `candy` vs Qualities > tastes by region > american candy; `foods_named_after_people` (here) vs Places > place names > foods named after places (fine as a pair, but they should sit under one parent).

## Silly or unfit

- Catch-all themes where four words rarely point to one idea, as played themes: `cuisines`, `dishes`, `cooking`, `herbs_spices_and_sauces`, `in_the_pantry`, `diner`, `european_food`, `expedition_rations` (chocolate, oatmeal, jerky: could be any snack theme). Keep them as browsing parents; do not play them, or play only late.
- Bare adjective words that mean nothing on a balloon: `types_of_milk` (whole, cow, goat, oats), `flours` (bread, plain, white, brown), `chocolates` (white, dark, milk), `pizza_styles` (New York, Chicago, cheese). Either use the full form or keep these themes out of play.
- Unfit words: `poultry` has "cock" (ban; rooster exists), `andean_crops` has "coca" (ban), `ways_to_cut_food` has "die" (ban; dice).
- Trademark-heavy: `beers` (Guinness, Corona, Heineken), `fast_food` (McDonald's, Burger King, Subway), `chocolates` (Hershey's, Snickers), `liqueurs` (Baileys, Malibu, Fireball), `breakfast_cereals` (Cheerios, Lucky Charms). Make sure the generic words dominate what is picked.
- `seafood_dishes` lists plain ingredients (shrimp, scallop) as dishes; tidy it.

## Misplaced

- `cuisines` is playable with one own word (Tex-Mex); it should be a group. Move Tex-Mex to `mexican_food` or `north_american_food`.
- `oceanian_food`'s own words are all New Zealand foods (pavlova, hokey pokey, kumara, hangi, paua, cheese roll): make a child "new zealand food" and turn `oceanian_food` into a group.
- `sushi_types` sits under `asian_food`; it belongs under `japanese_food`.
- `andean_crops` (quinoa, peanut, coca, corn) are not vegetables: move it under `south_american_food`.
- `expedition_rations` is not a cuisine: move it under `cooking` or Travel & Transport > campsite.
- `nuts` under `fruits` is botanically defensible but not how players think: move it to a new top-level "nuts and seeds" branch (see Missing themes).
- `milk_products` as a child of `dairy_and_eggs` repeats its parent (see Redundant).

## Too thin

- `turkish_drinks`: few distinct words beyond tea and coffee variants.
- `blue_cheeses` (26 words): beyond Stilton, gorgonzola, Roquefort and Danish blue the words are rare (Maytag, Cabrales, Cambozola).
- `salad_dressings` (27): many are duplicate forms (ranch / ranch dressing, Caesar / Caesar dressing).
- `south_american_drinks` (23): mate, yerba mate and tereré are one drink; gourd is a vessel.
- `kebab_types` (33): most words contain "kebab" or are forms of one another (shish / shish kebab, döner / döner kebab); fewer than 8 distinct usable words after the forms rule.
- `cuisines` (1 own word), `oceanian_food` (19 obscure own words), `turkish_breakfast` (34, mostly Turkish words).

## Flags

### sensitive

- Alcohol: `cocktails`, `wines`, `red_wines`, `white_wines`, `wine_words`, `beers`, `spirits`, `liqueurs`, `national_spirits`, `turkish_drinks` (raki).
- Alcohol-heavy cuisines (check word level instead if the flag is per theme): `brazilian_food` (cachaça, caipirinha), `peruvian_food` (pisco, pisco sour), `argentinian_food` (Fernet).
- `andean_crops` (coca), `game_meats` (hunting; mild, optional).

### englishOnly

- `puddings` (pudding means dessert in UK, custard-like dish in US).
- `meals_of_the_day` (tea, supper, dinner differ by dialect).
- `cookies` (cookie vs biscuit), `flours` (plain vs all-purpose).
- `types_of_milk`, `chocolates`, `pizza_styles` (bare words that only work as English compounds).
- `ways_to_cut_food` (quarter, cube, die as verbs).
- `foods_named_after_people` is wordplay already.

## Missing themes

Proposed new branch "Food & Drink > nuts and seeds" (move `nuts` there) makes a small family with edible seeds.

### edible seeds
- Parent: Food & Drink > nuts and seeds (new; or fruits) · kind: category · rating 2
- sunflower 1, pumpkin 1, sesame 1, poppy 2, chia 2, flax 2, linseed 3, hemp 3, caraway 3, fennel 3, mustard 3, watermelon 3, pomegranate 3, quinoa 3, nigella 4, pepita 4

### pancakes of the world
- Parent: Food & Drink > dishes · kind: category · rating 3
- pancake 1, crepe (crêpe) 1, hotcake 2, blini 3, latke 3, dosa 3, crumpet 3, galette 3, blintz 3, pikelet 4, okonomiyaki 4, injera 4, jeon 4, hoppers 4, drop scone 4, poffertjes 5, cachapa 5, palatschinken 5

### rice varieties
- Parent: Food & Drink > pasta, rice and grains · kind: category · rating 3
- white rice 1, brown rice 1, basmati 2, jasmine 2, wild rice 2, sticky rice 2, sushi rice 2, arborio 3, long-grain 3, short-grain 3, black rice 3, red rice 3, risotto rice 3, glutinous 4, parboiled 4, carnaroli 5, bomba 5, calrose 5

### burger toppings
- Parent: Food & Drink > dishes (sibling of pizza toppings) · kind: category · rating 2
- lettuce 1, tomato 1, pickle 1, onion 1, cheese 1, bacon 1, ketchup 1, mustard 1, mayo 1, avocado 2, jalapeño 2, relish 2, mushroom 2, gherkin 2, onion ring 2, barbecue sauce 2, coleslaw 3, fried egg 3, pineapple 3, special sauce 3, arugula (rocket) 3, beetroot 4

### recipe amounts
- Parent: Food & Drink > cooking · kind: category · rating 2
- pinch 1, handful 1, slice 1, scoop 1, cup 1, teaspoon 1, tablespoon 1, dash 2, dollop 2, splash 2, sprinkle 2, drizzle 2, clove 2, wedge 2, heap 2, squeeze 2, knob 3, sprig 3, stick 3, smidgen 3, pat 3

### ways to mix
- Parent: Food & Drink > cooking (sibling of cooking methods, ways to cut food) · kind: category · rating 2
- stir 1, whisk 1, beat 1, blend 1, mix 1, whip 1, shake 1, mash 1, fold 2, knead 2, toss 2, swirl 2, combine 2, puree (purée) 2, cream 3, churn 3, pulse 3, emulsify 4, muddle 4

### parts of a fruit
- Parent: Food & Drink > fruits · kind: category · rating 2
- peel 1, pit 1, core 1, seed 1, stem 1, skin 1, rind 2, stone 2, pip 2, stalk 2, flesh 2, zest 2, segment 2, pith 3, husk 3, kernel 3, calyx 5

### cake decorations
- Parent: Food & Drink > breads and baking · kind: category · rating 2
- frosting (icing) 1, sprinkles 1, candle 1, buttercream 2, glaze 2, cherry 2, fondant 3, marzipan 3, ganache 3, piping 3, topper 3, royal icing 3, chocolate shavings 3, edible glitter 3, sugar flowers 3, nonpareils 4, rosette 4, hundreds and thousands 4

### foods with holes
- Parent: Food & Drink > food properties · kind: property · rating 3
- doughnut (donut) 1, bagel 1, Swiss cheese 1, crumpet 2, pretzel 2, macaroni 2, waffle 2, onion ring 2, Cheerios 2, Emmental 3, pineapple ring 3, penne 3, rigatoni 3, English muffin 3, Life Savers 3, ziti 4, Jarlsberg 4

### foods you peel
- Parent: Food & Drink > food properties · kind: property · rating 3
- banana 1, orange 1, tangerine 1, clementine 1, potato 1, onion 1, mango 2, kiwi 2, avocado 2, boiled egg 2, garlic 2, carrot 2, lychee 2, pineapple 2, grapefruit 2, shrimp (prawn) 3, pomegranate 3, cucumber 3, ginger 3, papaya 3, parsnip 3

### canned foods (tinned foods)
- Parent: Food & Drink > food properties · kind: property · rating 2
- baked beans 1, tuna 1, soup 1, tomatoes 1, sardines 1, sweet corn 2, peas 2, peaches 2, pineapple 2, Spam 2, chickpeas 2, kidney beans 2, corned beef 2, anchovies 2, fruit cocktail 2, coconut milk 2, condensed milk 3, olives 3, mandarin oranges 3, pumpkin puree 3, ravioli 3, spaghetti hoops 4

### frozen foods
- Parent: Food & Drink > food properties · kind: property · rating 3
- ice cream 1, popsicle (ice lolly) 1, fish sticks (fish fingers) 1, frozen pizza 2, peas 2, fries (chips) 2, chicken nuggets 2, sorbet 2, ice pop 2, hash browns 3, waffles 3, TV dinner 3, mixed berries 3, dumplings 3, edamame 3, veggie burger 3, spinach 4, pierogi 4

### ice cream parlor (parlour)
- Parent: Food & Drink > eating out · kind: place · rating 2
- cone 1, scoop 1, sundae 1, sprinkles 1, waffle cone 1, banana split 1, milkshake 1, wafer 2, sorbet 2, gelato 2, freezer 2, flavor (flavour) 2, hot fudge 2, cherry 2, float 2, spoon 2, tub 2, whipped cream 2, counter 3, napkin 3

### chip flavors (crisp flavours)
- Parent: Food & Drink > dishes > snacks (new child) · kind: category · rating 3
- salt and vinegar 1, barbecue 1, sour cream and onion 1, cheese and onion 2, jalapeño 2, sea salt 2, cheddar 2, ready salted 3, paprika 3, ketchup 3, chili lime 3, dill pickle 3, honey mustard 3, prawn cocktail 4, truffle 4

### soda flavors
- Parent: Food & Drink > drinks > soft drinks (child) · kind: category · rating 3
- cola 1, root beer 1, ginger ale 1, lemon-lime 2, orange 2, cream soda 2, grape 2, cherry 2, ginger beer 2, cherry cola 3, pineapple 3, tonic 3, sarsaparilla 4, bitter lemon 4, birch beer 5, dandelion and burdock 5

### japanese sweets
- Parent: Food & Drink > cuisines > asian food (or under japanese food) · kind: category · region Asia · rating 4
- mochi 2, matcha ice cream 3, dango 3, dorayaki 4, taiyaki 4, daifuku 4, kakigori 4, melon pan 4, purin 4, yokan 5, castella 5, manju 5, monaka 5, warabi mochi 5, imagawayaki 5
