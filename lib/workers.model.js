module.exports = (sequelize, Sequelize) => {
	const Workers = sequelize.define('users', {	
	  id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
    },
    createdAt: {
        type: Sequelize.DATE
    },
    
	  pseudo: {
		  type: Sequelize.STRING
  	},
	  email: {
			type: Sequelize.STRING
	  },
	  code: {
			type: Sequelize.STRING
    }

	});
	
	return Workers;
}