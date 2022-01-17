function(maxIndex, destinationConstraint)

    {

        var selectedDependencies = [];



        var dependencies = this.dataDependencies;



        for(var i = dependencies.length - 1; i >= 0; i--)

        {

            var dependency = dependencies[i];



            if(dependency.isReturnDependency && dependency.callDependencyMaxIndex <= maxIndex)

            {

                selectedDependencies.push(dependency);

            }



            if(dependency.index > maxIndex) { continue; }

            if(!this.canFollowDependency(dependency, destinationConstraint)) { continue; }



            selectedDependencies.push(dependency);



            for(var j = dependencies.length - 1; j >= 0; j--)

            {

                if(i == j) { continue; }



                var jThDependency = dependencies[j];



                if((dependency.dependencyCreationInfo.groupId.indexOf(jThDependency.dependencyCreationInfo.groupId) == 0)

                && this.canFollowDependency(jThDependency, destinationConstraint))

                {

                    selectedDependencies.push(jThDependency);

                }

            }



            containsInterestingDependencies(selectedDependencies);



            return selectedDependencies;

        }



        containsInterestingDependencies(selectedDependencies)



        return selectedDependencies;

    }