var HAND_RANKS = ["pair", "two pair", "trips", "straight", "flush", "full house", "quads", "straight flush"]
var TieBreaker = function(deciders){
  this.judge = new Decider()
  this.deciders = deciders
  this.removeLesserHands()
}

TieBreaker.prototype = {
  removeLesserHands: function(){
    var handsByRank = _.sortBy(this.deciders, function(decider){
      return HAND_RANKS.indexOf(decider.handType)
    })
    bestHand = handsByRank.reverse()[0]
    this.deciders = _.select(this.deciders, function(decider){ return decider.handType == bestHand.handType })
  },
  getWinner: function(){
    if(this.deciders.length == 1){
      this.winner = this.deciders[0]
      return this.deciders[0]
    } else {
      if(this.deciders[0].handType == "straight flush" ){

      }
    }
  }
}
