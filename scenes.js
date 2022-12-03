function create_centered_text(txt, x, y, size) {
    add([
        pos(x, y),
        origin("center"),
        text(txt, {
            size: size,
            font: "sinko"
        })
    ]);
}

function game(data) {
    add([ sprite("bg") ]);
    
    const default_buttons = [
        create_button(width() / 4.0, height() * 3.0 / 4.0, new Color(220, 0, 0), 0),
        create_button(width() * 3.0 / 4.0, height() * 3.0 / 4.0, new Color(0, 220, 0), 1),
        create_button(width() / 4.0, height() * 3.0 / 4.0 + 60.0, new Color(164, 219, 232), 2),
        create_button(width() * 3.0 / 4.0, height() * 3.0 / 4.0 + 60.0, new Color(220, 220, 0), 3)
    ];
    
    let buttons = default_buttons;
    
    let [index, name] = get_name_with_index(data);
    let [right_index, answers] = get_answers_with_index(data, index);
    
    const lives = create_text("Vies: 3", 10, 10, 3);
    const score = create_text("Score: 0", 10, 35, 0);
    
    draw_question(name);
    draw_answers(answers, buttons);
    
    for (let i = 0; i < buttons.length; i++) {
        onClick("button" + i, () => {
            if (i === right_index) {
                score.value++;
                score.text = "Score: " + score.value;
            } else {
                lives.value--;
                lives.text = "Vies: " + lives.value;
                
                if (lives.value == 0) {
                    go("lose", score.value)
                    return;
                }
            }
            
            destroyAll("question");
            destroyAll("answer");
                
            [index, name] = get_name_with_index(data);
            [right_index, answers] = get_answers_with_index(data, index);
            draw_question(name);
            draw_answers(answers, buttons);
        });
    }
}

function lost(score) {
    add([ sprite("bg") ]);
        
    add([
        pos(width() / 2.0, height() / 4.0),
        origin("center"),
        text("Vous avez perdu", {
            size: 30,
            font: "sinko"
        })
    ]);

    const subtext_size = 20;

    // add([
    //     pos(width() / 2.0, height() * 3.0 / 4.0 - subtext_size * 2.0),
    //     origin("center"),
    //     text(`Votre score: ${score}`, {
    //         size: subtext_size,
    //         font: "sinko"
    //     })
    // ]);
    create_centered_text(`Votre score: ${score}`, width() / 2.0, height() * 3.0 / 4.0 - subtext_size * 2.0, subtext_size);
    create_centered_text("Cliquez pour recommencer", width() / 2.0, height() * 3.0 / 4.0, subtext_size);
                    
    // add([
    //     pos(width() / 2.0, height() * 3.0 / 4.0),
    //     origin("center"),
    //     text("Cliquez pour recommencer", {
    //         size: subtext_size,
    //         font: "sinko"
    //     })
    // ]);
        
    onClick(() => {
        go("game");
    });
}