function(propertyName, codeConstruct)

    {

        try

        {

            for(var i = 0; i < this.properties.length; i++)

            {

                if(this.properties[i].name == propertyName)

                {

                    ValueTypeHelper.removeFromArrayByIndex(this.properties, i);

                    break;

                }

            }



            for(var i = 0; i < this.enumeratedProperties.length; i++)

            {

                if(this.properties[i].name == propertyName)

                {

                    ValueTypeHelper.removeFromArrayByIndex(this.properties, i);

                    break;

                }

            }

        }

        catch(e) { alert("Error when deleting property - Object:" + e);}

    }