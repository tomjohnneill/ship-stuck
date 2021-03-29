// MatterStepThree.js
import React, { useEffect, useState, useRef } from "react";
import Matter from "matter-js";

const STATIC_DENSITY = 15;
const PARTICLE_SIZE = 6;
const PARTICLE_BOUNCYNESS = 0.1;
const PARTICLE_FRICTIONAIR = 0;

export const MatterStepThree = () => {
  const boxRef = useRef(null);
  const canvasRef = useRef(null);
  const [constraints, setContraints] = useState();
  const [scene, setScene] = useState();
  const [someStateValue, setSomeStateValue] = useState(false);
  const handleResize = () => {
    setContraints(boxRef.current.getBoundingClientRect());
  };
  const handleClick = () => {
    setSomeStateValue(!someStateValue);
  };

  const moveShip = (e) => {
    const ship = scene.engine.world.bodies[1];
    if (ship) {
      e.preventDefault();
      const position = { x: 0, y: 0 };
      if (e.key === "ArrowUp" || e.key === "w") {
        Matter.Body.applyForce(ship, { x: 0, y: -100 }, { x: 0, y: -10 });
      } else if (e.key === "ArrowDown" || e.key === "s") {
        Matter.Body.applyForce(ship, position, { x: 0, y: 10 });
      } else if (e.key === "ArrowLeft" || e.key === "a") {
        Matter.Body.applyForce(ship, position, { x: -10, y: 0 });
      } else if (e.key === "ArrowRight" || e.key === "d") {
        Matter.Body.applyForce(ship, position, { x: 10, y: 0 });
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", moveShip);
    return () => window.removeEventListener("keydown", moveShip);
  });

  useEffect(() => {
    let Engine = Matter.Engine;
    var engine = Engine.create();
    var world = engine.world;
    let Render = Matter.Render;
    let World = Matter.World;
    let Bodies = Matter.Bodies;

    engine.world.gravity.y = 0;

    console.log({ engine });

    let render = Render.create({
      element: boxRef.current,
      engine: engine,
      canvas: canvasRef.current,
      options: {
        background: "transparent",
        wireframes: false,
      },
    });
    const floor = Bodies.rectangle(0, 0, 0, STATIC_DENSITY, {
      isStatic: true,
      render: {
        fillStyle: "blue",
      },
    });

    World.add(engine.world, [floor]);
    Engine.run(engine);
    Render.run(render);
    setContraints(boxRef.current.getBoundingClientRect());
    setScene(render);
    window.addEventListener("resize", handleResize);
    console.log({ Engine });
    console.log({ World });
  }, []);

  useEffect(() => {
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (constraints) {
      let { width, height } = constraints;

      const bigShip = Matter.Bodies.circle(
        width / 2,

        height / 2,
        61,
        {
          density: 3,
        }
      );

      // Dynamically update canvas and bounds
      scene.bounds.max.x = width;
      scene.bounds.max.y = height;
      scene.options.width = width;
      scene.options.height = height;
      scene.canvas.width = width;
      scene.canvas.height = height;
      // Dynamically update floor
      const floor = scene.engine.world.bodies[0];
      Matter.Body.setPosition(floor, {
        x: width * 2,
        y: height + STATIC_DENSITY / 2,
      });
      Matter.Body.setVertices(floor, [
        { x: 0, y: height },
        { x: width, y: height },
        { x: width, y: height + STATIC_DENSITY },
        { x: 0, y: height + STATIC_DENSITY },
      ]);

      Matter.World.add(scene.engine.world, bigShip);
    }
  }, [scene, constraints]);

  useEffect(() => {
    // Add a new "ball" everytime `someStateValue` changes
    if (scene) {
      let { width } = constraints;
      let randomX = Math.floor(Math.random() * -width) + width;
      const body = Matter.Bodies.circle(randomX, 40, PARTICLE_SIZE, {
        restitution: PARTICLE_BOUNCYNESS,
        frictionAir: PARTICLE_FRICTIONAIR,
      });
      Matter.Body.setDensity(body, 10);
      Matter.Body.applyForce(
        body,
        { x: randomX, y: 40 },
        { x: 0, y: Math.random() * 4 }
      );
      console.log(scene.engine.world.bodies);

      const balls = scene.engine.world.bodies?.slice(2);
      const ship = scene.engine.world.bodies[1];

      Matter.World.add(scene.engine.world, body);

      balls.forEach((ball) => {
        Matter.Body.applyForce(
          ball,
          { x: randomX, y: 40 },
          { x: 0, y: Math.random() * 3 }
        );
      });
      //setBodies([...bodies, body]);

      //Matter.Body.applyForce(body, { x: randomX, y: 40 }, { x: 0, y: 0.1 });

      balls.forEach((ball, i) => {
        const collision = Matter.SAT.collides(ball, ship);
        console.log("ball", i, collision);
      });
    }
  }, [someStateValue]);

  return (
    <div
      style={{
        position: "relative",
        border: "1px solid white",
        padding: "8px",
      }}
    >
      <div style={{ textAlign: "center" }}>Checkout</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          rowGap: "16px",
          marginBottom: "32px",
        }}
      >
        <div>SubTitle</div>
        <div>£xxx</div>
        <div>Discount</div>
        <div>£xxx</div>
        <div>Total</div>
        <div>£xxx</div>
      </div>
      <button
        style={{
          cursor: "pointer",
          display: "block",
          textAlign: "center",
          marginBottom: "16px",
          width: "100%",
        }}
        onClick={() => handleClick()}
      >
        Checkout
      </button>
      <div
        ref={boxRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default MatterStepThree;
