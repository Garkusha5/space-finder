const Sequelize = require('sequelize')
const db = require('./db')

const Spaces = db.define('spaces', {
  buildingName: {
    type: Sequelize.STRING
  },
  buildingLocation: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validation: {
      notEmpty: true
    }
  },
  state: {
    type: Sequelize.STRING
  },
  latitude: {
    type: Sequelize.DECIMAL
  },
  longitude: {
    type: Sequelize.DECIMAL
  },
  type1: {
    type: Sequelize.STRING
  },
  type2: {
    type: Sequelize.STRING
  },
  type3: {
    type: Sequelize.STRING
  },
  type4: {
    type: Sequelize.STRING
  },
  type5: {
    type: Sequelize.STRING
  }
})

module.exports = Spaces
