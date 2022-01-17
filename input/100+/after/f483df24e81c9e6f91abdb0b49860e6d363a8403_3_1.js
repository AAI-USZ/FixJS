function(propertyName, propertyValue, codeConstruct, isEnumerable)

    {

        try

        {

            if(propertyName == "__proto__") { this.setProto(propertyValue, codeConstruct); return; }



            var existingProperty = this.getOwnProperty(propertyName);



            if(existingProperty == null)

            {

                var property = new fcModel.Identifier(propertyName, propertyValue, codeConstruct, this.globalObject);



                this.properties.push(property);



                if(isEnumerable) { this.enumeratedProperties.push(property); }

            }

            else

            {

                existingProperty.setValue(propertyValue, codeConstruct);

            }



            if(propertyName == "prototype" && propertyValue != null && codeConstruct != null)

            {

                this.prototypeDefinitionConstruct = { codeConstruct: codeConstruct, evaluationPositionId: this.globalObject.getPreciseEvaluationPositionId()};

            }



            if(codeConstruct != null)

            {

                this.addModification(codeConstruct, this.globalObject.getPreciseEvaluationPositionId());

            }

        }

        catch(e)

        {

            alert("Error when adding property - Object:" + e);

        }

    }