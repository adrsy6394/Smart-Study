const mongoose = require('mongoose');

const studyPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      default: 'Weekly Study Plan',
    },
    days: [
      {
        day: { type: String, required: true }, // e.g., "Monday"
        focusSubject: { type: String }, // e.g., "Math"
        durationMinutes: { type: Number }, // e.g., 60
        tasks: [{ type: String }], // e.g., ["Review Chapter 3", "Solve 10 problems"]
      }
    ],
    generalTips: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('StudyPlan', studyPlanSchema);
