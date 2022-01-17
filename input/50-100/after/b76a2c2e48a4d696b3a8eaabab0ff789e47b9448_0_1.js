function() {
	var baseUrl = $('body').data('common-template-url');
	return {
        restrict: 'E', // can only be used as an element
        transclude: false, // the element should not contain any content so there's no need to transclude
        scope: {
			level: '@level',
			text: '@text'
        },
        templateUrl: baseUrl + '/alert.html',
        replace: true
    }
}