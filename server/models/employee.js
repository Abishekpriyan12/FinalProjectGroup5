// Assuming your Employee model is set up something like this
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  dateOfJoining: Date,
  title: String,
  department: String,
  employeeType: String,
  currentStatus: Boolean,
  isActive: { type: Boolean, default: true } // Ensure 'isActive' is part of your schema
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
