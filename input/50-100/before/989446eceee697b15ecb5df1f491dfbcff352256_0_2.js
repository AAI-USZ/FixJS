function(expr) {
        try {
          flagPhase(this, '$apply');
          return this.$eval(expr);
        } catch (e) {
          $exceptionHandler(e);
        } finally {
          this.$root.$$phase = null;
          this.$root.$digest();
        }
      }