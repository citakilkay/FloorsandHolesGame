$(document).ready(function () {
    let XorOminimax = true;
    var a = true;
    var selectionXO = false; // when X or O is selected, it will be true.
    var selectionTwo = false; // when two player selection is selected, it will be true.
    var selectionOneTwo = false; // when player count is selected, it will be true.
    var Players = null; // I think it is not necessary but even so don't remove it.
    var Letter = 5;
    var putXorO = true; // when it is true, X's turn. When it is false O's turn.
    var pcPut = 0;
    var pcXadvantage = 0; // if Pc is X, then every X advantage move will be +10.
    var pcOadvantage = 0; // if Pc is O, then every O advantage move will be +10.
    const winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    var combosX = [];
    var combosO = [];

    //Game Starter Selections
    const cells = $(".cell");
    $("input[value='2']").click(function () {
        $(".selected").css("cursor", "not-allowed");
        $(".selected").css("opacity", "0.3");
        $(".putX").removeClass('selected-type');
        $(".putO").removeClass('selected-type');
        a = false;
        selectionTwo = true;
        selectionOneTwo = true;
        Players = 2;
    });
    $("input[value='1']").click(function () {
        $(".selected").css("cursor", "pointer");
        $(".selected").css("opacity", "1");
        a = true;
        selectionOneTwo = true;
        selectionTwo = false;
        Players = 1;

    });
    $("input[value='X']").click(function () {
        if (a) {
            $(".putX").addClass('selected-type');
            $(".putO").removeClass('selected-type');
            selectionXO = true;
            Letter = 1;
            pcXadvantage = -10;
            pcOadvantage = 10;
            putXorO = true;
        }
    });
    $("input[value='O']").click(function () {
        if (a) {
            $(".putO").addClass('selected-type');
            $(".putX").removeClass('selected-type');
            selectionXO = true;
            Letter = 2;
            pcXadvantage = 10;
            pcOadvantage = -10;
            putXorO = false;
        }
    });
    /*Game Starter Screen*/
    $("#start-btn").click(function () {
        if (selectionXO && selectionOneTwo || selectionOneTwo && selectionTwo) {
            $(".board").css("display", "grid");
            $(".letsPlay").css("display", "none");
        } else {
            alert("Please Select Game type!!!");
        }
    });
    /*Game Codes*/
    $(".cell").click(function () {
        var classClickCell = this.classList; // for checking if the cell is empty or not.
        if (Object.values(classClickCell).includes("x") == 0 && Object.values(classClickCell).includes("circle") == 0) {
            if (selectionTwo == true) {
                if (putXorO) {
                    $(this).addClass("x");
                    combosX.push(parseInt($(this).attr("id")));
                    if (combosX.length > 2) {
                        for (const [t, y, z] of winCombos) {
                            if (combosX.includes(y) && combosX.includes(t) && combosX.includes(z)) {
                                $(".winning-message").addClass("showClass");
                                $(".whoWin").html("Player 1 Won!");
                            } else if ((combosO.length == 4 && combosX.length == 5) || (combosX.length == 4 && combosO.length == 5)) {
                                $(".winning-message").addClass("showClass");
                                $(".whoWin").html("Tie Game!");
                            }
                        }
                    }
                    putXorO = false;

                } else if (!putXorO) {
                    $(this).addClass("circle");
                    combosO.push(parseInt($(this).attr("id")));
                    if (combosO.length > 2) {
                        for (const [t, y, z] of winCombos) {
                            if (combosO.includes(y) && combosO.includes(t) && combosO.includes(z)) {
                                $(".winning-message").addClass("showClass");
                                $(".whoWin").html("Player 2 Won!");
                            } else if ((combosO.length == 4 && combosX.length == 5) || (combosX.length == 4 && combosO.length == 5)) {
                                $(".winning-message").addClass("showClass");
                                $(".whoWin").html("Tie Game!");
                            }
                        }
                    }
                    putXorO = true;

                }
            } else if (Letter == 1) { // One Player(Player Selected X) against Computer Minimax Algorithm. The human turn.
                if (putXorO) {
                    $(this).addClass("x");
                    combosX.push(parseInt($(this).attr("id")));
                    if (combosX.length > 2) {
                        for (const [t, y, z] of winCombos) {
                            if (combosX.includes(y) && combosX.includes(t) && combosX.includes(z)) {
                                $(".winning-message").addClass("showClass");
                                $(".whoWin").html("Player 1 Won!");
                            } else if ((combosO.length == 4 && combosX.length == 5) || (combosX.length == 4 && combosO.length == 5)) {
                                $(".winning-message").addClass("showClass");
                                $(".whoWin").html("Tie Game!");
                            }
                        }
                    }
                    // One Player against Computer (Minimax Algorithm). The computer turn.
                    minimax(combosX, combosO); // Line 204
                    $("#" + pcPut).addClass("circle");
                    combosO.push(parseInt($(this).attr("id")));
                    if (combosO.length > 2) {
                        for (const [t, y, z] of winCombos) {
                            if (combosO.includes(y) && combosO.includes(t) && combosO.includes(z)) {
                                $(".winning-message").addClass("showClass");
                                $(".whoWin").html("Computer Won!");
                            } else if ((combosO.length == 4 && combosX.length == 5) || (combosX.length == 4 && combosO.length == 5)) {
                                $(".winning-message").addClass("showClass");
                                $(".whoWin").html("Tie Game!");
                            }
                        }
                    }
                }
            } else if (Letter == 2) { // One Player(Player selected O) against Computer(Minimax Algorithm). The human turn.
                if (!putXorO) {
                    $(this).addClass("circle");
                    combosO.push(parseInt($(this).attr("id")));
                    if (combosO.length > 2) {
                        for (const [t, y, z] of winCombos) {
                            if (combosO.includes(y) && combosO.includes(t) && combosO.includes(z)) {
                                $(".winning-message").addClass("showClass");
                                $(".whoWin").html("Player 2 Won!");
                            } else if ((combosO.length == 4 && combosX.length == 5) || (combosX.length == 4 && combosO.length == 5)) {
                                $(".winning-message").addClass("showClass");
                                $(".whoWin").html("Tie Game!");
                            }
                        }
                    }
                }
                // One Player against Computer. The computer turn.
                minimax(combosX, combosO); // Line 204
                $("#" + pcPut).addClass("x");
                combosX.push(parseInt($(this).attr("id")));
                if (combosX.length > 2) {
                    for (const [t, y, z] of winCombos) {
                        if (combosX.includes(y) && combosX.includes(t) && combosX.includes(z)) {
                            $(".winning-message").addClass("showClass");
                            $(".whoWin").html("Computer Won!");
                        } else if ((combosO.length == 4 && combosX.length == 5) || (combosX.length == 4 && combosO.length == 5)) {
                            $(".winning-message").addClass("showClass");
                            $(".whoWin").html("Tie Game!");
                        }
                    }
                }
            }
        };

    });
    // Final And Restart Screen
    $(".restartButton").click(function () {
        $(".winning-message").removeClass("showClass");
        $(".board").css("display", "none");
        $(".letsPlay").css("display", "grid");
        $(".cell").removeClass("circle");
        $(".cell").removeClass("x");
        combosX = [];
        combosO = [];
    });

    // Minimax Algirthm
    function minimax(combosXcopy, combosOcopy) {
        let uO = 0; // for selecting element of minimaxO array.
        let uX = 0; // for selecting element of minimaxX array.
        let uS = -1; // for selecting element of scores array.
        let emptyCells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        var bestScore = -80;
        const minimaxX = new Array();
        const minimaxO = new Array();
        for (let i = 0; i < (9 - (combosOcopy.length + combosXcopy.length)); i++ ) {
            minimaxX[i] = [...combosXcopy];
            minimaxO[i] = [...combosOcopy];
        }
        emptyCells = emptyCells.filter(n => !minimaxX[0].includes(n));
        emptyCells = emptyCells.filter(n => !minimaxO[0].includes(n));

        console.log(emptyCells);

        let scores = new Array();
        for (let i = 0; i < emptyCells.length; i++){
            scores.push(0); // for defining scores as elements of emptyCells array. 
        }
        //console.log(XorOminimax);
        checkWin();
        function checkWin() {
            if (XorOminimax) {
                for (const emptyCell of emptyCells) {
                    minimaxX[uX].push(emptyCell);
                    //console.log(minimaxX[uX]);
                    for (const [t, y, z] of winCombos) {
                        if (minimaxX[uX].includes(y) && minimaxX[uX].includes(t) && minimaxX[uX].includes(z)) {
                            uS++;
                            scores[uS] = scores[uS] + pcXadvantage;
                            return scores[uS];
                        } else if (minimaxO[uX].length < 5 && minimaxX[uO].length < 5) {
                            //console.log(emptyCell);
                            XorOminimax = false; //for X turn or Circle turn.
                            uX++;
                            uS++;
                            scores[uS] = (scores[uS] + pcOadvantage) + minimax(minimaxX[uX], minimaxO[uX]);
                            console.log(scores[uS]);
                            return scores[uS];
                            
                        } else {
                            uS++;
                            console.log(scores[uS]);
                            return scores[uS];
                        }
                    }
                }
            }

            else {
                for (const emptyCell of emptyCells) {
                    minimaxO[uO].push(emptyCell);
                    //console.log(minimaxO[uO]);
                    for (const [t, y, z] of winCombos) {
                        if (minimaxO[uO].includes(y) && minimaxO[uO].includes(t) && minimaxO[uO].includes(z)) {
                            uS++;
                            scores[uS] = scores[uS] + pcOadvantage;
                            console.log(scores[uS]);
                            return scores[uS];
                        }
                        else {
                            //console.log(uO, " circle");
                            XorOminimax = true; // for X turn or circle turn.
                            uO++;
                            uS++;
                            scores[uS] = (scores[uS] + pcXadvantage) + minimax(minimaxX[uX], minimaxO[uO]);
                            console.log(scores[uS]);
                            return scores[uS];
                        }
                    }
                }
            }
        }
        for (let i = 0; i < scores.length; i++) {
            if (scores[i] > bestScore) {
                bestScore = scores[i];
                pcPut = emptyCells[i];
            }
        }
        console.log(bestScore);
        console.log(pcPut);
        return bestScore;
    }
});
