$(document).ready(function(){
  dealer = new Dealer()
  bob = new Player("Bob", 500)
  tom = new Player("Tom", 500)
  susy = new Player("Susy", 500)
  eddy = new Player("Eddy", 500)
  dealer.addPlayer(bob)
  dealer.addPlayer(tom)
  dealer.addPlayer(susy)
  dealer.addPlayer(eddy)
  dealer.newDeck()
  dealer.dealPocket()
  dealer.dealFlop()
  dealer.dealTurn()
  dealer.dealRiver()
  // dealer.newDeck()
  // dealer.dealPocket()
  // boardCard  = new Card("diamonds", "7")
  // boardCard1 = new Card("spades", "7")
  // boardCard2 = new Card("hearts", "7")
  // boardCard3 = new Card("spades", "2")
  // boardCard4 = new Card("clubs", "10")
  // dealer.board = [boardCard, boardCard1, boardCard2, boardCard3, boardCard4]
  // bobCard = new Card("spades", "10")
  // bobCard1 = new Card("diamonds", "8")
  // bob.hand = [bobCard, bobCard1]
  // tomCard = new Card("spades", "10")
  // tomCard1 = new Card("spades", "J")
  // tom.hand = [tomCard, tomCard1]
  // susyCard = new Card("spades", "8")
  // susyCard1 = new Card("spades", "8")
  // susy.hand = [susyCard, susyCard1]
  // dealer.dealFlop()
  // dealer.dealTurn()
  // dealer.dealRiver()
  bobDecider = new Decider(bob, dealer.board)
  tomDecider = new Decider(tom, dealer.board)
  susyDecider = new Decider(susy, dealer.board)
  eddyDecider = new Decider(eddy, dealer.board)
  console.log(_.map(dealer.board, function(card){return card.rank}))
  console.log(bobDecider.handType, _.map(bobDecider.hand, function(card){ return card.rank}),  _.map(bob.hand, function(card){ return card.rank}))
  console.log(tomDecider.handType, _.map(tomDecider.hand, function(card){ return card.rank}),  _.map(tom.hand, function(card){ return card.rank}))
  console.log(susyDecider.handType, _.map(susyDecider.hand, function(card){ return card.rank}),  _.map(susy.hand, function(card){ return card.rank}))
  console.log(eddyDecider.handType, _.map(eddyDecider.hand, function(card){ return card.rank}),  _.map(eddy.hand, function(card){ return card.rank}))
  winner = new TieBreaker([bobDecider, tomDecider, susyDecider, eddyDecider])
  console.log(winner.winners)
  // hand = [testCard, testCard1, testCard2, testCard3, testCard4, testCard5, testCard6, testCard7]



  // decider = new Decider(dealer)
  // var something = true
  // while(something == true){
  //   [1,2,3].forEach(function(num){
  //     if (num == 2){
  //       break
  //     }
  //     console.log(num)
  //   })
  // }
})
