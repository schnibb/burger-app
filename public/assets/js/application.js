$(document).ready(function() {

    $(document).on("click", "button.devour", devourBurger);

    $("#submit").on("click", function(event) {

        event.preventDefault();

        createBurger();
    });

    function createBurger() {
        console.log("called");
        var burger = $("#burger_name").val().trim();
        var newBurger = {
            burger_name: burger
        };
        console.log(newBurger.burger_name);
        $.post("/burgers/create", newBurger)
            .then(getBurgers());
        $("#burger_name").val("");
    }

    function getBurgers() {
        $("#to-be-eaten").empty();
        $.get("/burgers", function(data) {
            for (var i = 0; i < data.length; i++) {
                toBeEaten(data[i]);
            }
        });
    }

    function getBurgersEaten() {
        $("#eaten").empty();
        $.get("/burgers/devoured", function(data) {
            for (var i = 0; i < data.length; i++) {
                devoured(data[i]);
            }
        });
    }

    function showBurgers() {
        getBurgers();
        getBurgersEaten();
    }

    showBurgers();

    function devourBurger(event) {
        console.log("devour burger called");
        //event.preventDefault();
        var burgerID = event.target.value;
        console.log(burgerID);
        var eatBurger = {
            id: burgerID,
            devoured: true
        }
        $.ajax({
            method: "PUT",
            url: "/burgers/update",
            data: eatBurger
        }).then(getBurgers());
    }

    function toBeEaten(burger) {

        var newBurgerPost = $("<div>");
        newBurgerPost.addClass("alert alert-primary");
        newBurgerPost.text(burger.id + " " + burger.burger_name + "  ");
        var devourButton = $("<button>");
        devourButton.text("Devour");
        devourButton.addClass("devour btn btn-danger");
        devourButton.attr({ value: burger.id });
        newBurgerPost.append(devourButton);
        $("#to-be-eaten").append(newBurgerPost);
    }

    function devoured(burger) {
        console.log("devoured function is called");
        var newBurgerPost = $("<div>");
        newBurgerPost.addClass("alert alert-primary");
        newBurgerPost.text(burger.id + " " + burger.burger_name + "  ");
        $("#eaten").append(newBurgerPost);
    }
});