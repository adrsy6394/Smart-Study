const mongoose = require('mongoose');

const academicRecordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    subjects: [
      {
        type: String,
        required: true,
      },
    ],
    marks: [
      {
        type: Number,
        required: true,
        min: 0,
        max: 100,
      },
    ],
    weakSubjects: [
      {
        type: String,
      },
    ],
    aiAnalysis: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('AcademicRecord', academicRecordSchema);
