const mongoose = require("mongoose")

const budgetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
      budget: {
        type: Number,
        required: true,
      },
      color: {
        type: String,
        required: true,
        validate: {
          validator: (color) => /^#[0-9A-Fa-f]{6}$/.test(color),
          message: 'Invalid color format (e.g., #RRGGBB)',
        },
      },

},{collection: 'budget'})

module.exports = mongoose.model('budget',budgetSchema)