Array.prototype.shuffle = function() {
  var input = this;
  for (var i = input.length-1; i >=0; i--) {
    var randomIndex = Math.floor(Math.random()*(i+1));
    var itemAtIndex = input[randomIndex];
    input[randomIndex] = input[i];
    input[i] = itemAtIndex;
  }
  return input;
}

Array.prototype.mode = function(){
  if(this.length == 0)
    return null;
  var modeMap = {};
  var maxEl = this[0], maxCount = 1;
  for(var i = 0; i < this.length; i++)
  {
    var el = this[i];
    if(modeMap[el] == null)
      modeMap[el] = 1;
    else
      modeMap[el]++;
    if(modeMap[el] > maxCount)
    {
      maxEl = el;
      maxCount = modeMap[el];
    }
  }
  return maxEl;
}
