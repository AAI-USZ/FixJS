function() {
          this.table = new cdb.admin.CartoDBTableMetadata({
            name: table_name
          });
          this.columns = this.table.data();
          this.map = new cdb.geo.Map();
        }