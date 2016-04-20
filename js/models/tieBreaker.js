var HAND_RANKS = ["pair", "two pair", "trips", "straight", "flush", "full house", "quads", "straight flush"]
var BEST_HAND = 5
var TieBreaker = function(deciders){
  this.judge = new Decider()
  this.deciders = deciders
  this.removeLesserHands()
  this.winners = []
  this.firstCase = this.deciders[0]
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
      this.winners = this.firstCase
      return this.deciders[0]
    } else {
      this.winners = this.breakTie(this.deciders[0].handType)
    }

  },
  breakTie: function(handType){
    if(handType == "straight flush"){ return this.breakHighHand(this.deciders) }
    else if(handType == "quads") { return this.breakQuads() }
    else if(handType == "full house") { return this.breakQuads() }

  },
  breakHighHand: function(deciders){
    var self = this
    var bestDecider = deciders[0]
    _.each(deciders, function(decider){
      if (decider.score() == bestDecider.score()){
        self.winners.push(decider)
      } else if (decider.score() > bestDecider.score()) {
        self.winners = []
        self.winners.push(decider)
        bestDecider = decider
      }
    })
    return self.winners
  },
  breakQuads: function(){
    var bestDeciderRank = this.deciders[0].bestHand.quads[0].rankValue()
    console.log(bestDeciderRank)
    var sameQuads = []
    _.each(this.deciders, function(decider){
      if (decider.bestHand.quads[0].rankValue() == bestDeciderRank){
        sameQuads.push(decider)
      } else if (decider.bestHand.quads[0].rankValue() > bestDeciderRank){
        sameQuads = []
        sameQuads.push(decider)
        bestDeciderRank = decider.bestHand.quads[0].rankValue()
      }
    })
    return this.breakHighHand(sameQuads)
  },
  breakFullHouse: function(){
    highestTrip = _.max(this.deciders, function(decider){
      return decider.bestHand.trips[0].rankValue()
    }).bestHand.trips[0].rankValue()
    sameOfHighest = _.select(this.deciders, function(decider){
      return decider.bestHand.trips[0].rankValue() == highestTrip
    })
    console.log(sameOfHighest))
  }
  // var array1 = [4,8,9,10];
  // var array2 = [4,8,9,10];
  //
  // var is_same = (array1.length == array2.length) && array1.every(function(element, index) {
  //     return element === array2[index];
  // });

}
