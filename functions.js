function create_button(p_x, p_y, p_color, i) {
    return add([
        pos(p_x, p_y),
        rect(275, 50),
        origin("center"),
        color(p_color),
        area(),
        "button" + i
    ]);
}

function create_text(txt, x, y, val) {
    return add([
        text(txt, {
            size: 20,
            font: "sinko"
        }),
        pos(x, y),
        { value: val } 
    ]);
}

// I haven't found a way to read a file easily
function get_content() {
    return `Acide chlorhydrique;HCl
Chlorure de potassium;KCl
Chlorure;Cl^-
Hydrure;H^-
Hydronium;H_3O^+
Acide nitrique;HNO_3
Acide nitreux;HNO_2
Ammonium;NH_4^+
Hydroxyde;OH^-
Fluorure;F^-
Hypochlorite;ClO^-
Bromure;Br^-
Bromate;BrO_3^-
Iodure;I^-
Iodate;IO_3^-
Aluminium;Al^3^+
Oxyde;O^2^-
Peroxyde;O_2^2^-
Sulfure;S^2^-
Sulfite;SO_3^2^-
Sulfate;SO_4^2^-
Thiosulfate;S_2O_3^2^-
Tetrathionate;S_4O_6^2^-
Peroxodisulfate;S_2O_8^2^-
Chlorite;ClO_2^-
Chlorate;ClO_3^-
Perchlorate;ClO_4^-
Nitrite;NO_2^-
Nitrate;NO_3^-
Phosphate;PO_4^3^-
Diphosphate;P_2O_7^4^-
Carbonate;CO_3^2^-
Oxalate;C_2O_4^2^-
Cyanure;CN^-
Cyanate;OCN^-
Thiocyanate;SCN^-
Acetate;CH_3COO^-
Borate;BO_3^3^-
Aluminate;Al(OH)_4^-
Permanganate;MnO_4^-
Chromate;CrO_4^2^-
Dichromate;Cr_2O_7^2^-
Hydrogenophosphate;HPO_4^2^-
Dihydrogenophosphate;H_2PO_4^-
Lithium;Li^+
Sodium;Na^+
Potassium;K^+
Nitrate d'argent;AgNO_3
Zinc;Zn^2^+
Sulfate de cuivre;CuSO_4
Dichromate de potassium;Kr_2Cr_2O_7`;
}

function load_data() {
    const data = get_content();
    const lines = data.split('\n');
    let lst = [];
    
    for (const line of lines) {
        lst.push(line.split(';'));
    }
    
    return lst;
}

// Returns a random number in [from, to)
function get_random_number(from, to) {
    return from + Math.floor(Math.random() * to);
}

function get_name_with_index(data) {
    const index = get_random_number(0, data.length);
    return [
        index, data[index][0]
    ];
}

function get_right_answer(data, index) {
    return data[index][1];
}

function get_answers_with_index(data, index) {
    const right_answer = get_right_answer(data, index);
    let answers = [right_answer];
    
    while (answers.length < 4) {
        const rand = get_random_number(0, data.length);
        const value = data[rand][1];
        
        if (rand === index || answers.indexOf(value) != -1) {
            continue;
        }
        answers.push(value);
    }
    
    // Shuffles the array
    answers.sort(() => Math.random() - 0.5);
    const right_index = answers.indexOf(right_answer);

    return [right_index, answers];
}

function draw_question(question) {
    add([
        pos(width() / 2.0, height() / 4.0),
        origin("center"),
        text(question, {
            size: 30,
            font: "sinko"
        }),
        "question"
    ]);
}

function draw_answers(answers, buttons) {
    for (let i = 0; i < buttons.length; i++) {
        add([
            pos(buttons[i].pos),
            sprite(answers[i]),
            origin("center"),
            "answer"
        ]);
    }
}