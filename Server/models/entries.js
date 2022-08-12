import mongoose from 'mongoose';

const entriesSchema= new mongoose.Schema({
  dateVal: String,
  records: [{
    hour: String,
    task: String,
    checkedVal: String,
  }]
})


const Entries = mongoose.model('Entries', entriesSchema);
export default Entries;