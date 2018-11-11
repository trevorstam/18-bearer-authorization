import mongoose from 'mongoose';

const citySchema = mongoose.Schema({
  name: String,
  nickname: String,
  state: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'state',
  },
});

citySchema.pre('findOne', (next) => {
  this.populate('state');
  next();
});

const city = mongoose.model('city', citySchema);

export default city;