var NUM_CARDS_FOR_FLUSH = 5
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
    // order the hand
    var orderedHand = _.sortBy(hand, function(card){ return RANKS.indexOf(card.rank)})
    var straightHand = []
    straightHand.push(orderedHand[0])
    for(var i = 1; i < orderedHand.length; i++){
      var card = orderedHand[i]
      var cardRank = RANKS.indexOf(card.rank)
      var lastCardInStraightRank = RANKS.indexOf(straightHand[straightHand.length - 1].rank)
      var isCardOneHigher = cardRank - 1 == lastCardInStraightRank
      // console.log(RANKS.indexOf(card.rank) - 1)
      console.log(orderedHand[i].rank)
      if (!isCardOneHigher && straightHand.length < 5) {
        straightHand = []
      }
      straightHand.push(card)
      straightHand = _.uniq(straightHand, function(card){
        return card.rank
      })
    }
    // see if there are 5 in a row
    console.log(_.map(straightHand, function(card){ return card.rank }))
  },
  isFlush: function(hand){

    var suits = _.map(hand, function(card){
      return card.suit
    })
    var mostSuit = suits.mode()
    var numOfMostSuit = _.filter(hand, function(card){ return card.suit == mostSuit }).length
    if(numOfMostSuit >= NUM_CARDS_FOR_FLUSH){
      return true
    } else{
      return false
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
