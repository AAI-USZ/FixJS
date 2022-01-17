function() {
    var lambda = function() {
        return function(argument) {
            return 'altered ' + argument;
        }
    }
    var partial = '{{$section1}}{{#lambda}}parent1{{/lambda}}{{/section1}} - {{$section2}}{{#lambda}}parent2{{/lambda}}{{/section2}}';
    var text = '{{< partial}}{{$section1}}{{#lambda}}child1{{/lambda}}{{/section1}}{{/ partial}}'
    var template = Hogan.compile(text);

    var result = template.render({lambda: lambda}, {partial: Hogan.compile(partial)});
    is(result, 'altered child1 - altered parent2', 'Lambda replacement failed with template inheritance');
}