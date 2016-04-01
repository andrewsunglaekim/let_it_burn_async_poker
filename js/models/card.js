var Card = function(suit, rank){
  this.suit = suit
  this.rank = rank
  this.init()
}

Card.prototype = {
  init: function(){
    console.log(this.suit + this.rank)
  }
}
