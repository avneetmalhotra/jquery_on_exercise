
function Stack(selectors){
  this.$stack = $(selectors.stack);
  this.$pushBtn = $(selectors.pushBtn);
  this.$stackSize = $(selectors.stackSize);
  this.stackSize = 0;
}

Stack.prototype.init = function(){
  this.bindClickEventOnPushBtn();
  this.bindClickEventOnStackElement(); 
};

Stack.prototype.bindClickEventOnPushBtn = function(){
  var _this = this;

  this.$pushBtn.on('click', function(){
    _this.updateStackSize(true);
    //add div to top
    $('<div>Div no: ' + _this.stackSize + '</div>').prependTo(_this.$stack);
  });
};

Stack.prototype.bindClickEventOnStackElement = function(){
  var _this = this;

  this.$stack.on('click', 'div', function(){
    var $clickedElement = $(this);

    //if last element is on the top(i.e: first in DOM), which is removed
    if(_this.isFirstElement($clickedElement)){
      $clickedElement.remove();
      _this.updateStackSize(false)
    }
    //if not last element then
    else{
      if(!_this.isHighlighted($clickedElement))
        $clickedElement.siblings('div').removeClass('highlight');
    
      $clickedElement.toggleClass('highlight');
    }
  });
};

Stack.prototype.isHighlighted = function($element){
  return $element.hasClass('highlight');
};

Stack.prototype.isFirstElement = function($element){
  return $element.is(this.$stack.children('div').first());
};

Stack.prototype.updateStackSize = function(increaseSize){
  if(increaseSize){
    this.stackSize++;
    this.$stackSize.text('Stack Size: ' + this.stackSize);
  }
  else{
    this.stackSize--;
    this.$stackSize.text('Stack Size: ' + this.stackSize);
  }
};

$(document).ready(function(){
  var divStack = new Stack({ 'pushBtn' : '.push',
                             'stackSize' : '.stack-size',
                             'stack' : '.stack'
                            });
  divStack.init();
});