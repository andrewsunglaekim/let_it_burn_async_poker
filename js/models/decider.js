var Decider = function(dealer){
  this.players = dealer.players;
  this.board = dealer.board;
  this.potentialWinner = [];
}

Decider.prototype = {
  entireHand: function(player){
    return player.hand.concat(this.board)
  },
  determineWinner: function(player){
    // if a player has straight flush move into winners array
    // if a there are players in the array
      // 1 player, return the winner
      // more then 1 player do tie break
       // types of tie breaks
         // highest card in hand for straights, flushes
         // higest card in quad after removing quad
         // highest card in trips after removing the trips
         // highest pair in 2 pair after removing 2 pair
           // check highest card after removing 2 pair
         // highest pair
           // highest card > next highest > last card
         // high card


  },
  isStraightFlush: function(hand){

  },
  isStraight: function(hand){

  },
  isFlush: function(hand){
    var suitCounters = {
    }
    // of 7 5 has all of the same suit

  },
  highCardValue: function(cards){
    var highCard = 0;
    cards.forEach(function(card){
      if(cards.indexOf(card) > highCard){
        highCard = card
      }
    })
    return highCard
  }


}

// straight flush
// 4-of-a-kind
// full-house
// flush
// straight
//trips
//two-pair
//
