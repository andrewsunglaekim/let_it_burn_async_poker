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
  testCard6 = new Card("hearts", "9")
  testCard2 = new Card("diamonds", "Q")
  testCard4 = new Card("hearts", "9")
  testCard1 = new Card("spades", "K")
  testCard3 = new Card("spades", "J")
  testCard = new Card("clubs", "K")
  testCard5 = new Card("spades", "Q")
  dealer.board = [testCard, testCard1, testCard2, testCard3, testCard4, testCard5, testCard6]
  decider = new Decider(dealer)
  var something = true
  while(something == true){
    [1,2,3].forEach(function(num){
      if (num == 2){
        break
      }
      console.log(num)
    })
  }
})
