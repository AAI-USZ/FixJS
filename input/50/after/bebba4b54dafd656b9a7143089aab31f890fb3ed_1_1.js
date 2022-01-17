function() {
          this.table = new cdb.admin.CartoDBTableMetadata({
            id: table_id
          });
          this.columns = this.table.data();
          this.map = new cdb.geo.Map();
        }