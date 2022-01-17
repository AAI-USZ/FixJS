function World(){

	var worldspec = [['farming_fishing AA', 'farming_fishing AA'], ['farming_fishing AB', 'farming_fishing AB']]

	var world = [];

	var worldorigin = [0, 0];
	
	var top = [];

	var offsets = {
    	AA: { x: 0, y: 0 },
    	AB: { x: 0, y: 32 },
    	AC: { x: 0, y: 64 },
    	AD: { x: 0, y: 96 },
    	AE: { x: 0, y: 128 },
    	AF: { x: 0, y: 160 },
    	AG: { x: 0, y: 192 },
    	AH: { x: 0, y: 224 },
    	AI: { x: 0, y: 256 },
    	AJ: { x: 0, y: 288 },
    	AK: { x: 0, y: 320 },
    	AL: { x: 0, y: 352 },
    	AM: { x: 0, y: 384 },
    	AN: { x: 0, y: 416 },
    	AO: { x: 0, y: 448 },
    	AP: { x: 0, y: 480 },
    	AQ: { x: 0, y: 512 },
    	AR: { x: 0, y: 544 },
    	AS: { x: 0, y: 576 },
    	AT: { x: 0, y: 608 },
    	BA: { x: 32, y: 0 },
    	BB: { x: 32, y: 32 },
    	BC: { x: 32, y: 64 },
    	BD: { x: 32, y: 96 },
    	BE: { x: 32, y: 128 },
    	BF: { x: 32, y: 160 },
    	BG: { x: 32, y: 192 },
    	BH: { x: 32, y: 224 },
    	BI: { x: 32, y: 256 },
    	BJ: { x: 32, y: 288 },
    	BK: { x: 32, y: 320 },
    	BL: { x: 32, y: 352 },
    	BM: { x: 32, y: 384 },
    	BN: { x: 32, y: 416 },
    	BO: { x: 32, y: 448 },
    	BP: { x: 32, y: 480 },
    	BQ: { x: 32, y: 512 },
    	BR: { x: 32, y: 544 },
    	BS: { x: 32, y: 576 },
    	BT: { x: 32, y: 608 },
    	CA: { x: 64, y: 0 },
    	CB: { x: 64, y: 32 },
    	CC: { x: 64, y: 64 },
    	CD: { x: 64, y: 96 },
    	CE: { x: 64, y: 128 },
    	CF: { x: 64, y: 160 },
    	CG: { x: 64, y: 192 },
    	CH: { x: 64, y: 224 },
    	CI: { x: 64, y: 256 },
    	CJ: { x: 64, y: 288 },
    	CK: { x: 64, y: 320 },
    	CL: { x: 64, y: 352 },
    	CM: { x: 64, y: 384 },
    	CN: { x: 64, y: 416 },
    	CO: { x: 64, y: 448 },
    	CP: { x: 64, y: 480 },
    	CQ: { x: 64, y: 512 },
    	CR: { x: 64, y: 544 },
    	CS: { x: 64, y: 576 },
    	CT: { x: 64, y: 608 },
    	DA: { x: 96, y: 0 },
    	DB: { x: 96, y: 32 },
    	DC: { x: 96, y: 64 },
    	DD: { x: 96, y: 96 },
    	DE: { x: 96, y: 128 },
    	DF: { x: 96, y: 160 },
    	DG: { x: 96, y: 192 },
    	DH: { x: 96, y: 224 },
    	DI: { x: 96, y: 256 },
    	DJ: { x: 96, y: 288 },
    	DK: { x: 96, y: 320 },
    	DL: { x: 96, y: 352 },
    	DM: { x: 96, y: 384 },
    	DN: { x: 96, y: 416 },
    	DO: { x: 96, y: 448 },
    	DP: { x: 96, y: 480 },
    	DQ: { x: 96, y: 512 },
    	DR: { x: 96, y: 544 },
    	DS: { x: 96, y: 576 },
    	DT: { x: 96, y: 608 },
    	EA: { x: 128, y: 0 },
    	EB: { x: 128, y: 32 },
    	EC: { x: 128, y: 64 },
    	ED: { x: 128, y: 96 },
    	EE: { x: 128, y: 128 },
    	EF: { x: 128, y: 160 },
    	EG: { x: 128, y: 192 },
    	EH: { x: 128, y: 224 },
    	EI: { x: 128, y: 256 },
    	EJ: { x: 128, y: 288 },
    	EK: { x: 128, y: 320 },
    	EL: { x: 128, y: 352 },
    	EM: { x: 128, y: 384 },
    	EN: { x: 128, y: 416 },
    	EO: { x: 128, y: 448 },
    	EP: { x: 128, y: 480 },
    	EQ: { x: 128, y: 512 },
    	ER: { x: 128, y: 544 },
    	ES: { x: 128, y: 576 },
    	ET: { x: 128, y: 608 },
    	FA: { x: 160, y: 0 },
    	FB: { x: 160, y: 32 },
    	FC: { x: 160, y: 64 },
    	FD: { x: 160, y: 96 },
    	FE: { x: 160, y: 128 },
    	FF: { x: 160, y: 160 },
    	FG: { x: 160, y: 192 },
    	FH: { x: 160, y: 224 },
    	FI: { x: 160, y: 256 },
    	FJ: { x: 160, y: 288 },
    	FK: { x: 160, y: 320 },
    	FL: { x: 160, y: 352 },
    	FM: { x: 160, y: 384 },
    	FN: { x: 160, y: 416 },
    	FO: { x: 160, y: 448 },
    	FP: { x: 160, y: 480 },
    	FQ: { x: 160, y: 512 },
    	FR: { x: 160, y: 544 },
    	FS: { x: 160, y: 576 },
    	FT: { x: 160, y: 608 },
    	GA: { x: 192, y: 0 },
    	GB: { x: 192, y: 32 },
    	GC: { x: 192, y: 64 },
    	GD: { x: 192, y: 96 },
    	GE: { x: 192, y: 128 },
    	GF: { x: 192, y: 160 },
    	GG: { x: 192, y: 192 },
    	GH: { x: 192, y: 224 },
    	GI: { x: 192, y: 256 },
    	GJ: { x: 192, y: 288 },
    	GK: { x: 192, y: 320 },
    	GL: { x: 192, y: 352 },
    	GM: { x: 192, y: 384 },
    	GN: { x: 192, y: 416 },
    	GO: { x: 192, y: 448 },
    	GP: { x: 192, y: 480 },
    	GQ: { x: 192, y: 512 },
    	GR: { x: 192, y: 544 },
    	GS: { x: 192, y: 576 },
    	GT: { x: 192, y: 608 },
    	HA: { x: 224, y: 0 },
    	HB: { x: 224, y: 32 },
    	HC: { x: 224, y: 64 },
    	HD: { x: 224, y: 96 },
    	HE: { x: 224, y: 128 },
    	HF: { x: 224, y: 160 },
    	HG: { x: 224, y: 192 },
    	HH: { x: 224, y: 224 },
    	HI: { x: 224, y: 256 },
    	HJ: { x: 224, y: 288 },
    	HK: { x: 224, y: 320 },
    	HL: { x: 224, y: 352 },
    	HM: { x: 224, y: 384 },
    	HN: { x: 224, y: 416 },
    	HO: { x: 224, y: 448 },
    	HP: { x: 224, y: 480 },
    	HQ: { x: 224, y: 512 },
    	HR: { x: 224, y: 544 },
    	HS: { x: 224, y: 576 },
    	HT: { x: 224, y: 608 },
    	IA: { x: 256, y: 0 },
    	IB: { x: 256, y: 32 },
    	IC: { x: 256, y: 64 },
    	ID: { x: 256, y: 96 },
    	IE: { x: 256, y: 128 },
    	IF: { x: 256, y: 160 },
    	IG: { x: 256, y: 192 },
    	IH: { x: 256, y: 224 },
    	II: { x: 256, y: 256 },
    	IJ: { x: 256, y: 288 },
    	IK: { x: 256, y: 320 },
    	IL: { x: 256, y: 352 },
    	IM: { x: 256, y: 384 },
    	IN: { x: 256, y: 416 },
    	IO: { x: 256, y: 448 },
    	IP: { x: 256, y: 480 },
    	IQ: { x: 256, y: 512 },
    	IR: { x: 256, y: 544 },
    	IS: { x: 256, y: 576 },
    	IT: { x: 256, y: 608 },
    	JA: { x: 288, y: 0 },
    	JB: { x: 288, y: 32 },
    	JC: { x: 288, y: 64 },
    	JD: { x: 288, y: 96 },
    	JE: { x: 288, y: 128 },
    	JF: { x: 288, y: 160 },
    	JG: { x: 288, y: 192 },
    	JH: { x: 288, y: 224 },
    	JI: { x: 288, y: 256 },
    	JJ: { x: 288, y: 288 },
    	JK: { x: 288, y: 320 },
    	JL: { x: 288, y: 352 },
    	JM: { x: 288, y: 384 },
    	JN: { x: 288, y: 416 },
    	JO: { x: 288, y: 448 },
    	JP: { x: 288, y: 480 },
    	JQ: { x: 288, y: 512 },
    	JR: { x: 288, y: 544 },
    	JS: { x: 288, y: 576 },
    	JT: { x: 288, y: 608 },
    	KA: { x: 320, y: 0 },
    	KB: { x: 320, y: 32 },
    	KC: { x: 320, y: 64 },
    	KD: { x: 320, y: 96 },
    	KE: { x: 320, y: 128 },
    	KF: { x: 320, y: 160 },
    	KG: { x: 320, y: 192 },
    	KH: { x: 320, y: 224 },
    	KI: { x: 320, y: 256 },
    	KJ: { x: 320, y: 288 },
    	KK: { x: 320, y: 320 },
    	KL: { x: 320, y: 352 },
    	KM: { x: 320, y: 384 },
    	KN: { x: 320, y: 416 },
    	KO: { x: 320, y: 448 },
    	KP: { x: 320, y: 480 },
    	KQ: { x: 320, y: 512 },
    	KR: { x: 320, y: 544 },
    	KS: { x: 320, y: 576 },
    	KT: { x: 320, y: 608 },
    	LA: { x: 352, y: 0 },
    	LB: { x: 352, y: 32 },
    	LC: { x: 352, y: 64 },
    	LD: { x: 352, y: 96 },
    	LE: { x: 352, y: 128 },
    	LF: { x: 352, y: 160 },
    	LG: { x: 352, y: 192 },
    	LH: { x: 352, y: 224 },
    	LI: { x: 352, y: 256 },
    	LJ: { x: 352, y: 288 },
    	LK: { x: 352, y: 320 },
    	LL: { x: 352, y: 352 },
    	LM: { x: 352, y: 384 },
    	LN: { x: 352, y: 416 },
    	LO: { x: 352, y: 448 },
    	LP: { x: 352, y: 480 },
    	LQ: { x: 352, y: 512 },
    	LR: { x: 352, y: 544 },
    	LS: { x: 352, y: 576 },
    	LT: { x: 352, y: 608 },
    	MA: { x: 384, y: 0 },
    	MB: { x: 384, y: 32 },
    	MC: { x: 384, y: 64 },
    	MD: { x: 384, y: 96 },
    	ME: { x: 384, y: 128 },
    	MF: { x: 384, y: 160 },
    	MG: { x: 384, y: 192 },
    	MH: { x: 384, y: 224 },
    	MI: { x: 384, y: 256 },
    	MJ: { x: 384, y: 288 },
    	MK: { x: 384, y: 320 },
    	ML: { x: 384, y: 352 },
    	MM: { x: 384, y: 384 },
    	MN: { x: 384, y: 416 },
    	MO: { x: 384, y: 448 },
    	MP: { x: 384, y: 480 },
    	MQ: { x: 384, y: 512 },
    	MR: { x: 384, y: 544 },
    	MS: { x: 384, y: 576 },
    	MT: { x: 384, y: 608 },
    	NA: { x: 416, y: 0 },
    	NB: { x: 416, y: 32 },
    	NC: { x: 416, y: 64 },
    	ND: { x: 416, y: 96 },
    	NE: { x: 416, y: 128 },
    	NF: { x: 416, y: 160 },
    	NG: { x: 416, y: 192 },
    	NH: { x: 416, y: 224 },
    	NI: { x: 416, y: 256 },
    	NJ: { x: 416, y: 288 },
    	NK: { x: 416, y: 320 },
    	NL: { x: 416, y: 352 },
    	NM: { x: 416, y: 384 },
    	NN: { x: 416, y: 416 },
    	NO: { x: 416, y: 448 },
    	NP: { x: 416, y: 480 },
    	NQ: { x: 416, y: 512 },
    	NR: { x: 416, y: 544 },
    	NS: { x: 416, y: 576 },
    	NT: { x: 416, y: 608 },
    	OA: { x: 448, y: 0 },
    	OB: { x: 448, y: 32 },
    	OC: { x: 448, y: 64 },
    	OD: { x: 448, y: 96 },
    	OE: { x: 448, y: 128 },
    	OF: { x: 448, y: 160 },
    	OG: { x: 448, y: 192 },
    	OH: { x: 448, y: 224 },
    	OI: { x: 448, y: 256 },
    	OJ: { x: 448, y: 288 },
    	OK: { x: 448, y: 320 },
    	OL: { x: 448, y: 352 },
    	OM: { x: 448, y: 384 },
    	ON: { x: 448, y: 416 },
    	OO: { x: 448, y: 448 },
    	OP: { x: 448, y: 480 },
    	OQ: { x: 448, y: 512 },
    	OR: { x: 448, y: 544 },
    	OS: { x: 448, y: 576 },
    	OT: { x: 448, y: 608 },
    	PA: { x: 480, y: 0 },
    	PB: { x: 480, y: 32 },
    	PC: { x: 480, y: 64 },
    	PD: { x: 480, y: 96 },
    	PE: { x: 480, y: 128 },
    	PF: { x: 480, y: 160 },
    	PG: { x: 480, y: 192 },
    	PH: { x: 480, y: 224 },
    	PI: { x: 480, y: 256 },
    	PJ: { x: 480, y: 288 },
    	PK: { x: 480, y: 320 },
    	PL: { x: 480, y: 352 },
    	PM: { x: 480, y: 384 },
    	PN: { x: 480, y: 416 },
    	PO: { x: 480, y: 448 },
    	PP: { x: 480, y: 480 },
    	PQ: { x: 480, y: 512 },
    	PR: { x: 480, y: 544 },
    	PS: { x: 480, y: 576 },
    	PT: { x: 480, y: 608 },
    	QA: { x: 512, y: 0 },
    	QB: { x: 512, y: 32 },
    	QC: { x: 512, y: 64 },
    	QD: { x: 512, y: 96 },
    	QE: { x: 512, y: 128 },
    	QF: { x: 512, y: 160 },
    	QG: { x: 512, y: 192 },
    	QH: { x: 512, y: 224 },
    	QI: { x: 512, y: 256 },
    	QJ: { x: 512, y: 288 },
    	QK: { x: 512, y: 320 },
    	QL: { x: 512, y: 352 },
    	QM: { x: 512, y: 384 },
    	QN: { x: 512, y: 416 },
    	QO: { x: 512, y: 448 },
    	QP: { x: 512, y: 480 },
    	QQ: { x: 512, y: 512 },
    	QR: { x: 512, y: 544 },
    	QS: { x: 512, y: 576 },
    	QT: { x: 512, y: 608 },
    	RA: { x: 544, y: 0 },
    	RB: { x: 544, y: 32 },
    	RC: { x: 544, y: 64 },
    	RD: { x: 544, y: 96 },
    	RE: { x: 544, y: 128 },
    	RF: { x: 544, y: 160 },
    	RG: { x: 544, y: 192 },
    	RH: { x: 544, y: 224 },
    	RI: { x: 544, y: 256 },
    	RJ: { x: 544, y: 288 },
    	RK: { x: 544, y: 320 },
    	RL: { x: 544, y: 352 },
    	RM: { x: 544, y: 384 },
    	RN: { x: 544, y: 416 },
    	RO: { x: 544, y: 448 },
    	RP: { x: 544, y: 480 },
    	RQ: { x: 544, y: 512 },
    	RR: { x: 544, y: 544 },
    	RS: { x: 544, y: 576 },
    	RT: { x: 544, y: 608 },
    	SA: { x: 576, y: 0 },
    	SB: { x: 576, y: 32 },
    	SC: { x: 576, y: 64 },
    	SD: { x: 576, y: 96 },
    	SE: { x: 576, y: 128 },
    	SF: { x: 576, y: 160 },
    	SG: { x: 576, y: 192 },
    	SH: { x: 576, y: 224 },
    	SI: { x: 576, y: 256 },
    	SJ: { x: 576, y: 288 },
    	SK: { x: 576, y: 320 },
    	SL: { x: 576, y: 352 },
    	SM: { x: 576, y: 384 },
    	SN: { x: 576, y: 416 },
    	SO: { x: 576, y: 448 },
    	SP: { x: 576, y: 480 },
    	SQ: { x: 576, y: 512 },
    	SR: { x: 576, y: 544 },
    	SS: { x: 576, y: 576 },
    	ST: { x: 576, y: 608 },
    	TA: { x: 608, y: 0 },
    	TB: { x: 608, y: 32 },
    	TC: { x: 608, y: 64 },
    	TD: { x: 608, y: 96 },
    	TE: { x: 608, y: 128 },
    	TF: { x: 608, y: 160 },
    	TG: { x: 608, y: 192 },
    	TH: { x: 608, y: 224 },
    	TI: { x: 608, y: 256 },
    	TJ: { x: 608, y: 288 },
    	TK: { x: 608, y: 320 },
    	TL: { x: 608, y: 352 },
    	TM: { x: 608, y: 384 },
    	TN: { x: 608, y: 416 },
    	TO: { x: 608, y: 448 },
    	TP: { x: 608, y: 480 },
    	TQ: { x: 608, y: 512 },
    	TR: { x: 608, y: 544 },
    	TS: { x: 608, y: 576 },
    	TT: { x: 608, y: 608 }
	};

	function parseWorld(wspec){
	    world = [];
	    var worldspec = partition(wspec);
		for(var i = 0; i < worldspec.length; i++){
			var row = [];
			world.push(row);
			for(var e = 0; e < worldspec[i].length; e++){
				var location = [];
				row.push(location);
				var spec = worldspec[i][e];
				if (!spec) continue;
				if (isArray(spec)){
					spec.forEach(function(subspec){
						if(subspec !== 'collision'){
							location.push(Tile(subspec,e,i));
						}else{
						    location.collision = true;
					    }
					});
				}else{
					location.push(Tile(spec,e,i));
				}
			}
		}
	};
	window.parseWorld = parseWorld;

    function findCharTile(xOffset, yOffset, findCollision, xANDy){
    	var tile;
    	var cx = characterInfo.x;
    	var cy = characterInfo.y;
    	var tilesX, tilesY;
    	if(!!xANDy){
    		cx = xANDy.x;
    		cy = xANDy.y;
    		tilesY = Math.round((cy - yOffset - characterInfo.y) / 32);
    		tilesX = Math.round((cx - xOffset - characterInfo.x) / 32);
    		tile = world[tilesY][tilesX];
    	}else{
    		tilesY = Math.round((cy - yOffset) / 32);
    		tilesX = Math.round((cx - xOffset) / 32);
    		tile = world[tilesY][tilesX];
    	}
    	if (findCollision) return !tile.collision;
    	return tile;
    }

    function Tile(spec, tx, ty){
     var tile_offset = spec.split(' '),
         tile = terrain[tile_offset[0].toLowerCase()],
         offset = offsets[tile_offset[1]];
     return {
         g:tile,
         sx:offset.x,
         sy:offset.y,
         w:32,
         h:32,
         x: (tx - worldorigin[0]) * 32,
         y: (ty - worldorigin[1]) * 32
     };
    }

    function partition(array){
        // split a long array into an arrary of arrays, where where slices are of length size
        var partitioned = [];
        var size = Math.sqrt(array.length);
        for (var i = 0; i < size; i++){
            partitioned.push(array.slice(i*size, i*size + size));
        }
        return partitioned;
    }
    
    function drawworld(){
    	top = [];
        for(var i = 0; i < world.length; i++){
            for(var e = 0; e < world[i].length; e++){
                for (var t = 0; t < world[i][e].length; t++){
                    var tile = world[i][e][t];
                    if(tile === 'Farming_Fishing AA'){
                    	top.push([i, e, t])
                    }else{
                    	ctx.drawImage(tile.g, tile.sx, tile.sy, tile.w, tile.h, tile.x + WIDTH/2 - characterInfo.x, tile.y + HEIGHT/2 - characterInfo.y, 32, 32);
                    }
                }
            }
        }
    }
    
    function drawworldtop(){
    	
    }
    
    parseWorld(worldspec);
    return {
        world: world, 
        draw: drawworld,
        drawtop: drawworldtop,
        findCharTile: findCharTile
    };
}