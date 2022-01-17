function(error, response) {
            if (!error) {
              var role = response.body;
              var configurationSets = role.ConfigurationSets;
              var k = 0;
              // Locate the NetworkConfiguration Set
              for (; k < configurationSets.length; k++) {
                if (configurationSets[k].ConfigurationSetType === 'NetworkConfiguration') {
                  break;
                }
              }

              if (!configurationSets[k].InputEndpoints) {
                configurationSets[k].InputEndpoints = [];
              }
              
              var endpointCount = configurationSets[k].InputEndpoints.length;
              var m = 0;
              var message = null;
              // Check for the existance of endpoint
              for (; m < endpointCount; m++) {
                var lbPortAsInt = parseInt(configurationSets[k].InputEndpoints[m].Port, 10);
                if (lbPortAsInt === options.lbport) {
                  message = 'The port ' + options.lbport + ' of load-balancer is already mapped to port ' +
                    configurationSets[k].InputEndpoints[m].LocalPort + ' of VM';
                  break;
                }

                var vmPortAsInt = parseInt(configurationSets[k].InputEndpoints[m].LocalPort, 10);
                if (vmPortAsInt === options.vmport) {
                  message = 'The port ' + options.vmport + ' of VM is already mapped to port ' +
                    configurationSets[k].InputEndpoints[m].Port + ' of loade-balancer';
                  break;
                }
              }

              if (m !== endpointCount) {
                if (options.create) {
                  progress.end();
                  cmdCallback(message);
                } else {
                  configurationSets[k].InputEndpoints.splice(m, 1);
                }
              } else {
                if (options.create) {
                  var inputEndPoint = {
                    Name: options.endpointName || 'endpname-' + options.lbport + '-' + options.vmport,
                    Protocol: 'tcp',
                    Port: options.lbport,
                    LocalPort: options.vmport
                  };
                  configurationSets[k].InputEndpoints.push(inputEndPoint);
                } else {
                  progress.end();
                  cmdCallback('Endpoint not found in the network configuration');
                }
              }

              progress.end();
              var vmRole = {
                ConfigurationSets: configurationSets
              };

              progress = cli.progress('Updating network configuration');
              utils.doServiceManagementOperation(channel, 'modifyRole', found.svc, found.deploy.Name,
                  options.name, vmRole, function(error, response) {
                progress.end();
                cmdCallback(error);
              });
            } else {
              progress.end();
              cmdCallback(error);
            }
          }