function(codeConstruct)

    {

        try

        {

            var properties = this.properties;



            for(var i = 0, length = properties.length; i < length; i++)

            {

                var property = properties[i];



                this.globalObject.browser.callDataDependencyEstablishedCallbacks

                (

                    codeConstruct,

                    property.lastModificationConstruct.codeConstruct,

                    this.globalObject.getPreciseEvaluationPositionId(),

                    property.lastModificationConstruct.evaluationPositionId

                );

            }

        }

        catch(e) { alert("Array - Error when registering getPropertyCallback: " + e + " " + codeConstruct.loc.source); }

    }