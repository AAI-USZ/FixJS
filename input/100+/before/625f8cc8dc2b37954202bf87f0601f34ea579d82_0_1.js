function(e) {

            var ksName = e.getTarget().getUserData('KSNAME');

            var formData = {

                'name' : {

                    'type'  : "TextField",

                    'label' : "Name", 

                    'value' : "",

                    "validation" : {

                        "required" : true

                    }

                },

                'column' : {

                    'type'  : "SelectBox", 

                    'label' : "Column",

                    'value' : 1,

                    'options' : helenos.util.CassandraTypes.columnTypes,

                    "validation" : {

                        "required" : true

                    }

                },

                'comparator' : {

                    'type'  : "SelectBox", 

                    'label' : "Comparator",

                    'value' : 1,

                    'options' : helenos.util.CassandraTypes.comparatorTypes,

                    "validation" : {

                        "required" : true

                    }

                },

                'subComparator' : {

                    'type'  : "SelectBox", 

                    'label' : "Subcomparator",

                    'value' : 1,

                    'options' : helenos.util.CassandraTypes.comparatorTypes,

                    "validation" : {

                        "required" : true

                    }

                }

                ,

                'keyValidationclass' : {

                    'type'  : "SelectBox", 

                    'label' : "Key validation class",

                    'value' : 1,

                    'options' : helenos.util.CassandraTypes.validationClasses,

                    "validation" : {

                        "required" : true

                    }

                },

                'defaultValidationclass' : {

                    'type'  : "SelectBox", 

                    'label' : "Default validation class",

                    'value' : 1,

                    'options' : helenos.util.CassandraTypes.validationClasses,

                    "validation" : {

                        "required" : true

                    }

                },

                'comment' :

                {

                    'type'  : "TextArea",

                    'label' : "Comment",

                    'lines' : 4,

                    'value' : ""

                }

            };

            dialog.Dialog.form('<b>Create new column family</b>', formData, function(result) {

                

                });

        }