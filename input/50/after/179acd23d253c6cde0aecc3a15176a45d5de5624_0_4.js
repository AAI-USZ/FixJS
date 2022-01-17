function(matched, $1, $2, offset, source) {
          if ($2 != null) {
            return $2;
          } else {
            return '';
          }
        }