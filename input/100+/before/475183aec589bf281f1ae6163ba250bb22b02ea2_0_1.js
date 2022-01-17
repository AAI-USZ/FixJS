function () {
		var precedence = [
			[
				[ "new",        _NewExpressionEmitter._setOperatorPrecedence ],
				[ "[",          _ArrayExpressionEmitter._setOperatorPrecedence ],
				[ ".",          _PropertyExpressionEmitter._setOperatorPrecedence ],
				[ "(",          _CallExpressionEmitter._setOperatorPrecedence ],
				[ "super",      _SuperExpressionEmitter._setOperatorPrecedence ],
				[ "function",   _FunctionExpressionEmitter._setOperatorPrecedence ],
			], [
				[ "++",         _PostfixExpressionEmitter._setOperatorPrecedence ],
				[ "--",         _PostfixExpressionEmitter._setOperatorPrecedence ]
			], [
				// delete is not used by JSX
				[ "void",       _UnaryExpressionEmitter._setOperatorPrecedence ],
				[ "typeof",     _UnaryExpressionEmitter._setOperatorPrecedence ],
				[ "++",         _UnaryExpressionEmitter._setOperatorPrecedence ],
				[ "--",         _UnaryExpressionEmitter._setOperatorPrecedence ],
				[ "+",          _UnaryExpressionEmitter._setOperatorPrecedence ],
				[ "-",          _UnaryExpressionEmitter._setOperatorPrecedence ],
				[ "~",          _UnaryExpressionEmitter._setOperatorPrecedence ],
				[ "!",          _UnaryExpressionEmitter._setOperatorPrecedence ]
			], [
				[ "*",          _BinaryNumberExpressionEmitter._setOperatorPrecedence ],
				[ "/",          _BinaryNumberExpressionEmitter._setOperatorPrecedence ],
				[ "%",          _BinaryNumberExpressionEmitter._setOperatorPrecedence ]
			], [
				[ "+",          _BinaryNumberExpressionEmitter._setOperatorPrecedence ],
				[ "-",          _BinaryNumberExpressionEmitter._setOperatorPrecedence ]
			], [
				[ "<<",         _ShiftExpressionEmitter._setOperatorPrecedence ],
				[ ">>",         _ShiftExpressionEmitter._setOperatorPrecedence ],
				[ ">>>",        _ShiftExpressionEmitter._setOperatorPrecedence ],
			], [
				[ "<",          _BinaryNumberExpressionEmitter._setOperatorPrecedence ],
				[ ">",          _BinaryNumberExpressionEmitter._setOperatorPrecedence ],
				[ "<=",         _BinaryNumberExpressionEmitter._setOperatorPrecedence ],
				[ ">=",         _BinaryNumberExpressionEmitter._setOperatorPrecedence ],
				[ "instanceof", _InstanceofExpressionEmitter._setOperatorPrecedence ],
				[ "in",         _InExpressionEmitter._setOperatorPrecedence ]
			], [
				[ "==",         _EqualityExpressionEmitter._setOperatorPrecedence ],
				[ "!=",         _EqualityExpressionEmitter._setOperatorPrecedence ]
			], [
				[ "&",          _BinaryNumberExpressionEmitter._setOperatorPrecedence ]
			], [
				[ "^",          _BinaryNumberExpressionEmitter._setOperatorPrecedence ]
			], [
				[ "|",          _BinaryNumberExpressionEmitter._setOperatorPrecedence ]
			], [
				[ "&&",         _LogicalExpressionEmitter._setOperatorPrecedence ]
			], [
				[ "||",         _LogicalExpressionEmitter._setOperatorPrecedence ]
			], [
				[ "=",          _AssignmentExpressionEmitter._setOperatorPrecedence ],
				[ "*=",         _AssignmentExpressionEmitter._setOperatorPrecedence ],
				[ "/=",         _AssignmentExpressionEmitter._setOperatorPrecedence ],
				[ "%=",         _AssignmentExpressionEmitter._setOperatorPrecedence ],
				[ "+=",         _AssignmentExpressionEmitter._setOperatorPrecedence ],
				[ "-=",         _AssignmentExpressionEmitter._setOperatorPrecedence ],
				[ "<<=",        _AssignmentExpressionEmitter._setOperatorPrecedence ],
				[ ">>=",        _AssignmentExpressionEmitter._setOperatorPrecedence ],
				[ ">>>=",       _AssignmentExpressionEmitter._setOperatorPrecedence ],
				[ "&=",         _AssignmentExpressionEmitter._setOperatorPrecedence ],
				[ "^=",         _AssignmentExpressionEmitter._setOperatorPrecedence ],
				[ "|=",         _AssignmentExpressionEmitter._setOperatorPrecedence ]
			], [
				[ "?",          _ConditionalExpressionEmitter._setOperatorPrecedence ]
			], [
				[ ",",          _CommaExpressionEmitter._setOperatorPrecedence ]
			]
		];
		for (var i = 0; i < precedence.length; ++i) {
			var opTypeList = precedence[i];
			for (var j = 0; j < opTypeList.length; ++j)
				opTypeList[j][1](opTypeList[j][0], -(precedence.length - i));
		}
	}