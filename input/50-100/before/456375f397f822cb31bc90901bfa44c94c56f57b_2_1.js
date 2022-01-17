function(model, type, isDynamic)

    {

        this.model = model;

        this.type = type;

        this.isDynamic = !!isDynamic;



        this.structuralDependencies = [];

        this.dataDependencies = [];

        this.controlDependencies = [];



        this.model.graphNode = this;

        this.idString = this.generateId();



        this.idNum = Node._LAST_ID++;

    }