function() {
    if (options.rsps.length === 0 && options.errs.length > 0) {
      cmdCallback(options.errs[0]);
    } else if (options.rsps.length > 0) {
      var found = null;
      var foundDisks = null;

      for (var i = 0; i < options.rsps.length; i++) {
        var roles = options.rsps[i].deploy.RoleList;
        if (roles) {
          for (var j = 0; j < roles.length; j++) {
            if (roles[j].RoleType === 'PersistentVMRole' &&
                roles[j].RoleName.toLowerCase() === options.name) {
              if (found) {
                // found duplicates
                progress.end();
                cmdCallback('VM name is not unique');
              }
              found = options.rsps[i];
              foundDisks = [roles[j].OSVirtualHardDisk].concat(roles[j].DataVirtualHardDisks);
            }
          }
        }
      }

      // got unique role under a deployment and service, list the disks
      if (found) {
        var osDiskName = foundDisks[0].DiskName;
        logger.verbose('Getting info for OS disk ' + osDiskName);
        utils.doServiceManagementOperation(channel, 'getDisk', osDiskName, function(error, response) {
          progress.end();
          foundDisks[0].LogicalDiskSizeInGB = 
            error ? 'Error' : response.body.LogicalDiskSizeInGB;
          logger.table(foundDisks, function (row, item) {
            row.cell('Lun', (item === foundDisks[0]) ? '' : (item.Lun || 0));
            row.cell('Size(GB)', item.LogicalDiskSizeInGB);
            var mediaLink = item.MediaLink.split('/');
            row.cell('Blob-Name', mediaLink[mediaLink.length - 1]);
          });
          cmdCallback(error);
        });
      } else {
        progress.end();
        cmdCallback('VM ' + options.name + ' not found');
      }
    } else {
      progress.end();
      cmdCallback('VM ' + options.name + ' not found');
    }
  }