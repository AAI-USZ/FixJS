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

                'columnType' : {

                    'type'  : "SelectBox", 

                    'label' : "Column",

                    'value' : 1,

                    'options' : helenos.util.CassandraTypes.columnTypes,

                    "validation" : {

                        "required" : true

                    }

                },

                'comparatorType' : {

                    'type'  : "SelectBox", 

                    'label' : "Comparator",

                    'value' : 1,

                    'options' : helenos.util.CassandraTypes.comparatorTypes,

                    "validation" : {

                        "required" : true

                    }

                },

                'subComparatorType' : {

                    'type'  : "SelectBox", 

                    'label' : "Subcomparator",

                    'value' : 1,

                    'options' : helenos.util.CassandraTypes.comparatorTypes

                }

                ,

                'keyValidationclass' : {

                    'type'  : "SelectBox", 

                    'label' : "Key validation class",

                    'value' : 5,

                    'options' : helenos.util.CassandraTypes.validationClasses,

                    "validation" : {

                        "required" : true

                    }

                },

                'defaultValidationclass' : {

                    'type'  : "SelectBox", 

                    'label' : "Default validation class",

                    'value' : 4,

                    'options' : helenos.util.CassandraTypes.validationClasses,

                    "validation" : {

                        "required" : true

                    }

                },

                'gcGraceSeconds' : {

                    'type'  : "TextField",

                    'label' : "GC grace seconds", 

                    'value' : '86400',

                    "validation" : {

                        "required" : true

                        //,"validator" : qx.util.Validate.number()

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

            dialog.Dialog.form('<h4>Create new column family</h4>', formData, function(result) {

                result['keyspaceName'] = ksName;

                helenos.util.RpcActionsProvider.createColumnFamily(result);

                helenos.util.GuiObserver.refreshSchemaTree();

            });

        }