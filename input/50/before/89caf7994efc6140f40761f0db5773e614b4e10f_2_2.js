function()
{
	var enemy = dd.enemy;
	enemy.type = 'slime';
	dd.enemies[0] = enemy;
	
	// prep level json
	dd.levelMap = dd.levelLoadMap('level1');
		
	dd.spriteGridClear();
}