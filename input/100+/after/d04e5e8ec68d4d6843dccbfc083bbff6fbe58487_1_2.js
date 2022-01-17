function() {
      /*
       * ASSERTION # ta-FAFYMEGELU
       * In Step 9, a user agent MUST apply the algorithm to locate the default
       * icons.
       * 1. For each file name in the default icons table (from top to bottom)
       *    that has a media type that is supported by the user agent:
       *    A. Let potential-icon be the result of applying the rule for finding
       *       a file within a widget package to file name.
       *    B. If the potential-icon is a processable file, determined by the
       *       media type given in the media type column of the default icons
       *       table, and the potential-icon does not already exist in the icons
       *       list of the table of configuration defaults, then append the
       *       value of potential-icon to the icons list of the table of
       *       configuration defaults.
       *    C. Move onto the next file name in the default icons table.
       */
      var widgetConfig = processingResult.widgetConfig;
      var icons = []; //Ivan: Should the default icon be copied over into icons?
      var configIcons = widgetConfig.icons || [];
      if(configIcons) {
        for(var i in configIcons){
          icons[configIcons[i].path] = configIcons[i];
        }
      }

      if(ManagerUtils.isEmpty(icons)) {
        for (var i in ICON_NAMES) {
          var potential = ICON_NAMES[i];
          if(isSupportedIconType(getFileType(that.res, potential))
              && !(potential in icons)
              && processingResult.localisedFileMapping.contains(potential)) {
            Logger.logAction(Logger.LOG_MINOR, "ta-FAFYMEGELU", "adding icon from default icons table " + potential);
            var potentialIcon = new Icon(potential);
            icons[potential] = potentialIcon;
            configIcons.push(potentialIcon);
          }
        }
      }

      /* select prefIcon */
      var targetDimension = config.iconSize;
      if(!targetDimension) {
        /* choose the first listed compatible icon */
        if(configIcons.length)
          widgetConfig.prefIcon = configIcons[0];
      } else {
        /* choose the most appropriately sized icon */
        var undersizePreference,
            oversizePreference,
            undersizeVariance = 0,
            oversizeVariance = 0;

        for(var candidate in icons) {
          var oversize =
              (targetDimension.width > 0 && candidate.width > targetDimension.width)
              || (targetDimension.height > 0 && candidate.height > targetDimension.height);
          var variance = 0;
          if(targetDimension.width > 0 && candidate.width > 0) variance += Math.abs(targetDimension.width - candidate.width);
          if(targetDimension.height > 0 && candidate.height > 0) variance += Math.abs(targetDimension.height - candidate.height);
          if(oversize) {
            if(variance < oversizeVariance || !oversizeVariance) {
              oversizePreference = candidate;
              oversizeVariance = variance;
            }
          } else {
            if(variance < undersizeVariance || !undersizeVariance) {
              undersizePreference = candidate;
              undersizeVariance = variance;
            }
          }
        }
        /* choose an undersize icon in preference to an oversize one */
        if(undersizePreference) widgetConfig.prefIcon = undersizePreference;
        else if (oversizePreference) widgetConfig.prefIcon = oversizePreference;
      }
      finishProcess();
    }