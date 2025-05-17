import { Application, Assets, Graphics, Sprite } from "pixi.js";

const mapPos = {
  top_left:     { x: -49222.1, y: -45890.8},
  bottom_right: { x:  47132.9, y:  46139.2},
};
const mapSize = {x: 96355, y: 92030};

(async () => {
  // Create a new application
  const app = new Application();

  await app.init({ background: "#1099bb", resizeTo: window });
  document.getElementById("pixi-container")!.appendChild(app.canvas);

  /////////////////////////////////////////////////////////////////////////////

  const texture = await Assets.load('/assets/expensive.png');
  const sprite = new Sprite(texture);

  sprite.scale.set(0.1);
  sprite.eventMode = 'static';
  sprite.on('pointerdown', e => {
    const mousex = e.x - sprite.x;
    const alphax = mousex / sprite.width;
    const gamex = alphax * mapSize.x + mapPos.top_left.x;
    
    const mousey = e.y - sprite.y;
    const alphay = mousey / sprite.width;
    const gamey = alphay * mapSize.y + mapPos.top_left.y;

    console.log({x: Math.round(gamex*10)/10, y: Math.round(gamey*10)/10});
  });

  app.stage.addChild(sprite);


  app.ticker.add((time) =>
  {
    // graphics.rotation += 0.01;
    // graphics.scale.set(graphics.scale._x + time.deltaTime/1000);
  });
})();
