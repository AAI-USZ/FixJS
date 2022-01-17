function JavaObject(classInfo){
      this.classInfo = classInfo;
      //There are three basic types of data in the JVM: Objects, primitives, and
      //arrays. I'm an object.
      this.dataType = Data.type.OBJECT;
      
      /**
       * Array of fields.
       * 1st dimension: Classname
       * 2nd dimension: Field name
       * 3rd dimension: value
       *
       * We need to do this since an object may have multiple fields with the
       * same name from different parent classes due to things like private
       * fields.
       *
       * This array is instantiated with default values by
       * Class._populateObjectFields.
       */
      this.fields = [];
      classInfo._populateObjectFields(this);
    }