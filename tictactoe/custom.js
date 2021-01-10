$(document).ready(function () {
    var a = true;
    var selectionXO = false;
    var selectionTwo = false;
    var selectionOneTwo = false;
    var Players = null;
    var Letter = 5;
    var putXorO = true;
    var pcPut = 0;
    var emptyCells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
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
            putXorO = true;
        }
    });
    $("input[value='O']").click(function () {
        if (a) {
            $(".putO").addClass('selected-type');
            $(".putX").removeClass('selected-type');
            selectionXO = true;
            Letter = 2;
            putXorO = false;
        }
    });
    /*Game Starter*/
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
        } else if (Letter == 1) {
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
                minimax();
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
                //putXorO = false;
            }
        } else if (Letter == 2) {
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
            //putXorO = true;
            minimax();
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

        /* else if (!putXorO) {
               $(this).addClass("circle");
               combosO.push(parseInt($(this).attr("id")));
               checkWin();
               for (const [t, y, z] of winCombos) {
                   if (combosO.includes(y) && combosO.includes(t) && combosO.includes(z)) {
                       $(".winning-message").addClass("showClass");
                       $(".whoWin").html("Player 1 Won!");
                   } else if ((combosO.length == 4 && combosX == 5) || (combosX.length == 4 && combosO == 5)) {
                       $(".winning-message").addClass("showClass");
                       $(".whoWin").html("Tie Game!");
                   }
               }
               putXorO = true;
           } */

    });

    $(".restartButton").click(function () {
        $(".winning-message").removeClass("showClass");
        $(".board").css("display", "none");
        $(".letsPlay").css("display", "grid");
        $(".cell").removeClass("circle");
        $(".cell").removeClass("x");
        combosX = [];
        combosO = [];
    });


    function minimax() {
        var scores = [0, 0, 0, 0, 0, 0, 0, 0];
        var minimaxX = combosX;
        var minimaxO = combosO;
        var bestScore = -30;
        emptyCells = emptyCells.filter(n => !minimaxX.includes(n));
        emptyCells = emptyCells.filter(n => !minimaxO.includes(n));
        console.log(emptyCells);
        let i = 0;
        var checkWinX = function () {
            for (const [t, y, z] of winCombos) {
                if (minimaxX.includes(y) && minimaxX.includes(t) && minimaxX.includes(z)) {
                    scores[i] = scores[i] + 10;
                } else {
                    scores[i] = scores[i] - 10;
                }
            }
        }
        var checkWinO = function () {
            for (const [t, y, z] of winCombos) {
                if (minimaxO.includes(y) && minimaxO.includes(t) && minimaxO.includes(z)) {
                    scores[i] = scores[i] - 10;
                }
            }
        }
        if (Letter = 1) {
            for (i = 0; i < emptyCells.length; i++) {
                minimaxX.push(emptyCells[i]);
                checkWinX();
                minimaxO.push(emptyCells[i + 1]);
                checkWinO();
                minimaxX.push(emptyCells[i + 2]);
                checkWinX();
                minimaxO.push(emptyCells[i + 3]);
                checkWinO();
            }
            for (let e = 0; e < emptyCells.length; e++) {
                if (bestScore < scores[e]) {
                    pcPut = emptyCells[e];
                }
            }
        }
    }
});