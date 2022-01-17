function() {
      progress.end();
      if (options.rsps.length === 0 && options.errs.length > 0) {
        cmdCallback(options.errs[0]);
      } else if (options.rsps.length > 0) {
        var vms = [];
        for (var i = 0; i < options.rsps.length; i++) {
          var roles = options.rsps[i].deploy.RoleList;
          if (roles) {
            for (var j = 0; j < roles.length; j++) {
              if (roles[j].RoleType === 'PersistentVMRole') {
                vms.push(createPrettyVMView(roles[j], options.rsps[i].deploy));
              }
            }
          }
        }
        
        if (vms.length > 0) {
          logger.table(vms, function(row, item) {
            row.cell('DNS Name', item.DNSName);
            row.cell('VM Name', item.VMName);
            row.cell('Status', item.InstanceStatus);
          });
        } else {
          if (logger.format().json) {
            logger.json([]);
          } else {
            logger.info('No VMs found');
          }
        }
        
        cmdCallback();
      } else {
        logger.info('No VMs found');
        cmdCallback();
      }
    }