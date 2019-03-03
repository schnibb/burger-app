var db = require("../models");

module.exports = function(app) {
    //burger redirect
    app.get("/", function(req, res) {
        res.redirect("/burgers");
    });

    app.get("/burgers", function(req, res) {
        db.Burger.findAll({
            where: {
                devoured: false
            }
        }).then(function(dbBurger) {
            res.json(dbBurger);
        });
    });

    app.get("/burgers/devoured", function(req, res) {
        db.Burger.findAll({
            where: {
                devoured: true
            }
        }).then(function(dbBurgerEaten) {
            res.json(dbBurgerEaten);
        });
    });

    app.post("/burgers/create", function(req, res) {
        db.Burger.create(req.body).then(function(dbBurgerDisplay) {
            res.json(dbBurgerDisplay);
        });
    });

    app.put("/burgers/update", function(req, res) {
        db.Burger.update(req.body, {
            where: {
                id: req.body.id
            }
        }).then(function(dbBurgerDisplay) {
            res.json(dbBurgerDisplay);
        });
    });
}