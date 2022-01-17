function(data){
	temp_voxel_sprite = new VoxelSprite({'0,0,0':[1,0,0]});
	//temp_voxel_sprite = loadVOBJ(data).sprite;
	_draw_interval = setInterval(drawFrame,100);
    }