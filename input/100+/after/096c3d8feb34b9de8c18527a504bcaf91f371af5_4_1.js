function FieldPacket(options) {
  options = options || {};

  this.catalog   = options.catalog;
  this.db        = options.db;
  this.table     = options.table;
  this.orgTable  = options.orgTable;
  this.name      = options.name;
  this.orgName   = options.orgName;
  this.filler1   = undefined;
  this.charsetNr = options.charsetNr;
  this.length    = options.length;
  this.type      = options.type;
  this.flags     = options.flags;
  this.decimals  = options.decimals;
  this.filler2   = undefined;
  this.default   = options.default;
}