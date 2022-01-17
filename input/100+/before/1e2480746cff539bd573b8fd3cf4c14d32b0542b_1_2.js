function ($timeout) {
    return {
        restrict: 'E',
        transclude: true,
		replace: true,
        scope: { input: '='},
		link: function(scope, $element) {
			scope.show = false;
			scope.$parent.popout = scope;
			
			var pos = scope.input.offset();
			$element.offset({
				left: pos.left,
				top: pos.top + scope.input.innerHeight()
			});
			
			$(document).on('click', function(ev) {
				scope.$apply(function() {
					if (scope.input.get(0) != ev.target && $element.has($(ev.target)).length == 0) {
						scope.show = false;
					}
				});
			});
			
			scope.input.focus(function() {
				scope.$apply(function() {
					scope.show = true;
				});
			}).blur(function(){
				$timeout(function() {
					if (document.activeElement != document.body && $element.has($(document.activeElement)).length == 0) {
						scope.$apply(function() {
							scope.show = false;
						});
					}
				});
			});
			
		},
        template:
            '<div class="popout transitioned" ng-class="{collapsedY: !show}" ng-transclude>' +
            '</div>'
    };
}