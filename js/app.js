$(document).ready(function(){
  testCard6 = new Card("hearts", "A")
  testCard2 = new Card("diamonds", "Q")
  testCard4 = new Card("hearts", "J")
  testCard1 = new Card("spades", "8")
  testCard3 = new Card("spades", "9")
  testCard = new Card("poop", "8")
  testCard5 = new Card("spades", "8")
  testCard7 = new Card("spades", "10")
  hand = [testCard, testCard1, testCard2, testCard3, testCard4, testCard5, testCard6, testCard7]
  decider = new Decider(hand)
  console.log(decider.handType)
  console.log(decider.bestHand)
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
