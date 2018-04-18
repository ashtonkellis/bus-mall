'use strict';

// number of images displayed at a time. recommended < 10 or time to find a unique set of images gets ridiculous...
Item.imagesDisplayed = 3;
Item.requiredVotes = 5;
Item.prevChoices = [];
Item.itemDisplayDiv = document.getElementById('items');

var data = {};


// calculte data required for chart.
function calculateVoteData () {
  data.itemNames = [];
  data.itemVotes = [];
  data.backgroundColors = [];
  data.borderColors = [];
  data.backgroundColorCoices = [
    'rgb(150, 0, 0 , 0.2)',
    'rgb(0, 150, 0, 0.2)',
    'rgb(0, 0, 150, 0.2)'];
  data.borderColorChoices = [
    'rgb(150, 0, 0, 1)',
    'rgb(0, 150, 0, 1)',
    'rgb(0, 0, 150 , 1)'];

  var i = 0;
  for (var item of items) {
    data.itemNames.push(item.name);
    data.itemVotes.push(item.voteNum);
    data.backgroundColors.push(data.backgroundColorCoices[i % data.backgroundColorCoices.length]);
    data.borderColors.push(data.borderColorChoices[i % data.borderColorChoices.length]);
    i++;
  }
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
    if (!uniqueIndexes.includes(randInt)) {
      uniqueIndexes.push(randInt);
    }
  }
  return uniqueIndexes;
}

//  tests whether a new index array can be used
function indexArrIsUnique(indexArr) {
  // return true if there are no previous guesses
  if (Item.prevChoices.length === 0) {
    return true;
  }

  // check that index is unique to all previous choices (permutations and combinations)
  for (var choice of Item.prevChoices) {
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
  var lastChoiceIndex = Item.prevChoices.length - 1;
  var lastChoice = Item.prevChoices[lastChoiceIndex];
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
  while (Item.itemDisplayDiv.hasChildNodes()) {
    Item.itemDisplayDiv.removeChild(Item.itemDisplayDiv.lastChild);
  }
}

// renders a set of items on the page. the # of items is a parameter (3 is recommended)
function renderItems (quantity) {
  // create new array of random indexes, and ensure it is unique
  var indexArr;
  do {
    indexArr = getRandomIndexes(quantity, 0, items.length - 1);
  } while (!indexArrIsUnique(indexArr));

  // add index array to previous choices
  Item.prevChoices.push(indexArr);

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
    Item.itemDisplayDiv.appendChild(imgEL);
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
  // increment the vote of the selected item
  incrementVote(e.target.id);

  // check for end of voting
  if (Item.prevChoices.length < Item.requiredVotes) {
    // render a new set of items and create new event listeners for them
    renderItems(Item.imagesDisplayed
    );
    addAllImageEventListeners();
  } else {
    // clear previously rendered items and render vote results table
    clearItems();
    renderVotesTable();
    calculateVoteData();
    renderVoteChart();
  }
}

function addAllImageEventListeners () {
  for (var i = 0; i < Item.itemDisplayDiv.childElementCount; i++) {
    var itemImage = Item.itemDisplayDiv.childNodes[i];
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
function renderVotesTable () {
  //render results table header
  var tableEL = document.getElementById('results-table');
  var trEL = document.createElement('tr');
  trEL.appendChild(addTH('#'));
  trEL.appendChild(addTH('Item Name'));
  trEL.appendChild(addTH('Votes'));
  trEL.appendChild(addTH('Views'));
  trEL.appendChild(addTH('% Votes'));
  tableEL.appendChild(trEL);

  // render results data rows
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    trEL = document.createElement('tr');
    trEL.appendChild(addTD(i + 1)); // #
    trEL.appendChild(addTD(item.name)); // id
    trEL.appendChild(addTD(item.voteNum)); // votes
    trEL.appendChild(addTD(item.shownNum)); // views
    trEL.appendChild(addTD(Math.floor(100 * item.voteNum / item.shownNum))); // % votes
    tableEL.appendChild(trEL);
  }
}

// render chart
function renderVoteChart () {
  // privide data to chart.js
  var ctx = document.getElementById('results-chart').getContext('2d');
  var myChart = new Chart(ctx, { // eslint-disable-line
    type: 'bar',
    data: {
      labels: data.itemNames,
      datasets: [{
        label: '# of Votes',
        data: data.itemVotes,
        backgroundColor: data.backgroundColors,
        borderColor: data.borderColors,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        xAxes: [{
          stacked: false,
          beginAtZero: true,
          scaleLabel: {
            labelString: 'Month'
          },
          ticks: {
            stepSize: 1,
            min: 0,
            autoSkip: false
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero:true,
            stepSize: 1
          }
        }]
      }
    }
  });
}

renderItems(Item.imagesDisplayed);
addAllImageEventListeners();
