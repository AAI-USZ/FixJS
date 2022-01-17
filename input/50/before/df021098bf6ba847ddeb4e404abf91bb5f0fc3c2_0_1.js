function(data){
	temp_voxel_sprite = loadVOBJ(data).sprite;
	_draw_interval = setInterval(drawFrame,100);
    }