import * as mongoose from 'mongoose'

export const playerSchema = new mongoose.Schema({
    phoneNumber: {type: String, unique:true},
    email: {type: String, unique: true},
    name: {type: String},
    ranking: {type: String},
    position: {type: Number},
    urlAvatar: {type: String},
}, {timestamps: true, collection: 'players'})