#!/bin/bash
# Generate all flashcard audio with ElevenLabs (voices: Amelia=es, Bella=en)
fail=0
while IFS='|' read -r lang slug text; do
  out="audio/${lang}-${slug}.mp3"
  [ -s "$out" ] && continue
  if [ "$lang" = "es" ]; then voice="ZF6FPAbjXT4488VcRRnw"; else voice="hpp4J3VqNfWAUOO0d1Us"; fi
  elevenlabs text-to-speech convert --voice-id "$voice" --model-id eleven_multilingual_v2 \
    --output-format mp3_44100_128 --text "$text" -o "$out" -q 2>>genaudio.err || { echo "FAIL: $out"; fail=1; }
done < wordlist.txt
echo "done fail=$fail files=$(ls audio | wc -l)"
