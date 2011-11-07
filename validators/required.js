
function Validator(options) {

}

Validator.prototype.validate = function(input, result) {
	if (typeof input !== "undefined")
		result.ok().done();
	else
		result.fail().done();
}

module.exports = Validator;