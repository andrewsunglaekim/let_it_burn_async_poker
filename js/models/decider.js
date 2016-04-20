var NUM_CARDS_FOR_FLUSH = 5
var NUM_CARDS_FOR_STRAIGHT = 5
var NUM_CARDS_FOR_QUAD = 4
var NUM_CARDS_FOR_TRIPS = 3
var NUM_CARDS_FOR_PAIR = 2
var HAND_RANKS = ["pair", "two pair", "trips", "straight", "flush", "full house", "quads", "straight flush"]
var Decider = function(player, board){
  if (player && board){
    this.player = player
    this.board = board
    this.hand = this.sortAscHand(this.player.hand.concat(this.board))
    this.bestHand = this.evalHand()
  } else {}
}

Decider.prototype = {
  // put all evaluations into array, reject nils
  evalHand: function(){
    var straightFlush = this.evalStraightFlush(this.hand)
    if (straightFlush){ return straightFlush}
    var quads = this.evalQuads(this.hand)
    if (quads){ return quads}
    var fullHouse = this.evalFullHouse(this.hand)
    if (fullHouse){ return fullHouse }
    var flush = this.evalFlush(this.hand)
    if (flush){ return flush }
    var straight = this.evalStraight(this.hand)
    if (straight){ return straight}
    var trips = this.evalTrips(this.hand)
    if (trips){ return trips }
    var twoPair = this.evalTwoPair(this.hand)
    if (twoPair){ return twoPair }
    var pair = this.evalPair(this.hand)
    if (pair){ return pair }
    else { return this.evalHighestFive(this.hand)}
    // returns best 5 card hand in a a way data can easily parse ties.
  },
  evalStraightFlush: function(hand){
    var flushHand = this.evalFlush(hand)
    if (flushHand){
      var straightHand = this.evalStraight(flushHand.kickers)
      if (straightHand) {
        this.handType = "straight flush"
        return {kickers: straightHand.kickers}
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
    var mostOfCards = _.filter(hand, function(card){ return card.rank == mostOfRank })
    var kicker = this.highCard(_.reject(hand, function(card){ return card.rank == mostOfRank }))
    if (mostOfCards.length == NUM_CARDS_FOR_QUAD){
      this.handType = "quads"
      return {
        quads: mostOfRank,
        kickers: [kicker]
      }
    } else {
      return false
    }
  },
  evalFullHouse: function(hand){
    var trips = this.evalTrips(hand)
    if( trips ){
      var pair = this.evalPair(trips.kickers)
      if (pair) {
        this.handType = "full house"
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
    var suits = _.map(this.hand, function(card){ return card.suit })
    var mostSuit = suits.mode()
    var numOfMostSuit = _.filter(this.hand, function(card){ return card.suit == mostSuit }).length
    var flushHand = _.filter(this.hand, function(card){ return card.suit == mostSuit })
    if(flushHand.length >= NUM_CARDS_FOR_FLUSH){
      this.handType = "flush"
      return {
        kickers: flushHand.slice(-5)
      }
    } else{
      return false
    }
  },
  evalStraight: function(hand){
    var straightHand = []
    if(hand[hand.length - 1].rank == "A"){
      straightHand.push(hand[hand.length - 1])
    } else {
      straightHand.push(hand[0])
    }
    for(var i = 0; i < hand.length; i++){
      var card = hand[i]
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
      this.handType = "straight"
      return {
        kickers:straightHand.slice(-5)
      }
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
      this.handType = "trips"
      return {
        trips: trips,
        kickers: highCards.slice(-2)
      }
    } else {
      return false
    }
  },
  evalTwoPair: function(hand){
    var orderedHand = this.sortDescHand(hand)
    var highPair = this.evalPair(orderedHand)
    if (highPair){
      var lowPair = this.evalPair(highPair.kickers)
      if (lowPair){
        highCard = this.highCard(lowPair.kickers)
        this.handType = "two pair"
        return {
          highPair: highPair.pair,
          lowPair: lowPair.pair,
          kickers: [highCard]
        }
      }
    }
    return false
  },
  evalPair: function(hand){
    var ranks = _.map(hand, function(card){ return card.rank })
    var mostOfRank = ranks.mode()
    var pair = _.filter(hand, function(card){ return card.rank == mostOfRank })
    var kickers = _.reject(hand, function(card){ return card.rank == mostOfRank })
    var numOfMostOfRank = pair.length
    if (numOfMostOfRank == NUM_CARDS_FOR_PAIR){
      this.handType = "pair"
      return {
        pair: pair,
        kickers: kickers
      }
    }
    return false
  },
  evalHighestFive: function(hand){
    this.handType = "high card"
    bestFive = hand.slice(-5)
    return {kickers: bestFive}
  },
  highCard: function(cards){
    var highCard = new Card("fake", "2");
    cards.forEach(function(card){
      if(card.rankValue() > highCard.rankValue()){
        highCard = card
      }
    })
    return highCard
  },
  sortDescHand: function(hand){
    return _.sortBy(hand, function(card){ return card.rankValue() }).reverse()
  },
  sortAscHand: function(hand){
    return _.sortBy(hand, function(card){ return card.rankValue() })
  },
  score: function(){
    kickers = this.sortDescHand(this.bestHand.kickers)
    kickers = _.map(kickers, function(card){ return card.rankValue().toString() })
    kickerString = kickers.join("")
    score = parseInt(kickerString)
    return score
  }
}
