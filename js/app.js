'use strict';

var requiredVotes = 25;
var prevChoices = [];

var itemsList = document.getElementById('items');

var items = [
  new Item('R2D2 Luggage', 'bag.jpg', 'bag'),
  new Item('Banana Slicer', 'banana.jpg', 'banana'),
  new Item('Bathroom iPod Stand', 'bathroom.jpg', 'bathroom'),
  new Item('Open Toe Boots', 'boots.jpg', 'boots'),
  new Item('All-In-One Breakfast', 'breakfast.jpg', 'breakfast'),
  new Item('Meatball Bubble Gum', 'bubblegum.jpg', 'bubblegum'),
  new Item('Convex Chair', 'chair.jpg', 'chair'),
  new Item('Cthulhu Figurine', 'cthulhu.jpg', 'Cthulhu'),
  new Item('Doggy Duck Lips', 'dog-duck.jpg', 'dog-duck'),
  new Item('Dragon Meat', 'dragon.jpg', 'dragon'),
  new Item('Pen Tip Utensils', 'pen.jpg', 'pen'),
  new Item('Pet Sweep Dust Boots', 'pet-sweep.jpg', 'pet-sweep'),
  new Item('Pizza Scissors', 'scissors.jpg', 'scissors'),
  new Item('Sharking Bag', 'shark.jpg', 'shark'),
  new Item('Baby Sweep Onesie', 'sweep.png', 'sweep'),
  new Item('Tauntaun Sleeping Bag', 'tauntaun.jpg', 'tauntaun'),
  new Item('Unicorn Mean', 'unicorn.jpg', 'unicorn'),
  new Item('Tentacle USB', 'usb.gif', 'usb'),
  new Item('Self-Watering Can', 'water-can.jpg', 'water-can'),
  new Item('12-Step Wine Glass', 'wine-glass.jpg', 'wine-glass'),
];

// item constructor function
function Item(name, imageName, htmlId) {
  this.name = name;
  this.path = 'img/' + imageName;
  this.htmlId = htmlId;
  this.voteNum = 0;
  this.shownNum = 0;
}

// returns a random integer between the min and max (both inclusive)
function randIntBetween (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// generates an N-length array of random, unique indexes. N can be specified by the quantity parameter.
function getRandomIndexes(quantity, min, max) {
  var uniqueIndexes = [];
  while (uniqueIndexes.length < quantity) {
    var randInt = randIntBetween(min, max);
    if (uniqueIndexes.includes(randInt)) {
      getRandomIndexes();
    } else {
      uniqueIndexes.push(randInt);
    }
  }
  return uniqueIndexes;
}

//  tests whether a new index array can be used
function indexArrIsUnique(indexArr) {
  // return true if there are no previous guesses
  if (prevChoices.length === 0) {
    return true;
  }

  // check that index is unique to all previous choices (permutations and combinations)
  for (var choice of prevChoices) {
    var duplicates = 0;
    for (var indexValue of indexArr) {
      if (choice.includes(indexValue)) {
        duplicates++;
      }
      if (duplicates === indexArr.length) {
        return false;
      }
    }
  }

  //check that new selection does not have any duplicate images from the last selection
  var lastChoiceIndex = prevChoices.length - 1;
  var lastChoice = prevChoices[lastChoiceIndex];
  duplicates = 0;
  for (indexValue of indexArr) {
    if (lastChoice.includes(indexValue)) {
      return false;
    }
  }
  return true;
}

// clears all of the items from the screen before rendering
function clearItems () {
  while (itemsList.hasChildNodes()) {
    itemsList.removeChild(itemsList.lastChild);
  }
}

// renders a set of items on the page. the # of items is a parameter (3 is recommended)
function renderItems (quantity) {
  // create new array of random indexes
  var indexArr = getRandomIndexes(quantity, 0, items.length - 1);
  // ensure that it has not been previously shown
  if (!indexArrIsUnique(indexArr)) {
    renderItems();
  }

  // add index array to previous choices
  prevChoices.push(indexArr);

  // update shown number property for each item
  for (var i of indexArr) {
    items[i].shownNum++;
  }

  // clear previously rendered items
  clearItems();

  // render items
  for (var j of indexArr) {
    var imgEL = document.createElement('img');
    imgEL.src = items[j].path;
    imgEL.id = items[j].htmlId;
    itemsList.appendChild(imgEL);
  }
}

// increment vote of the appropriate item based on the html Id
function incrementVote(htmlId) {
  for (var item of items) {
    if (item.htmlId === htmlId) {
      item.voteNum++;
    }
  }
}

// image click handler
function handleImageClick (e) {
  console.log(e.target.id);
  // increment the vote of the selected item
  incrementVote(e.target.id);

  // check for end of voting
  if (prevChoices.length < requiredVotes) {
    // render a new set of items and create new event listeners for them
    renderItems(3);
    addAllImageEventListeners();
  } else {
    // clear previously rendered items and tally votes
    clearItems();
    tallyVotes();
  }
}

function addAllImageEventListeners () {
  for (var i = 0; i < itemsList.childElementCount; i++) {
    var itemImage = itemsList.childNodes[i];
    itemImage.addEventListener('click', handleImageClick);
  }
}

// accepts a text string and returns a table header element with that text string
function addTH(elementText) {
  var thEL = document.createElement('th');
  thEL.textContent = elementText;
  return thEL;
}

// accepts a text string and returns a table data element with that text string
function addTD(elementText) {
  var tdEL = document.createElement('td');
  tdEL.textContent = elementText;
  return tdEL;
}

// render the results table
function tallyVotes () {
  //render results table header
  var tableEL = document.getElementById('results');
  var trEL = document.createElement('tr');
  trEL.appendChild(addTH('#'));
  trEL.appendChild(addTH('ID'));
  trEL.appendChild(addTH('Votes'));
  trEL.appendChild(addTH('Views'));
  trEL.appendChild(addTH('% Votes'));
  tableEL.appendChild(trEL);
  console.log('before loop');

  // render results data rows
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    trEL = document.createElement('tr');
    trEL.appendChild(addTD(i + 1)); // #
    trEL.appendChild(addTD(item.htmlId)); // id
    trEL.appendChild(addTD(item.voteNum)); // votes
    trEL.appendChild(addTD(item.shownNum)); // views
    trEL.appendChild(addTD(Math.floor(100 * item.voteNum / item.shownNum))); // % votes
    tableEL.appendChild(trEL);
  }
}

renderItems(3);
addAllImageEventListeners();