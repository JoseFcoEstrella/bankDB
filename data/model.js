// Import Sequelize library
const Sequelize = require("sequelize");

// Define the database connection
const sequelize = new Sequelize("bankDB", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
});

// Define the clients table
const Client = sequelize.define("clients", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  last_name: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING(100),
    allowNull: false,
    unique: true,
  },
  phone: {
    type: Sequelize.STRING(20),
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  city: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  state: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  zip_code: {
    type: Sequelize.STRING(10),
    allowNull: false,
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  updated_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
});

// Define the loans table
const Loan = sequelize.define("loans", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  client_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Client,
      key: "id",
    },
  },
  amount: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  interest_rate: {
    type: Sequelize.DECIMAL(5, 2),
    allowNull: false,
  },
  term: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  start_date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  end_date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING(20),
    allowNull: false,
    defaultValue: "pending",
  },
  repayment_type: {
    type: Sequelize.STRING(20),
    allowNull: false,
    defaultValue: "fixed",
  },
  approval_date: {
    type: Sequelize.DATEONLY,
  },
  approved_by: {
    type: Sequelize.STRING(100),
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  updated_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
});

// Define the relationships between the tables
Client.hasMany(Loan, { foreignKey: "client_id" });
Loan.belongsTo(Client, { foreignKey: "client_id" });

sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });
  
// Export the models
module.exports = { Client, Loan };
