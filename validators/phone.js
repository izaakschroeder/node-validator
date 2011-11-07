function Validator() {
	
}

Validator.prototype.validate = function(input, result) {
	result.ok().done();
}

module.exports = Validator;
