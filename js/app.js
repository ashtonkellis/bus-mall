'use strict';

function Item(name, imageName, htmlId) {
  this.name = name;
  this.path = 'img/' + imageName;
  this.htmlId = htmlId;
  this.voteNum = 0;
  this.shownNum = 0;
}

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

var prevChoices = [];

var itemsList = document.getElementById('items');

function randIntBetween (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

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

//  FINISH FUNCTION TO TEST WHETHER AN OPTINO HAS BEEN PREVIOUSLY PRESENTED
function testChoiceArray(indexArr) {
  return true;
}

function renderItems (quantity) {
  // create new array of random indexes
  var indexArr = getRandomIndexes(quantity, 0, items.length - 1);
  // ensure that it has not been previously shown
  if (!testChoiceArray(indexArr)) {
    renderItems();
  }

  // add index array to previous choices
  prevChoices.push(indexArr);

  // update shown number for each item
  for (var i of indexArr) {
    items[i].shownNum++;
  }

  // clear previously rendered items
  while (itemsList.hasChildNodes()) {
    itemsList.removeChild(itemsList.lastChild);
  }

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

  if (prevChoices.length <= 24) {
    renderItems(3);
    addAllImageEventListeners();
  } else {
    // clear previously rendered items  ************ NEED TO REFACTOR THIS. SAME CODE USED ABOVE
    while (itemsList.hasChildNodes()) {
      itemsList.removeChild(itemsList.lastChild);
    }
    tallyVotes();
  }
}

function addAllImageEventListeners () {
  for (var i = 0; i < itemsList.childElementCount; i++) {
    var itemImage = itemsList.childNodes[i];
    itemImage.addEventListener('click', handleImageClick);
  }
}

// display the results of the voting ***** CONVERT TO A TABLE ASAP *****
function tallyVotes () {
  var ulEL = document.getElementById('results');
  for (var item of items) {
    var liEL = document.createElement('li');
    liEL.textContent = item.htmlId + ' - ';
    liEL.textContnet += item.voteNum.toString() + '/' + item.shownNum.toString() + ' - ';
    liEL.textContent += Math.round((item.voteNum / item.shownNum * 100)).toString() + '%';
    ulEL.appendChild(liEL);
  }
}

renderItems(3);
addAllImageEventListeners();