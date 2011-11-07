
var ResultSet = require('../resultset.js');

function Validator(options) {
	this.validators = options.validators;
}

Validator.prototype.validate = function(input, result) {
	var left = 0;
	for (var key in this.validators) {
		++left;
		var validator = this.validators[key];
		validator.validate(input, new ResultSet(function(results) {
			
			if (results.isOk()) {
				result.ok(key, results);
			}
			else if (results.isWarning()) {
				result.warn(key, results);
			}
			else if (results.isFail()) {
				result.fail(key, results);
			}
			else {
				throw "WTF?";
			}


			process.nextTick(function(){
				if (--left == 0)
					result.done();
			})
			
		}));

	}
}

module.exports = Validator;