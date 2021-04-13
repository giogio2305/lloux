module.exports = (sequelize, Sequelize) => {
	const Reparateurs = sequelize.define('reparateurs', {	
	  id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
    },
	  repa: {
			type: Sequelize.STRING
	  },
	  cat: {
		  type: Sequelize.STRING
  	},
	  respo: {
			type: Sequelize.STRING
	  },
	  code: {
		type: Sequelize.STRING
  },
	  add: {
			type: Sequelize.STRING
    },
    tel: {
        type: Sequelize.STRING
    },
    capa: {
    type: Sequelize.INTEGER
    },
    portail: {
        type: Sequelize.STRING
    }
	});
	
	return Reparateurs;
}