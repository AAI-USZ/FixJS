function()

{

	this.player.update();

	

	// 3d look-at vector

	this.n3d = {

		x: -this.player.rotTrig.cosx*this.player.rotTrig.siny,

		y: this.player.rotTrig.sinx,

		z: this.player.rotTrig.cosy*this.player.rotTrig.cosx

	};

	

	// 2d look-at vector (XZ plane)

	this.n2d = {

		x: -this.player.rotTrig.siny,

		z: this.player.rotTrig.cosy

	};

	

	this.camera = {

		x: this.player.position.x,

		y: this.player.position.y+this.player.height,

		z: this.player.position.z

	}

	

	this.chunkCount = 0;

	this.nodeCount = 0;

	this.faceCount = 0;

	this.vertexCount = 0;

	

	// reset vertices

	this.vertex = {};

	

	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

	

	this.getFrustrumPlanes();

	

	// empty renderable node array from last render and low resolution chunks

	this.renderNodes = [];

	this.lowResChunks = [];

	

	// relative chunk position

	var rcp, distance;

	for(var i in this.world.chunks)

	{

		rcp = {

			x: this.world.chunks[i].x*16+8-this.camera.x,

			z: this.world.chunks[i].z*16+8-this.camera.z

		};

		

		// chunk is behind player (bounding cylinder radius: sqrt(8^2) = 11.31+margin = 13)

		if(this.n2d.x*rcp.x+this.n2d.z*rcp.z < -13)

		{

			continue;

		}

		

		// chunk too far

		distance = rcp.x*rcp.x+rcp.z*rcp.z;

		if(distance > this.chunkRenderDist)

		{

			this.lowResChunks.push({

				chunk: this.world.chunks[i],

				distance: distance

			});

			continue;

		}

		

		// get renderable nodes from each chunk inside this.renderNodes

		this.getChunkNodes(this.world.chunks[i]);

	}

	

	// render low resolution chunks according to their distance to player

	this.lowResChunks.sort(function(a, b)

	{

		return b.distance-a.distance;

	});

	

	// first fog layer from furthest nodes

	var fogDistance = 50;

	for(var i in this.lowResChunks)

	{

		this.renderLowResChunk(this.lowResChunks[i].chunk);

		fogDistance = this.fogLayer(fogDistance, this.lowResChunks[i].distance);

	}

	

	// render nodes according to their distance to player

	this.renderNodes.sort(function(a, b)

	{

		return b.distance-a.distance;

	});

	

	for(var i in this.renderNodes)

	{

		this.renderNode(this.renderNodes[i].node);

		fogDistance = this.fogLayer(fogDistance, this.renderNodes[i].distance);

	}

	

	// mouse interface

	if(this.mouseClick)

	{

		// left click = add new node

		if(this.clickedNode && this.mouseClick.button == 0)

		{

			var selectedType = document.getElementById("type").value;

			

			var newNode = {x: this.clickedNode.x, y: this.clickedNode.y, z: this.clickedNode.z};

				

			switch(this.clickedFace)

			{

				case FACE.FRONT:  newNode.z++; break;

				case FACE.BACK:   newNode.z--; break;

				case FACE.RIGHT:  newNode.x++; break;

				case FACE.LEFT:   newNode.x--; break;

				case FACE.TOP:    newNode.y++; break;

				case FACE.BOTTOM: newNode.y--; break;

			}

			

			if(!this.player.nodeCollision(newNode))

			{

				// get node type from DOM

				this.world.addNode(newNode.x, newNode.y, newNode.z, selectedType);

			}

		}

		// right click = remove node

		else if(this.clickedNode && this.mouseClick.button == 2)

		{

			this.world.removeNode(this.clickedNode);

		}

		this.clickedNode = false;

		this.clickedFace = false;

		this.mouseClick = false;

	}

	

	if(this.hud)

	{		

		this.displayHud();

	}

	

	if(this.graph)

	{

		this.displayPerformanceGraph();

	}

	

	if(this.map)

	{

		this.displayHeightMap();

	}

	

	// frames per second counter

	if(new Date().getTime()-this.time >= 1000)

	{

		this.fps = this.frames;

		this.frames = 0;

		this.time = new Date().getTime();

	}

	this.frames++;

	

	window.requestFrame(this.render.bind(this));

}