import { Schema } from 'mongoose';

export const Session = new Schema({
	expires: {
		type: Date,
	},
	session: {
		type: String,
	},
});
