"""Builds data/freq-en.txt from the wordfreq package (pip install wordfreq).

Each line is a Zipf value times 10, a space, then every word with that value,
space-separated. Only single words made of letters are kept, down to Zipf 1.5.
"""
import math, os, re
from wordfreq import get_frequency_dict

MIN_ZIPF = 1.5
letters = re.compile(r"^[^\W\d_]+$")
buckets = {}
for word, freq in get_frequency_dict("en", wordlist="large").items():
    z = round((math.log10(freq) + 9) * 10)
    if z < MIN_ZIPF * 10 or not letters.match(word):
        continue
    buckets.setdefault(z, []).append(word)

out = os.path.join(os.path.dirname(__file__), "..", "data", "freq-en.txt")
with open(out, "w", encoding="utf-8") as f:
    for z in sorted(buckets, reverse=True):
        f.write(f"{z} {' '.join(sorted(buckets[z]))}\n")
print(sum(len(b) for b in buckets.values()), "words")
