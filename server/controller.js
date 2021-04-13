const { Vehicules } = require("./db");
const { Reparateurs } = require("./db");
const { Interventions } = require("./db");

exports.createCustomer = (req, res) => {
    let customer = {};

    try{
        // Building Customer object from upoading request's body
        customer.owner = req.body.owner;
        customer.marque = req.body.marque;
        customer.modele = req.body.modele;
        customer.year = req.body.year;
        customer.immat = req.body.immat;
        customer.trans = req.body.trans;
        customer.carb = req.body.carb;
    
        // Save to MySQL database
        Vehicules.create(customer, 
                          {attributes: ['id', 'owner', 'marque', 'modele', 'immat', 'trans', 'year', 'carb']})
                    .then(result => {    
                      res.send({data:result});
                    });
    }catch(error){
        res.status(500).json({
            message: "Erreur Interne!",
            error: error.message
        });
    }
}

exports.getCustomer = (req, res) => {
    Vehicules.findByPk(req.params.id, 
                        {attributes: ['id', 'owner', 'marque', 'modele', 'immat', 'trans', 'year', 'carb']})
        .then(customer => {
          res.status(200).json(customer);
        }).catch(error => {
          // log on console
          console.log(error);

          res.status(500).json({
              message: "Erreur Interne!",
              error: error
          });
        })
}

exports.customers = (req, res) => {
    // find all Customer information from 
    try{
        Vehicules.findAll({attributes: ['id', 'owner', 'marque', 'modele', 'immat', 'trans', 'year', 'carb']})
        .then(customers => {
            res.send({data:customers});
        })
    }catch(error) {
        // log on console
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });

    }
}

exports.deleteCustomer = async (req, res) => {
    try{
        let customerId = req.params.id;
        let customer = await Vehicules.findByPk(customerId);

        if(!customer){
            res.status(404).json({
                message: "Does Not exist a Customer with id = " + customerId,
                error: "404",
            });
        } else {
            await customer.destroy();
            res.status(200);
            res.send({data:customer});
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a customer with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.updateCustomer = async (req, res, next) => {
    try{
        let customer = await Vehicules.findByPk(req.body.id);
    
        if(!customer){
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a customer with id = " + customerId,
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
                owner: req.body.owner,
                marque: req.body.marque,
                modele: req.body.modele,
                year: req.body.year,
                immat: req.body.immat,
                trans: req.body.trans,
                carb: req.body.carb
            }
            let result = await Vehicules.update(updatedObject,
                              { 
                                returning: true, 
                                where: {id: req.body.id},
                                attributes: ['id', 'owner', 'marque', 'modele', 'immat', 'trans', 'year', 'carb']
                              }
                            );

            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a customer with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            //res.status(200).json(result);
            res.send({data: result});
        }
    } catch(error){
        next(err);
    }
}


//Reparateurs




exports.reparateurs = (req, res) => {
    // find all Customer information from 
    try{
        Reparateurs.findAll({attributes: ['id', 'repa', 'cat', 'respo', 'add', 'tel', 'code']})
        .then(reparateurs => {
            res.send({data:reparateurs});
        })
    }catch(error) {
        // log on console
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });

    }
}


exports.deleteReparateur = async (req, res) => {
    try{
        let repaId = req.params.id;
        let repa = await Reparateurs.findByPk(repaId);

        if(!repa){
            res.status(404).json({
                message: "Il n'existe pas de reparateurs avec pour id = " + customerId,
                error: "404",
            });
        } else {
            await repa.destroy();
            res.status(200);
            res.send({data:customer});
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a customer with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.updateReparateur = async (req, res, next) => {
    try{
        let repa = await Reparateurs.findByPk(req.body.id);
    
        if(!repa){
            // return a response to client
            res.status(404).json({
                message: "Aucune modification possible pour un reparteur avec pour id = " + customerId,
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
                repa: req.body.repa,
                cat: req.body.cat,
                respo: req.body.respo,
                add: req.body.add,
                tel: req.body.tel,
                code: req.body.code
            }
            let result = await Reparateurs.update(updatedObject,
                              { 
                                returning: true, 
                                where: {id: req.body.id},
                                attributes: ['id', 'repa', 'cat', 'respo', 'add', 'code']
                              }
                            );

            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a reparateur with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            //res.status(200).json(result);
            res.send({data: result});
        }
    } catch(error){
        next(err);
    }
}


exports.createReparateur = (req, res) => {
    let reparateur = {};

    try{
        // Building Customer object from upoading request's body
        bcrypt.hash(req.body.code, 10).then((hash)=>{
            reparateur.code= hash;
        });

        reparateur.repa = req.body.repa;
        reparateur.cat = req.body.cat;
        reparateur.respo= req.body.respo;
        reparateur.add= req.body.add;
        reparateur.tel= req.body.tel;
        reparateur.code;
    
        // Save to MySQL database
        Reparateurs.create(reparateur, 
                          {attributes: ['id', 'repa', 'cat', 'respo', 'add', 'code']})
                    .then(result => {    
                      res.send({data:result});
                    });
    }catch(error){
        res.status(500).json({
            message: "Erreur Interne!",
            error: error.message
        });
    }
}


//interventions

exports.createIntervention = (req, res) => {
    let inter = {};

    try{
        // Building Customer object from upoading request's body
        inter.owner = req.body.owner;
        inter.marque = req.body.marque;
        inter.modele = req.body.modele;
        inter.year = req.body.year;
        inter.immat = req.body.immat;
        inter.nc = req.body.nc;
        inter.contact = req.body.contact;
        inter.repa = req.body.repa;
        inter.action = req.body.action;
        inter.syst = req.body.syst;
        inter.ssyst = req.body.ssyst;
        inter.org = req.body.org;
        inter.crat = req.body.crat;
        inter.pa = req.body.pa;
        inter.pv = req.body.pv;
        inter.mo = req.body.mo;
        inter.des = req.body.des;
        inter.pj = req.body.pj;
        inter.kil = req.body.kil;
    
        // Save to MySQL database
        Interventions.create(inter, 
                          {attributes: ['id', 'marque', 'modele', 'immat', 'nc', 'year','owner', 'contact','repa','action','syst','ssyst','org','crat','pa','pv','mo','des','pj','kil' ]})
                    .then(result => {    
                      res.send({data:result});
                    });
    }catch(error){
        res.status(500).json({
            message: "Erreur Interne!",
            error: error.message
        });
    }
}

exports.interventions = (req, res) => {
    // find all Customer information from 
    try{
        Interventions.findAll({attributes: ['id', 'marque', 'modele', 'immat', 'nc', 'year','owner', 'contact','repa','action','syst','ssyst','org','crat','pa','pv','mo','des','pj','kil' ]})
        .then(interventions => {
            res.send({data:interventions});
        })
    }catch(error) {
        // log on console
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });

    }
}

exports.getInt = (req, res) => {
    Interventions.findByPk(req.params.id, 
                        {attributes: ['id', 'marque', 'modele', 'immat', 'nc', 'year','owner', 'contact','repa','action','syst','ssyst','org','crat','pa','pv','mo','des','pj','kil' ]})
        .then(int => {
            res.status(200).json(int);
        }).catch(error => {
          // log on console
          console.log(error);

          res.status(500).json({
              message: "Erreur Interne!",
              error: error
          });
        })
}