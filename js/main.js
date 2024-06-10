function transition(word) {
    if (validateWord(word)) {
        let fragmentedWord = [...word.split(''), ''];
        let count = 0, position = 0, currentState = 0;
        let symbol, move, next_state, write;

        (async function() {
            while (currentState != (turing.states.length - 1)) {
                symbol = turing.states[currentState][fragmentedWord[position]];
                showSteps(symbol, count, currentState, fragmentedWord[position]);

                if (symbol == undefined) {
                    defineFail(word);
                    break;
                }

                move = symbol.move;
                next_state = symbol.next_state;
                write = symbol.write;

                currentState = next_state;
                fragmentedWord[position] = write;

                position = move == 'right' ? position + 1 : position - 1;
                moveHead(position);

                count++;

                if (currentState == (turing.states.length - 1)) defineSuccess(word, count);

                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        })();
    } else {
        defineFail(word);
    }
}

function validateWord(word) {
    return /^[01]+$/.test(word);
}

function moveHead(position) {
    var cellWidth = 48; // Largura de cada célula na fita
    var offset = 2; // Ajuste este valor conforme necessário
    var newLeftPosition = position * cellWidth + offset;

    // Mova a cabeça de leitura para a nova posição
    $('#head').css('left', newLeftPosition + 'px');
}
