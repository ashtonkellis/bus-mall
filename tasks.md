# TODAY'S LAB MVP
- array of items
- constructor function to make items with properties:
  - htmlID
  - name
  - url
  - voteNum
  - displayNum


1. display results of votes after a total of 25 selections have been made
2. display total number of clicks that an item receives
3. display percentage of votes (times selected / number of times displayed)
4. track number of times each item is displayed
5. Upon receiving a click, three new non-duplicating random images need to be automatically displayed. In other words, the three images that are displayed should contain no duplicates, nor should they duplicate with any images that we displayed immediately before
6. After 25 selections have been made, turn off the event listeners on the images (to prevent additional voting) and also display a list of the products with votes received with each list item looking like "3 votes for the Banana Slicer"

4. custom font
5. custom color pallet

# TODAY'S CANVAS ASSIGNMENTS
1. When your work is complete and ready for submission, open a Pull Request from `busmall-start` to `master`.
2. Submit the link to the above Pull Request to Canvas
3. Add a comment to this Canvas submission with answers to the following questions.
  - How did this go, overall?
  - What observations or questions do you have about what you've learned so far?
4. Once you've submitted your work, complete the merge of `busmall-start` to `master`

# STRETCH GOALS
* Handle the display and voting for an arbitrary number of images
* Using a variable, declare in your JS how many images to show
* Based on that value, dynamically create that many ```<img>``` tags
* Also based on that value, ensure that your randomizer is properly handling the specified number of images for display and repeat tracking.