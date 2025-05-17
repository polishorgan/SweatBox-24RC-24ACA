import { Application, Assets, FederatedPointerEvent, Text, Sprite } from "pixi.js";

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
  const basemap = new Sprite(texture);

  basemap.scale.set(0.1);
  basemap.eventMode = 'static';
  basemap.on('pointerdown', e => {
    const mousex = e.x - basemap.x;
    const alphax = mousex / basemap.width;
    const gamex = alphax * mapSize.x + mapPos.top_left.x;
    
    const mousey = e.y - basemap.y;
    const alphay = mousey / basemap.width;
    const gamey = alphay * mapSize.y + mapPos.top_left.y;

    console.log({x: Math.round(gamex*10)/10, y: Math.round(gamey*10)/10});
  });


  app.stage.addChild(basemap);


 const text = new Text({
    text: '*',
    style: {
      fontFamily: 'Arial',
      fontSize: 24,
      fill: 0xff1010,
      align: 'center',
    }
  });

  app.stage.addChild(text);
  


  app.stage.eventMode = 'static';
  app.stage.hitArea = app.screen;

  app.stage.on('rightdown', e => {
    app.stage.on('pointermove', dragmap);
  })

  app.stage.on('rightup', e => {
    app.stage.off('pointermove', dragmap);
  });

  function dragmap(e: FederatedPointerEvent) {
    basemap.position.x = basemap.position.x + e.movementX;
    basemap.position.y = basemap.position.y + e.movementY;
  }

  app.stage.on('wheel', e => {
    if (e.deltaY > 0)
      basemap.scale.set(basemap.scale._x / 1.1);
    else if (e.deltaY < 0)
      basemap.scale.set(basemap.scale._x * 1.1);
  })

  app.ticker.add((time) =>
  {
    const gamepos = [21438, 32793]
    const alphax = (gamepos[0] - mapPos.top_left.x) / mapSize.x;
    const xOnBasemap = alphax * basemap.width;
    text.position.x = basemap.x + xOnBasemap;

    const alphay = (gamepos[1] - mapPos.top_left.y) / mapSize.y;
    const yOnBasemap = alphay * basemap.height;
    text.position.y = basemap.y + yOnBasemap;
  });

})();
