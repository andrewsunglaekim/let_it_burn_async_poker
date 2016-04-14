var Hand = function(cards){
  this.cards = cards
}

Hand = {
  evalStraightFlush: function(hand){
    var flushHand = this.evalFlush(hand)
    if (flushHand){
      var straightHand = this.evalStraight(flushHand)
      if (straightHand) {
        return straightHand
      } else {
        return false
      }
    } else {
      return false
    }
  }
}

Hand.prototype = {
  highHand: function(){

    // returns best 5 card hand in the format to break tie
  },
  sortDescHand: function(){
    return _.sortBy(this.cards, function(card){ return card.rankValue() }).reverse()
  },
  sortAscHand: function(){
    return _.sortBy(this.cards, function(card){ return card.rankValue() })
  },
  evalStraightFlush: function(hand){
    var flushHand = this.evalFlush(hand)
    if (flushHand){
      var straightHand = this.evalStraight(flushHand)
      if (straightHand) {
        return straightHand
      } else {
        return false
      }
    } else {
      return false
    }
  },
  evalQuads: function(hand){
    var ranks = _.map(hand, function(card){ return card.rank })
    var mostOfRank = ranks.mode()
    var numOfMostOfRank = _.filter(hand, function(card){ return card.rank == mostOfRank }).length
    if (numOfMostOfRank == NUM_CARDS_FOR_QUAD){
      return hand
    } else {
      return false
    }
  },
  evalFullHouse: function(hand){
    var trips = this.evalTrips(hand)
    if( trips ){
      var pair = this.evalPair(trips.highCards)
      if (pair) {
        return {
          trips: trips.trips,
          pair: pair.pair
        }
      } else {
        return false
      }
    } else {
      return false
    }
  },
  evalFlush: function(hand){
    var suits = _.map(hand, function(card){ return card.suit })
    var mostSuit = suits.mode()
    var numOfMostSuit = _.filter(hand, function(card){ return card.suit == mostSuit }).length
    var flushHand = _.filter(hand, function(card){ return card.suit == mostSuit })
    var orderedFlushHand = _.sortBy(flushHand, function(card){ return card.rankValue()})
    if(flushHand.length >= NUM_CARDS_FOR_FLUSH){
      return orderedFlushHand
    } else{
      return false
    }
  },
  evalStraight: function(hand){
    var orderedHand = this.sortAscHand(hand)
    var straightHand = []
    if(orderedHand[orderedHand.length - 1].rank == "A"){
      straightHand.push(orderedHand[orderedHand.length - 1])
    } else {
      straightHand.push(orderedHand[0])
    }
    for(var i = 0; i < orderedHand.length; i++){
      var card = orderedHand[i]
      var cardRank = card.rankValue()
      var lastCardInStraightRank = straightHand[straightHand.length - 1].rankValue()
      var aceValue = 13
      var isCardOneHigher = (cardRank - 1 == lastCardInStraightRank) || (cardRank - 1 == lastCardInStraightRank - aceValue)
      if(cardRank == lastCardInStraightRank){}
      else if (!isCardOneHigher && straightHand.length < 5) {
        straightHand = []
        straightHand.push(card)
      }
      else if (isCardOneHigher) {
        straightHand.push(card)
      }
      straightHand = _.uniq(straightHand, function(card){
        return card.rank
      })
    }
    if (straightHand.length >= NUM_CARDS_FOR_STRAIGHT){
      return straightHand
    } else {
      return false
    }
  },
  evalTrips: function(hand){
    var ranks = _.map(hand, function(card){ return card.rank })
    var mostOfRank = ranks.mode()
    var trips = _.filter(hand, function(card){ return card.rank == mostOfRank })
    var highCards = _.reject(hand, function(card){ return card.rank == mostOfRank })
    var numOfMostOfRank = trips.length
    if (numOfMostOfRank == NUM_CARDS_FOR_TRIPS){
      return {
        trips: trips,
        highCards: highCards
      }
    } else {
      return false
    }
  },
  evalTwoPair: function(hand){
    var orderedHand = this.sortDescHand(hand)
    var highPair = this.evalPair(hand)
    if (highPair){
      var lowPair = this.evalPair(highPair.otherCards)
      if (lowPair){
        highCard = this.highCard(lowPair.otherCards)
        return {
          highPair: highPair.pair,
          lowPair: lowPair.pair,
          highCard: highCard
        }
      }
    }
    return false
  },
  evalPair: function(hand){
    var ranks = _.map(hand, function(card){ return card.rank })
    var mostOfRank = ranks.mode()
    var pair = _.filter(hand, function(card){ return card.rank == mostOfRank })
    var otherCards = _.reject(hand, function(card){ return card.rank == mostOfRank })
    var numOfMostOfRank = pair.length
    if (numOfMostOfRank == NUM_CARDS_FOR_PAIR){
      return {
        pair: pair,
        otherCards: otherCards
      }
    }
    return false
  },
  highCard: function(cards){
    var highCard = new Card("fake", "2");
    this.cards.forEach(function(card){
      if(card.rankValue() > highCard.rankValue()){
        highCard = card
      }
    })
    return highCard
  }
}
