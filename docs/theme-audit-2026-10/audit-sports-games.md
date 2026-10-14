# Audit: Sports & Games

158 playable themes rated. Distribution: 1 = 18, 2 = 49, 3 = 53, 4 = 24, 5 = 14.

## Redundant

- `winter_olympic_events` duplicates `winter_sports` + `snow_sports` (typical words: skiing, downhill, ice hockey, curling, snowboarding, slalom, figure skating, bobsled). Delete it, or merge its words into `winter_sports`.
- `classic_games` is in practice `board_games` plus a few card games (marble, chess, Monopoly, uno, domino, checkers, scrabble, sorry). Merge into `board_games` / `card_games` and delete.
- `olympic_sports` is a catch-all: nearly every sport in `team_ball_sports`, `racket_sports`, `water_sports`, `combat_sports` is an Olympic sport, so it can never be told apart. Delete (or turn into a property theme used only at expert level).
- `famous_races` overlaps `famous_horse_races` (Kentucky Derby, Grand National) and `famous_marathons` (Boston Marathon, London Marathon). Keep `famous_races` for motor and other races (Indy 500, Daytona 500, Le Mans, Dakar, Tour de France) and remove its horse-race and marathon entries.
- `games_of_chance` own words (die, casino, gambling, lottery, gamble) duplicate `casino_words` and `lottery_words`. Make `games_of_chance` a group, or prune its own words.
- `fishing_words` lists its child's core words directly (reel, fishing rod, fishing line). Keep them in `fishing_tackle` only, so the two can be used as close siblings.
- `sporting_events` own words (match, race, tournament, trophy, olympiad) belong in `tournament_words` / `trophies_and_prizes`.

## Silly or unfit

- `sports_verbs` (hit, drive, save, race, pass, catch, block, throw) and `scoring_words` (point, goal, score, draw, strike, tie): generic words that fit dozens of themes; four of them rarely point to one idea. Keep only as expert, or delete `sports_verbs`.
- `esports_words` (team, league, tournament, coach, stream, playoff, roster): indistinguishable from generic sport and `tournament_words`. Delete or rebuild around distinct words (streamer, lag, respawn, clan).
- `olympic_host_cities`, `famous_marathons`, `afl_clubs`: lists of plain city names (London, Paris, Boston, Melbourne, Richmond). No player can see the link; they collide with every city theme. Delete, or keep only for the very end.
- `nhl_teams` (Kings, lightning, Rangers, flame, Devils) and `nba_teams` (heat, spur): singular or generic nicknames; the words read as ordinary nouns. Expert at best; fix the singular forms.
- `middle_eastern_pastimes` contains hookah, shisha, nargile (tobacco smoking): not family-friendly. Remove those words.
- `south_asian_games` contains teen patti (a gambling card game): remove.
- `sumo_words`, `capoeira_words`, `mahjong_words`, `chess_openings`, `cricket_fielding_positions`, `turkish_football_clubs`, `african_soccer_clubs`: so obscure for a worldwide audience that only fans can find the group. Keep only for the hardest levels.
- `sports_gear_and_places` is playable with 0 own words: its pool is the union of equipment, venues, officials, clothing, scoring and verbs, a catch-all. Should be a group (see Misplaced).

## Misplaced

- `sports_gear_and_places` should be `group: true` (0 own words, container only).
- `sporting_events` should be `group: true` (only 5 own words, all better elsewhere).
- `olympic_sports` sits under `athletics_and_gymnastics` but covers all sports; if kept, move it under `sporting_events`.
- Soccer clubs are scattered: `european_soccer_clubs` (under `soccer_terms`, clubs are not terms), `south_american_soccer_clubs`, `african_soccer_clubs`, `turkish_football_clubs` (under `regional_sports`). Gather them under a new parent `ball sports > soccer clubs`; that makes a ready 4-child family.
- Likewise `nba_teams`, `nfl_teams`, `mlb_teams`, `nhl_teams`, `afl_clubs` could form a `sports teams` parent (a family of 5), though all are hard.
- `Travel & Transport > bikes and boards > skateboard tricks` belongs beside `snowboard_tricks`, under `adventure_and_outdoor_sports > extreme sports` (skateboarding is a sport, not transport).
- `athletics_and_gymnastics` is playable but is a mixed bag (athlete, decathlon, podium, acrobatics, calisthenics); better as a group.

