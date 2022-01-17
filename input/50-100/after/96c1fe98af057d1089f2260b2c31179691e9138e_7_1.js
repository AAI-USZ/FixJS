function _handleRunUnitTests() {
        if (_testWindow) {
            try {
                _testWindow.location.reload();
            } catch (e) {
                _testWindow = null;  // the window was probably closed
            }
        }

        if (!_testWindow) {
            _testWindow = window.open("../test/SpecRunner.html", "brackets-test", "width=" + $(window).width() + ",height=" + $(window).height());
            _testWindow.location.reload(); // if it was opened before, we need to reload because it will be cached
        }
    }