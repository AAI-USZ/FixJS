function OnEnterMenuState()
{
	//TODO
	initMenu();
	backgroundMusic = SoundJS.play( "backgroundmusic" , SoundJS.INTERRUPT_ANY, 0, 0, -1, 0.5 );
}