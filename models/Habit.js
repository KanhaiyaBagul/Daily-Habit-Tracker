const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, 'Please provide a user ID']
    },
    habitName: {
        type: String,
        required: [true, 'Please provide a habit name'],
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    // Map to store date strings "YYYY-MM-DD" as keys and boolean as values
    records: {
        type: Map,
        of: Boolean,
        default: {}
    },
    streakCount: {
        type: Number,
        default: 0
    }
});

// Compound unique index: a habitName must be unique per user (not globally)
habitSchema.index({ userId: 1, habitName: 1 }, { unique: true });

const Habit = mongoose.model('Habit', habitSchema);
module.exports = Habit;
