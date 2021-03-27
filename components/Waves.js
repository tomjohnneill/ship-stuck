const Waves = () => {
  return (
    <>
      <div className="ocean">
        <svg viewBox="0 0 120 28">
          <path
            id="wave"
            d="M 0,20 
                 C 
                 30,20 
                 30,25 
                 60,25 
                 90,25 
                 90,20 
                 120,20 
                 150,20 
                 150,25 
                 180,25 
                 210,25 
                 210,20 
                 240,20 
                 v 40 
                 h -290 
                 z"
          />
          <path
            id="wave2"
            x="0"
            y="0"
            d="
                M 0,20 
                C 
                30,20 
                30,25 
                60,25 
                90,25 
                90,20 
                120,20 
                150,20 
                150,25 
                180,25 
                210,25 
                210,20 
                240,20 
                v 40 
                h -290 
                z"
          />
        </svg>
      </div>

      <style jsx>{`
        .ocean {
          width: 100vw;
          position: fixed;
          bottom: 0px;
          z-index: -10;
        }

        svg {
          width: 100%;
          overflow: visible;
        }

        #wave {
          animation: wave 15s linear;
          animation-iteration-count: infinite;
          fill: #4478e360;
        }

        #wave2 {
          animation: wave 10s linear;
          // animation-direction: reverse;
          animation-iteration-count: infinite;
          fill: #1890ff40;
        }

        @keyframes wave {
          to {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </>
  );
};

export default Waves;
