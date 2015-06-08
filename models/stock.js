
var mongoose = require('mongoose');

module.exports = mongoose.model('Stock',{
	id: String,
	sap: Number,
	lot: String,
	date: String,
	name: String,
	number: Number,
	code: String
});
