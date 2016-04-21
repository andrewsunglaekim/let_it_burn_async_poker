$(document).ready(function(){
  dealer = new Dealer()
  bob = new Player("Bob", 500)
  tom = new Player("Tom", 500)
  susy = new Player("Susy", 500)
  dealer.addPlayer(bob)
  dealer.addPlayer(tom)
  dealer.addPlayer(susy)
  // dealer.newDeck()
  // dealer.dealPocket()
  boardCard  = new Card("spades", "10")
  boardCard1 = new Card("clubs", "3")
  boardCard2 = new Card("spades", "4")
  boardCard3 = new Card("diamonds", "6")
  boardCard4 = new Card("spades", "10")
  dealer.board = [boardCard, boardCard1, boardCard2, boardCard3, boardCard4]
  bobCard = new Card("spades", "5")
  bobCard1 = new Card("diamonds", "2")
  bob.hand = [bobCard, bobCard1]
  tomCard = new Card("hearts", "J")
  tomCard1 = new Card("spades", "Q")
  tom.hand = [tomCard, tomCard1]
  susyCard = new Card("spades", "7")
  susyCard1 = new Card("hearts", "5")
  susy.hand = [susyCard, susyCard1]
  // dealer.dealFlop()
  // dealer.dealTurn()
  // dealer.dealRiver()
  bobDecider = new Decider(bob, dealer.board)
  tomDecider = new Decider(tom, dealer.board)
  susyDecider = new Decider(susy, dealer.board)
  winner = new TieBreaker([bobDecider, tomDecider, susyDecider])

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
