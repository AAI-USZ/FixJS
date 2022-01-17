function Puzzle(id, game, sound, pos, positions) {
  console.log(id)
  this.pos = pos;
  this.positions = positions;
  this.num_pieces = positions.length;
  this.remaining_time = this.num_pieces*30;
  this.time_to_complete = this.remaining_time;
  this.items_to_load = this.num_pieces*2+1;
  this.loaded_items = 0;
  this.id = id;
  this.game = game;
  this.pieces = new Array();
  this.holders = new Array();
  this.position = null;
  if(sound){
    this.has_voice = sound.has_voice;
    this.has_sound = sound.has_sound;
  }
  this.loadAssets();
}