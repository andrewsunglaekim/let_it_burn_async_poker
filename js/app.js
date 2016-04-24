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
  boardCard  = new Card("spades", "J")
  boardCard1 = new Card("clubs", "9")
  boardCard2 = new Card("spades", "Q")
  boardCard3 = new Card("diamonds", "2")
  boardCard4 = new Card("spades", "10")
  dealer.board = [boardCard, boardCard1, boardCard2, boardCard3, boardCard4]
  bobCard = new Card("spades", "A")
  bobCard1 = new Card("diamonds", "5")
  bob.hand = [bobCard, bobCard1]
  tomCard = new Card("hearts", "A")
  tomCard1 = new Card("spades", "7")
  tom.hand = [tomCard, tomCard1]
  susyCard = new Card("spades", "3")
  susyCard1 = new Card("hearts", "7")
  susy.hand = [susyCard, susyCard1]
  // dealer.dealFlop()
  // dealer.dealTurn()
  // dealer.dealRiver()
  bobDecider = new Decider(bob, dealer.board)
  tomDecider = new Decider(tom, dealer.board)
  susyDecider = new Decider(susy, dealer.board)
  console.log(bobDecider.handType)
  console.log(tomDecider.handType)
  console.log(susyDecider.handType)
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
