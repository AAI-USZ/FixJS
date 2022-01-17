function(combinationsVectorGroups, maxDistance, minSimilarity)

        {

            var potentialCandidates = {};



            //Go through all groups

            for(var i = 0, groupsLength = combinationsVectorGroups.length; i < groupsLength; i++)

            {

                var currentGroup = combinationsVectorGroups[i];



                if(currentGroup == null) { continue; }



                var compareWithGroups = [];



                //compare with the following maxDistance groups ( from here to i+maxDistance)

                var endGroupIndex = i + maxDistance;

                endGroupIndex = endGroupIndex < groupsLength ? endGroupIndex : groupsLength - 1;



                for(var j = i + 1; j <= endGroupIndex; j++)

                {

                    if(combinationsVectorGroups[j] != null)

                    {

                        compareWithGroups.push(combinationsVectorGroups[j]);

                    }

                }



                //For each vector in the current group

                for(var j = 0, currentGroupLength = currentGroup.length; j < currentGroupLength; j++)

                {

                    var combinationsVector = currentGroup[j];



                    //compare with vectors in the current group

                    for(var k = j + 1; k < currentGroupLength; k++)

                    {

                        var compareWithCombinationsVector = currentGroup[k];



                        if(this._haveSameCombinations(combinationsVector, compareWithCombinationsVector)) { continue; }



                        if(combinationsVector.characteristicVector.calculateSimilarity(compareWithCombinationsVector.characteristicVector) >= minSimilarity)

                        {

                            potentialCandidates[Math.min(combinationsVector.characteristicVector.id, compareWithCombinationsVector.characteristicVector.id) + "-" + Math.max(combinationsVector.characteristicVector.id, compareWithCombinationsVector.characteristicVector.id)] = {first:combinationsVector, second:compareWithCombinationsVector};

                            //potentialCandidates.push({first:combinationsVector, second:compareWithCombinationsVector})

                        };

                    }



                    //compare with all vectors in the following groups

                    for(k = 0; k < compareWithGroups.length; k++)

                    {

                        var compareWithGroup = compareWithGroups[k];



                        for(var l = 0, compareGroupLength = compareWithGroup.length; l < compareGroupLength; l++)

                        {

                            var compareWithCombinationsVector = compareWithGroup[l];



                            //How to compare if they are really similar

                            if(combinationsVector.characteristicVector.calculateSimilarity(compareWithCombinationsVector.characteristicVector) >= minSimilarity)

                            {

                                potentialCandidates[Math.min(combinationsVector.characteristicVector.id, compareWithCombinationsVector.characteristicVector.id) + "-" + Math.max(combinationsVector.characteristicVector.id, compareWithCombinationsVector.characteristicVector.id)] = {first:combinationsVector, second:compareWithCombinationsVector};

                                //potentialCandidates.push({first:combinationsVector, second:compareWithCombinationsVector})

                            };

                        }

                    }

                }

            }



            var candidatesArray = [];



            for(var prop in potentialCandidates) { candidatesArray.push(potentialCandidates[prop]);}



            return candidatesArray;



        	/*var differences = [];



        	combinationsVectorGroups.forEach(function(combinationsVectorGroup)

        	{

        		var group = [];

        		

        		combinationsVectorGroup.forEach(function(combinationsVectorItem)

   				{

        			group.push(combinationsVectorItem);

   				});

        		

        		for(i = 0; i < group.length; i++)

        		{

        			if(group[i+1] != null)        				

        			differences.push(VectorDistanceCalculator.calculateHammingDistance(group[i].combinationsVector, group[i+1].combinationsVector));

        		}

        	}); 	

        	return differences;*/

        }