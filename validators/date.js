
function Validator() {
	
}

Validator.prototype.validate = function(input, result) {
	if (Date.parse(input) !== NaN) 
		result.ok().done();
	else
		result.fail().done();
}

Validator.prototype.normalize = function(input, callback) {
	callback(Date.parse(input));
}

module.exports = Validator;