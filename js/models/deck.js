var SUITS = ["clubs", "spades", "diamonds", "hearts"];
var RANKS = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

var Deck = function(){
  this.cards = [];
  this.init();
}

Deck.prototype = {
  init: function(){
    var self = this
    SUITS.forEach(function(suit){
      RANKS.forEach(function(rank){
        var card = new Card(suit, rank)
        self.cards.push(card)
      })
    })
    this.shuffleDeck();
  },
  shuffleDeck: function(){

  }
}
