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

function handleImageClick (e) {
  for (var i; i < 3; i++) {
    console.log(items[i]);
  }
  console.log(e.target.id);
  console.log(e.target);
}

function addAllImageEventListeners () {
  for (var i = 0; i < itemsList.childElementCount; i++) {
    var itemImage = itemsList.childNodes[i];
    itemImage.addEventListener('click', handleImageClick);
  }
}

function incrementVote(path) {
  for (var item of items) {
    if (item.path = path) {
      item.voteNum++;
    }
  }
}

renderItems(3);
addAllImageEventListeners();