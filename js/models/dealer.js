function Dealer(){
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
      player.hand.push(this.deck.shift())
    }
    this.board.push(this.deck.shift())
  },
  dealPocket: function(){
    var NUM_CARDS_FOR_POCKET = 2
    for(var numCards = 0; i < NUM_CARDS_IN_POCKET; i++){
      for(var i = 0; i < this.players.length; i++){
        players.hand.push(this.deck.shift())
      }
    }
  },
  dealFlop: function(){
    var NUM_CARDS_FOR_FLOP
    var burnCard = this.burnCard()
    for(var i = 0; i < NUM_CARDS_FOR_FLOP; i++){
      this.board.push(this.deck.shift)
    }
  },
  dealTurn: function(){
    this.burnCard()
    this.dealCard()
  },
  dealRiver: function(){
    this.burnCard()
    this.dealCard()
  }
  burnCard: function(){
    var burnCard = this.deck.shift()
    return burnCard
  }
}
