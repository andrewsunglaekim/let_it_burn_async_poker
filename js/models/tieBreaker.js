var HAND_RANKS = ["high card", "pair", "two pair", "trips", "straight", "flush", "full house", "quads", "straight flush"]
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
    this.deciders = _.select(this.deciders, function(decider){
      return decider.handType == bestHand.handType })
  },
  getWinner: function(){
    if(this.deciders.length == 1){
      this.winners = this.firstCase
      return [this.deciders[0]]
    } else {
      this.winners = this.breakTie(this.deciders[0].handType)
    }
  },
  breakTie: function(handType){
    if(handType == "straight flush"){ return this.breakHighHand(this.deciders) }
    else if(handType == "quads") { return this.breakQuads() }
    else if(handType == "full house") { return this.breakFullHouse() }
    else if(handType == "flush") { return this.breakHighHand(this.deciders) }
    else if(handType == "straight") { return this.breakHighHand(this.deciders) }
    else if(handType == "trips") { return this.breakTrips(this.deciders) }
    else if(handType == "two pair") { return this.breakTwoPair(this.deciders) }
    else if(handType == "pair") { return this.breakPair(this.deciders) }
    else if(handType == "high card") { return this.breakHighHand(this.deciders) }
  },
  breakHighHand: function(deciders){
    var bestDecider = deciders[0]
    var winners = []
    _.each(deciders, function(decider){
      if (decider.score(decider.bestHand.kickers) == bestDecider.score(bestDecider.bestHand.kickers)){
        winners.push(decider)
      } else if (decider.score(decider.bestHand.kickers) > bestDecider.score(bestDecider.bestHand.kickers)) {
        winners = []
        winners.push(decider)
        bestDecider = decider
      }
    })
    return winners
  },
  breakQuads: function(){
    var bestDeciderRank = this.deciders[0].bestHand.quads[0].rankValue()
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
    highestPair = _.max(sameOfHighest, function(decider){
      return decider.bestHand.pair[0].rankValue()
    }).bestHand.pair[0].rankValue()
    winners = _.select(sameOfHighest, function(decider){
      return decider.bestHand.pair[0].rankValue() == highestPair
    })
    this.winners = winners
    return winners
  },
  breakTrips: function(){
    highestTrip = _.max(this.deciders, function(decider){
      return decider.bestHand.trips[0].rankValue()
    }).bestHand.trips[0].rankValue()
    sameOfHighest = _.select(this.deciders, function(decider){
      return decider.bestHand.trips[0].rankValue() == highestTrip
    })
    _.each(sameOfHighest, function(decider){
      console.log(decider)
      decider.bestHand.kickers = decider.bestHand.kickers.slice(-2)
    })
    return this.breakHighHand(sameOfHighest)
  },
  breakTwoPair: function(){
    highestPair = _.max(this.deciders, function(decider){
      return decider.bestHand.highPair[0].rankValue()
    }).bestHand.highPair[0].rankValue()
    sameOfHighest = _.select(this.deciders, function(decider){
      return decider.bestHand.highPair[0].rankValue() == highestPair
    })
    if(sameOfHighest.length > 1){
      highestLowPair = _.max(sameOfHighest, function(decider){
        return decider.bestHand.lowPair[0].rankValue()
      }).bestHand.lowPair[0].rankValue()
      sameOfHighestLowPair = _.select(sameOfHighest, function(decider){
        return decider.bestHand.lowPair[0].rankValue() == highestLowPair
      })
      return this.breakHighHand(sameOfHighestLowPair)
    } else{
      return sameOfHighest
    }
  },
  breakPair: function(){
    highestPair = _.max(this.deciders, function(decider){
      return decider.bestHand.pair[0].rankValue()
    }).bestHand.pair[0].rankValue()
    sameOfHighest = _.select(this.deciders, function(decider){
      return decider.bestHand.pair[0].rankValue() == highestPair
    })
    return this.breakHighHand(sameOfHighest)
  }

}
