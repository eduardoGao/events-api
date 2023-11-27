import mongoose from "mongoose"

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  notes: {
    type: String,
  },
  start: {
    type: Date,
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assistants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }]
})

eventSchema.method('toJSON', function() {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id

  return object
})

export const Event = mongoose.model('Event', eventSchema)