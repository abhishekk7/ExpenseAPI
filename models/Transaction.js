const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
	account_id: {
		type: 'String'
	},
	account_owner: {
		type: 'Mixed'
	},
	amount: {
		type: 'Number'
	},
	category: {
		type: [
			'String'
		]
	},
	category_id: {
		type: 'String'
	},
	date: {
		type: 'Date'
	},
	iso_currency_code: {
		type: 'String'
	},
	location: {
		address: {
			type: 'Mixed'
		},
		city: {
			type: 'Mixed'
		},
		lat: {
			type: 'Mixed'
		},
		lon: {
			type: 'Mixed'
		},
		state: {
			type: 'Mixed'
		},
		store_number: {
			type: 'Mixed'
		},
		zip: {
			type: 'Mixed'
		}
	},
	name: {
		type: 'String'
	},
	payment_meta: {
		by_order_of: {
			type: 'Mixed'
		},
		payee: {
			type: 'Mixed'
		},
		payer: {
			type: 'Mixed'
		},
		payment_method: {
			type: 'Mixed'
		},
		payment_processor: {
			type: 'Mixed'
		},
		ppd_id: {
			type: 'Mixed'
		},
		reason: {
			type: 'Mixed'
		},
		reference_number: {
			type: 'Mixed'
		}
	},
	pending: {
		type: 'Boolean'
	},
	pending_transaction_id: {
		type: 'Mixed'
	},
	transaction_id: {
		type: 'String',
		unique: true
	},
	transaction_type: {
		type: 'String'
	},
	unofficial_currency_code: {
		type: 'Mixed'
	}
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;