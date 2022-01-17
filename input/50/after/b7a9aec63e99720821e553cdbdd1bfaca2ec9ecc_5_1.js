function GetURL(path) {

	/// <summary>

	/// Gets chrome extension URL of given path

	/// </summary>

	/// <param name="path">Path of URL</param>

	/// <returns>String URL to given path</returns>



	return chrome.extension.getURL(path);

}