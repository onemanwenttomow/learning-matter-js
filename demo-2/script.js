window.addEventListener("load", function() {
    //Fetch our canvas
    var canvas = document.getElementById("world");

    //Setup Matter JS
    var engine = Matter.Engine.create();
    var world = engine.world;
    var render = Matter.Render.create({
        canvas: canvas,
        engine: engine,
        options: {
            width: window.innerWidth,
            height: window.innerHeight,
            background: "transparent",
            wireframes: false,
            showAngleIndicator: false
        }
    });

    //Add a ball
    var balls = generateBalls(Math.floor(Math.random() * 99 + 50));
    Matter.World.add(world, balls);

    //Add a floor
    var floor = Matter.Bodies.rectangle(
        percentX(50),
        percentY(99),
        percentX(100),
        40,
        {
            isStatic: true, //An immovable object
            render: {
                visible: true
            }
        }
    );

    var leftWall = Matter.Bodies.rectangle(
        percentX(1),
        percentY(50),
        40,
        percentY(100),
        {
            isStatic: true, //An immovable object
            render: {
                visible: true
            }
        }
    );

    var rightWall = Matter.Bodies.rectangle(
        percentX(99),
        percentY(50),
        40,
        percentY(100),
        {
            isStatic: true, //An immovable object
            render: {
                visible: true
            }
        }
    );
    Matter.World.add(world, floor);
    Matter.World.add(world, leftWall);
    Matter.World.add(world, rightWall);


    //Make interactive
    var mouseConstraint = Matter.MouseConstraint.create(engine, {
        //Create Constraint
        element: canvas,
        constraint: {
            render: {
                visible: false
            },
            stiffness: 0.8
        }
    });
    Matter.World.add(world, mouseConstraint);

    //Start the engine
    Matter.Engine.run(engine);
    Matter.Render.run(render);

    function generateBalls(num) {
        var balls = [];
        for (var i = 0; i < num; i++) {
            balls.push(
                Matter.Bodies.circle(
                    percentX(Math.floor(Math.random() * 80 + 10)),
                    Math.floor(Math.random() * window.innerHeight - 250),
                    percentX(Math.floor(Math.random() * 2 + 1)),
                    {
                        density: 0.014,
                        friction: 0.01,
                        frictionAir: 0.00001,
                        restitution: 0.9,
                        render: {
                            fillStyle: randomColor(),
                            strokeStyle: "black",
                            lineWidth: 10
                        }
                    }
                )
            );
        }
        return balls;
    }
});

function percentX(percent) {
    return Math.round((percent / 100) * window.innerWidth);
}
function percentY(percent) {
    return Math.round((percent / 100) * window.innerHeight);
}

function randomColor() {
    function getRandomNumber(num) {
        return Math.floor(Math.random() * num);
    }
    var r = getRandomNumber(256);
    var g = getRandomNumber(256);
    var b = getRandomNumber(256);
    return "rgb(" + r + "," + g + "," + b + ")";
}
