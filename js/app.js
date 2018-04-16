'use strict';

function Item(name, imageName, htmlId) {
  this.name = name;
  this.imageName = 'img/' + imageName;
  this.htmlId = htmlId;
  this.voteNum = 0;
  this.shownNum = 0;
}

