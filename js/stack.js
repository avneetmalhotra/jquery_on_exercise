
function DivsStack(selectors){
  this.$stack = $(selectors.stack);
  this.$addStackBtn = $(selectors.addStackBtn);
  this.$sizeDiv = $(selectors.stackSizeDiv);
  this.stackSize = 0;
}

DivsStack.prototype.init = function(){
  this.$addStackBtn.on('click', this.pushDiv());
  this.$stack.on('click', 'div', this.divClicked());
};

DivsStack.prototype.pushDiv = function(){
  var _this = this;

  return function(){
    _this.updateStackSize('push');
    //add div to top
    $('<div>Div no: ' + _this.stackSize + '</div>').prependTo(_this.$stack);
  }
};

DivsStack.prototype.divClicked = function(){
  var _this = this;

  return function(){
    var $clickedDiv = $(this);

    //last element is on the top, which is removed
    if($clickedDiv.is(_this.$stack.children('div').first())){
      $clickedDiv.remove();
      _this.updateStackSize('pop')
    }
    else if(!$clickedDiv.hasClass('highlight'))
      $clickedDiv.addClass('highlight').siblings('div').removeClass('highlight');
    else
      $clickedDiv.removeClass('highlight');
  };
};

DivsStack.prototype.updateStackSize = function(action){
  if(action === 'push')
    this.$sizeDiv.text('Stack Size: ' + ++this.stackSize);
  else if(action === 'pop')
    this.$sizeDiv.text('Stack Size: ' + --this.stackSize);
};

$(document).ready(function(){
  var divStack = new DivsStack({ 'addStackBtn' : '.add-stack',
                                 'stackSizeDiv' : '.stack-size',
                                 'stack' : '.stack'
                                });
  divStack.init();
});