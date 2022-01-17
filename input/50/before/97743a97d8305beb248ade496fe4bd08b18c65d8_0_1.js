function _renderFrame() {
			_activeUpdateFrame();
			// we already checked it was supported earlier
			// so no need to do it again here
			window.requestAnimFrame(_renderFrame);
		}