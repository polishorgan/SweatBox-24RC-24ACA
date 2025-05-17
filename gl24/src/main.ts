import { Application, Assets, FederatedPointerEvent, Text, Graphics, NOOP } from "pixi.js";

const gameCoords = {
    top_left:     { x: -49222.1, y: -45890.8},
    bottom_right: { x:  47132.9, y:  46139.2},
};
const gameSize = {x: 96355, y: 92030};

(async () => {
    // Create a new application
    const app = new Application();

    await app.init({ antialias: true, background: "#1099bb", resizeTo: window });
    document.getElementById("pixi-container")!.appendChild(app.canvas);


    const basemapAsset = await Assets.load({
        src: '/assets/basemap.svg',
        data: { parseAsGraphicsContext: true },
    });

    const basemap = new Graphics(basemapAsset);

    basemap.position.set(app.screen.width / 2, app.screen.height / 2);
    app.stage.addChild(basemap);

    basemap.eventMode = 'static';
    basemap.on('pointerdown', e => {
        const mousePos = e.getLocalPosition(basemap)
        console.log({x: mousePos.x*100, y: mousePos.y*100});
    });




    app.stage.eventMode = 'static';
    app.stage.hitArea = app.screen;
    app.stage.on('rightdown', () => app.stage.on('pointermove', dragmap));
    app.stage.on('rightup', () => app.stage.off('pointermove', dragmap));

    function dragmap(e: FederatedPointerEvent) {
      basemap.pivot.x -= e.movementX / basemap.scale.x;
      basemap.pivot.y -= e.movementY / basemap.scale.x;
    }

    app.stage.on('wheel', e => {
        // down scroll, zoom out
        if (e.deltaY > 0)
            basemap.scale.set(basemap.scale.x * 1/1.1);
        // up scroll, zoom in
        else if (e.deltaY < 0)
            basemap.scale.set(basemap.scale.x * 1.1);

        console.log(basemap.scale.x);
    })



    app.ticker.add((time) =>
    {
      NOOP()
    });

})();
