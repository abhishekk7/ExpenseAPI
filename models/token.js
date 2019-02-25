const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
	access_token: {
		type: 'String'
	},
	item_id: {
		type: 'String'
	},
	request_id: {
		type: 'String'
	},
	status_code: {
		type: 'Number'
	}
});

const Token = mongoose.model('Token', TokenSchema);

module.exports = Token;