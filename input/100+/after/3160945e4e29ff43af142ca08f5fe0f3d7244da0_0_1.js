function ViewStack(element) {
  if (!element) return;
  
  var $element = this.$element = $(element);
  element = this.element = $element[0];
  
  var viewStack = element.viewStack;
  if (viewStack) return viewStack;
  
  element.viewStack = this;
  
  var views = this.views = [];
  
  var $rootViewElement = $element.children('.pp-view, .pp-split-view').first().addClass('active');
  var rootViewElement = $rootViewElement[0];
  
  if (!rootViewElement) return;
  
  var rootView = this.rootView = rootViewElement.view || new Pushpop.View($rootViewElement.addClass('root'));
  views.push(rootView);
}