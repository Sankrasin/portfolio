import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

export default function Snow() {
  const particlesInit = useCallback(async (engine: Engine) => {
    // This loads the slim version of tsparticles to keep bundle size small
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { 
          enable: false, 
          zIndex: -1 
        },
        particles: {
          number: { 
            value: 200, 
            density: { enable: true, value_area: 800 } 
          },
          color: { 
            value: "#ffffff" 
          },
          shape: { 
            type: "circle" 
          },
          opacity: { 
            value: 0.6, 
            random: true, 
            anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } 
          },
          size: { 
            value: 3, 
            random: true, 
            anim: { enable: false } 
          },
          move: {
            enable: true,
            speed: 1.2,
            direction: "bottom",
            random: true,
            straight: false,
            outModes: { default: "out" },
          }
        },
        interactivity: { 
          events: { 
            onHover: { enable: false },
            onClick: { enable: false } 
          } 
        },
        detectRetina: true,
      }}
    />
  );
}
