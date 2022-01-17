function(q,parent,parentList,data) {
        this.type = ko.observable('information');
        this.prompt = Editor.contentObservable('');
        this.parent = parent;

        this.marks = ko.observable(0);

        this.steps = ko.observableArray([]);
        this.stepsPenalty = ko.observable(0);

        this.jme = {
            answer: ko.observable(''),
            answerSimplification: ko.observable(''),
            checkingTypes: [
                {name:'absdiff',niceName:'Absolute difference', accuracy: ko.observable(0.001)},
                {name:'reldiff',niceName:'Relative difference', accuracy: ko.observable(0.001)},
                {name:'dp',niceName:'Decimal points', accuracy: ko.observable(3)},
                {name:'sigfig',niceName:'Significant figures', accuracy: ko.observable(3)}
            ],
            failureRate: ko.observable(1),
            vset: {
                points: ko.observable(5),
                start: ko.observable(0),
                end: ko.observable(1)
            },
            maxlength: {
                length: ko.observable(0),
                partialCredit: ko.observable(0),
                message: Editor.contentObservable(''),
            },
            minlength: {
                length: ko.observable(0),
                partialCredit: ko.observable(0),
                message: Editor.contentObservable(''),
            },
            musthave: {
                strings: ko.observableArray([]),
                showStrings: ko.observable(false),
                partialCredit: ko.observable(0),
                message: Editor.contentObservable('')
            },
            notallowed: {
                strings: ko.observableArray([]),
                showStrings: ko.observable(false),
                partialCredit: ko.observable(0),
                message: Editor.contentObservable('')
            },
        };
        this.jme.checkingType = ko.observable(this.jme.checkingTypes[0]);

        this.numberentry = {
            minValue: ko.observable(''),
			maxValue: ko.observable(''),
            integerAnswer:ko.observable(false),
            partialCredit:ko.observable(0)
        };

        this.patternmatch = {
            answer: ko.observable(''),
            displayAnswer: Editor.contentObservable(''),
            caseSensitive: ko.observable(false),
            partialCredit: ko.observable(0)
        };

        this.multiplechoice = {
            minMarks: ko.observable(0),
            maxMarks: ko.observable(0),
            minAnswers: ko.observable(0),
            maxAnswers: ko.observable(0),
            shuffleChoices: ko.observable(false),
            shuffleAnswers: ko.observable(false),
            displayColumns: ko.observable(0),
            displayType:ko.observable(''),

            displayTypes: {
                m_n_x: [
                    {name: 'radiogroup', niceName: 'One from each row'},
                    {name: 'checkbox', niceName: 'Checkboxes'},
                ],
                'm_n_2': [
                    {name: 'checkbox', niceName: 'Checkboxes'},
                    {name:'dropdown', niceName: 'Drop-down box'}
                ],
                '1_n_2': [
                    {name:'radiogroup', niceName: 'Radio boxes'},
                    {name:'dropdown', niceName: 'Drop-down box'}
                ]
            },

            choices: ko.observableArray([]),
            answers: ko.observableArray([])
        }

        this.gapfill = {
            gaps: ko.observableArray([])
        };

        this.remove = function() {
            if(confirm("Remove this part?"))
            {
                if(parentList)
                    parentList.remove(this);
                else
                    q.removePart(this);
            }
        };

        if(data)
            this.load(data);
    }