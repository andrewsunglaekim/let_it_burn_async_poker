var Dealer = function(){
  this.players = [];
  this.board = []
}

Dealer.prototype = {
  addPlayer: function(name, chips){
    var player = new Player(name, chips)
    this.players.push(player)
  },
  newDeck: function(){
    this.deck = new Deck()
  },
  dealCard: function(player){
    if(player){
      player.hand.push(this.deck.cards.shift())
    }else{
      this.board.push(this.deck.cards.shift())
    }
  },
  dealPocket: function(){
    var NUM_CARDS_FOR_POCKET = 2
    for(var numCards = 0; numCards < NUM_CARDS_FOR_POCKET; numCards++){
      for(var playerIndex = 0; playerIndex < this.players.length; playerIndex++){
        this.dealCard(this.players[playerIndex])
      }
    }
  },
  dealFlop: function(){
    var NUM_CARDS_FOR_FLOP = 3
    var burnCard = this.burnCard()
    for(var i = 0; i < NUM_CARDS_FOR_FLOP; i++){
      this.dealCard()
    }
  },
  dealTurn: function(){
    this.burnCard()
    this.dealCard()
  },
  dealRiver: function(){
    this.burnCard()
    this.dealCard()
  },
  burnCard: function(){
    var burnCard = this.deck.cards.shift()
    return burnCard
  }
}
