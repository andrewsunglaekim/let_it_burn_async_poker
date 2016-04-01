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
  testCard6 = new Card("spades", "8")
  testCard = new Card("spades", "9")
  testCard1 = new Card("spades", "10")
  testCard2 = new Card("spades", "J")
  testCard3 = new Card("spades", "Q")
  testCard4 = new Card("spades", "5")
  testCard5 = new Card("spades", "K")
  dealer.board = [testCard, testCard1, testCard2, testCard3, testCard4, testCard5, testCard6]
  decider = new Decider(dealer)

})