## Too thin

- `swimming_strokes`: 16 words but only about 6 real strokes (freestyle, front crawl and crawl are one stroke).
- `field_events`: 21 words, about 9 real events (javelin, discus, shot put, hammer throw, long/high/triple jump, pole vault).
- `racket_sports`: 25 words, about 8 real sports; the rest are equipment (tennis racket, birdie) that belong in `sports_equipment`.
- `dice_games`: many entries are not games (die, dice cup) or not dice games in the usual sense (Boggle); real members are few (Yahtzee, craps, liar's dice, backgammon, Farkle, bunco).
- `sporting_events`: 5 own words.
- `nba_teams`, `mlb_teams`, `nhl_teams`: 30-34 entries but padded with singular/plural duplicates (spur, flame).

## Flags

### sensitive
- Gambling: `games_of_chance`, `casino_games`, `casino_words`, `poker_terms`, `blackjack_terms`, `betting_words`, `lottery_words`.
- Guns and killing animals: `hunting_words`.
- Animal cruelty: `bullfighting_words`.
- Tobacco (until the words are removed): `middle_eastern_pastimes`.

### englishOnly
- `sports_verbs`, `scoring_words`: depend on English words having many sporting meanings (drive, strike, eagle, save).
- `aussie_rules_terms`: Australian English slang (footy, behind, mark).
- `word_games`: crossword, hangman, spelling bee, Wordle are tied to English spelling.

## Missing themes

### american football positions
- Parent: `Sports & Games > ball sports > american football terms`; kind: category; rating 4
- quarterback 1, running back 2, wide receiver 2, tight end 3, linebacker 2, cornerback 3, safety 3, kicker 2, punter 3, center (centre) 3, guard 3, offensive tackle 3, fullback 3, defensive end 3, nose tackle 4, long snapper 4, halfback 3

### baseball positions
- Parent: `Sports & Games > ball sports > baseball terms`; kind: category; rating 3
- pitcher 1, catcher 1, shortstop 2, first baseman 2, second baseman 2, third baseman 2, left fielder 2, center fielder (centre fielder) 2, right fielder 2, designated hitter 3, relief pitcher 3, closer 4, infielder 2, outfielder 2, pinch hitter 3, starting pitcher 3

### golf course features
- Parent: `Sports & Games > racket and target sports > golf terms`; kind: category; rating 2 (close sibling of `golf_shots`)
- tee 1, fairway 1, green 1, bunker 2, sand trap 1, rough 2, hole 1, flag 1, pin 2, cup 2, water hazard 2, clubhouse 2, driving range 2, putting green 1, dogleg 3, fringe 3, apron 4, out of bounds 2

### golf clubs
- Parent: `Sports & Games > racket and target sports > golf terms`; kind: category; rating 3
- putter 1, driver 1, iron 1, wedge 2, wood 2, sand wedge 2, pitching wedge 2, lob wedge 3, gap wedge 4, fairway wood 3, hybrid 3, three-wood 3, five-iron 3, seven-iron 3, nine-iron 3, long iron 4, utility club 4

### famous golfers
- Parent: `Sports & Games > famous athletes`; kind: category; rating 3
- Tiger Woods 1, Jack Nicklaus 2, Arnold Palmer 2, Rory McIlroy 2, Phil Mickelson 2, Gary Player 3, Seve Ballesteros 3, Annika Sorenstam 3, Ben Hogan 3, Tom Watson 3, Scottie Scheffler 3, Nick Faldo 3, Jordan Spieth 3, Ernie Els 3, Lee Trevino 3, Bobby Jones 4

### famous cricketers
- Parent: `Sports & Games > famous athletes`; kind: category; rating 4
- Sachin Tendulkar 1, Don Bradman 2, Virat Kohli 1, Shane Warne 2, Brian Lara 2, Viv Richards 3, Ian Botham 3, Imran Khan 2, Muttiah Muralitharan 3, Jacques Kallis 3, MS Dhoni 2, Ricky Ponting 3, Garfield Sobers 3, Kapil Dev 3, Ben Stokes 3, James Anderson 3

### baseball legends
- Parent: `Sports & Games > famous athletes`; kind: category; rating 4
- Babe Ruth 1, Jackie Robinson 1, Hank Aaron 2, Lou Gehrig 2, Willie Mays 2, Mickey Mantle 2, Joe DiMaggio 2, Ted Williams 3, Derek Jeter 2, Ken Griffey Jr. 3, Roberto Clemente 3, Cy Young 3, Ty Cobb 3, Shohei Ohtani 2, Sandy Koufax 3, Yogi Berra 3

### american football legends
- Parent: `Sports & Games > famous athletes`; kind: category; rating 4
- Tom Brady 1, Joe Montana 2, Peyton Manning 2, Jerry Rice 2, Patrick Mahomes 2, Walter Payton 3, Jim Brown 3, Dan Marino 3, John Elway 3, Emmitt Smith 3, Brett Favre 3, Lawrence Taylor 3, Barry Sanders 3, Aaron Rodgers 2

### famous chess players
- Parent: `Sports & Games > table games > chess terms`; kind: category; rating 4
- Magnus Carlsen 1, Garry Kasparov 1, Bobby Fischer 1, Judit Polgar 3, Anatoly Karpov 2, Hikaru Nakamura 3, Viswanathan Anand 3, Mikhail Tal 4, José Raúl Capablanca 4, Paul Morphy 4, Boris Spassky 3, Fabiano Caruana 4, Ding Liren 4, Gukesh 4

### famous racehorses
- Parent: `Sports & Games > horse and animal sports`; kind: category; rating 4
- Secretariat 2, Seabiscuit 1, Red Rum 2, Frankel 3, Phar Lap 3, Man o' War 3, Black Caviar 4, Winx 4, American Pharoah 3, Arkle 4, Desert Orchid 4, Citation 4, Shergar 3, Seattle Slew 4, War Admiral 4

### video game characters
- Parent: `Sports & Games > video games`; kind: category; rating 2
- Mario 1, Luigi 1, Sonic 1, Pac-Man 1, Pikachu 1, Donkey Kong 1, Link 2, Princess Peach 2, Yoshi 2, Bowser 2, Kirby 2, Lara Croft 2, Master Chief 3, Kratos 3, Crash Bandicoot 2, Spyro 3, Samus 3, Mega Man 2, Tails 3, Wario 3

### sports day events
- Parent: `Sports & Games > toys and play`; kind: category; rating 2
- sack race 1, egg-and-spoon race 1, three-legged race 1, tug-of-war 1, relay race 1, wheelbarrow race 2, obstacle course 2, beanbag race 2, sprint 2, hurdles 2, long jump 2, high jump 2, water balloon toss 2, potato sack race 2, hula hoop contest 3

### cheerleading words
- Parent: `Sports & Games > athletics and gymnastics`; kind: category; rating 3
- pom-pom 1, cheerleader 1, cheer 1, chant 2, megaphone 2, pyramid 2, stunt 2, flyer 3, base 3, spotter 3, basket toss 3, toe touch 3, herkie 4, squad 2, routine 2, tumbling 2, cartwheel 2

### paralympic sports
- Parent: `Sports & Games > athletics and gymnastics`; kind: category; rating 3
- wheelchair basketball 1, wheelchair tennis 1, wheelchair rugby 2, wheelchair racing 2, goalball 3, boccia 3, sitting volleyball 2, para swimming 2, blind football 2, para ice hockey 3, wheelchair fencing 2, wheelchair curling 2, para cycling 2, para archery 2, para athletics 2

### sports with a net
- Parent: `Sports & Games > ball sports`; kind: property; rating 3
- tennis 1, volleyball 1, badminton 1, basketball 1, table tennis 1, netball 2, soccer 2, ice hockey 2, water polo 2, handball 3, lacrosse 3, beach volleyball 1, pickleball 3, sepak takraw 4, field hockey 2

### pinball words
- Parent: `Sports & Games > video games > arcade words`; kind: category; rating 4
- flipper 1, bumper 2, plunger 2, tilt 2, ramp 2, multiball 3, drain 3, slingshot 3, spinner 3, jackpot 3, extra ball 2, rollover 3, kickback 4, high score 2, silver ball 2
