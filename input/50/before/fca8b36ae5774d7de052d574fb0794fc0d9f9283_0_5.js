function getReadingListViewModel(req, callback) {
	var request = req;
	callback({ shared: getSharedViewModel() });
}