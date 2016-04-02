$(document).ready(function(){
  dealer = new Dealer()
  dealer.addPlayer("bob", 500)
  bob = dealer.players[0]
  dealer.addPlayer("tom", 500)
  dealer.addPlayer("sue", 500)
  dealer.newDeck()
  dealer.dealPocket()
  dealer.dealFlop()
  dealer.dealTurn()
  dealer.dealRiver()
  testCard6 = new Card("hearts", "A")
  testCard = new Card("clubs", "K")
  testCard1 = new Card("spades", "K")
  testCard2 = new Card("diamonds", "9")
  testCard3 = new Card("spades", "A")
  testCard4 = new Card("hearts", "A")
  testCard5 = new Card("spades", "10")
  dealer.board = [testCard, testCard1, testCard2, testCard3, testCard4, testCard5, testCard6]
  decider = new Decider(dealer)

})
