function main() {
    kaboom({
        width: 640,
        height: 360
    });
    
    // --- Loading sprites (so that the scenes can draw them next) ---
    loadSprite("bg", "./assets/bg.png");
    
    const data = load_data();
    for (const couple of data) {
        loadSprite(couple[1], `./assets/${couple[1]}.png`);
    }
    
    scene("game", () => { game(data); });
    scene("lose", lost);
    
    go("game");
}

main();
