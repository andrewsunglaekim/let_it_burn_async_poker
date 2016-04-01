var Decider = function(dealer){
  this.players = dealer.players
  this.board = dealer.board
}

Decider.prototype = {
  viewEntireHand: function(player){
    return player.hand.concat(this.board)
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
