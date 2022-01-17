function (level) {
	var self = this;

	self.processing = null;
	self.level = level;

	//
	// Private!
	//

	// Set to null if not debug
	self.__debug = {
		infoPoints: /*/false/*/true/**/,
		frameRate: /*/false/*/true/**/,
		extendRender: /*/false/*/true/**/,
		walkState: /*/false/*/true/**/,
		overlayState: /*/false/*/false/**/
	};
	//self.__debug = null;

	self.__now = 0; // Updated on every draw so all update functions are in sync

	self.__screen = { width: 400, height: 400 };

	self.__map = null;
	self.__state = null; // Used to keep state between iterations
	self.__stateMap = null; // Used for debug draw
	self.__goal = null;
	self.__start = null;

	self.__isTraversing = false;
}