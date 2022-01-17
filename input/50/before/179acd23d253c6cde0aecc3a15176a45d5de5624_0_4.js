function(matched, $1, $2, offset, source) {
          if ($1 != null) {
            return $1;
          } else {
            return "";
          }
        }