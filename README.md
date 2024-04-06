# spelling-hex

Web-based clone of the New York Times' game "Spelling Bee"

Built using vanilla JavaScript and a Wordlist

\*\* TO DO:

- Implement Score Progress Bar
  - Bar Should show realtime progess towards milestones
  - Bar should include score
  - Should be able to click on to view more detailed score breakdown
- Implement Previous Word List
  - Should give preview of most recent accepted words
  - Overflow should be hidden, perhaps with a fading effect
  - Should have functinoality to show all previous words
  - Should offer to pull definition from Webster Dictionary API
- Getting Spangram or Septagram should award addiontal points
- Center letter should be orange in input queue
- New Game should clear found word list and array

\*\* Rankings explained:

- Based on percentage of possible points
  (Add script to calculate possible points for each new game)
  “Status” %
  Beginner 0
  Good Start 2
  Moving Up 5
  Good 8
  Solid 15
  Nice 25
  Great 40
  Amazing 50
  Genius 70
  Queen Bee 100
