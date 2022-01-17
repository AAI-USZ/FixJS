function()
{
	if (streamButton.title == 'Stop Stream')
	{
		progressLabel.text = 'Stopped';
		streamer.stop();
		pauseButton.enabled = false;
		streamSize1.enabled = true;
		streamSize2.enabled = true;
		streamSize3.enabled = true;
		pauseButton.title = 'Pause Streaming';
		streamButton.title = "Start Streaming";
	}
	else
	{
		progressLabel.text = 'Starting ...';
		streamer.url = url.value;
		streamer.start();
		pauseButton.enabled = true;
		streamSize1.enabled = false;
		streamSize2.enabled = false;
		streamSize3.enabled = false;

		pauseButton.title = 'Pause Streaming';
		streamButton.title = "Stop Stream";
	}
}