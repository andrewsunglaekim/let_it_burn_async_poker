var HAND_RANKS = ["pair", "two pair", "trips", "straight", "flush", "full house", "quads", "straight flush"]
var BEST_HAND = 5
var TieBreaker = function(deciders){
  this.judge = new Decider()
  this.deciders = deciders
  this.removeLesserHands()
  this.winners = this.getWinner()
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
      return this.breakTie(this.deciders[0].handType)
    }

  },
  breakTie: function(handType){
    if(handType == "straight flush"){ return this.breakHighHand() }
    else if(handType == "quads") { return this.breakHighHand() }

  },
  breakHighHand: function(){
    var bestDecider = this.deciders[0]
    var winners = []
    _.each(this.deciders, function(decider){
      if (decider.score() == bestDecider.score()){
        winners.push(decider)
      } else if (decider.score() > bestDecider.score()) {
        winners = []
        winners.push(decider)
        bestDecider = decider
      }
    })
    return winners
  },
  breakFullHouse: function(){

  }
  // var array1 = [4,8,9,10];
  // var array2 = [4,8,9,10];
  //
  // var is_same = (array1.length == array2.length) && array1.every(function(element, index) {
  //     return element === array2[index];
  // });

}
