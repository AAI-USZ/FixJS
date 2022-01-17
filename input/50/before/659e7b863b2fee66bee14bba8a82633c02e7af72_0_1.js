function(){
          return "SELECT cartodb_id AS id, title, title_color, title_subs, table_name, source, category_name, external, zmin, zmax, ST_XMAX(the_geom) AS xmax, \
          ST_XMIN(the_geom) AS xmin, ST_YMAX(the_geom) AS ymax, ST_YMIN(the_geom) AS ymin, tileurl, true AS visible \
          FROM " + layerTable + " \
          WHERE display = TRUE ORDER BY displaylayer,title ASC";
        }