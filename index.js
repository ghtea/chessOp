/* 이용 가능한 것들
dataOriginal (배열) 
pSBC (함수)
*/
var tableMain = document.getElementById("tableMain");
var lengthTable = dataOriginal.length;

var currentStage;

var startMainWidth = 20;
var ratioMainWidth = 60;
var startMainHeight = 10;
var ratioMainHeight = 30;
var ratioBarHeight = 2.5;

var colorPiece = "#33D71E";
var colorFight = "#FF3130";

function compaireFunc(key) {
  return function(a, b) {
    return b[key] - a[key];
  };
}

function showAll() {
  var currentMove1 = document.querySelector('input[name="m1"]:checked').value;

  for (var i = 0; i < lengthTable; i++) {
    var this_mFull = dataOriginal[i]["mFull"];
    var this_movesNumZ = dataOriginal[i]["movesNumZ"];
    var this_tPNvalueZ = dataOriginal[i]["tPNvalueZ"];
    var this_playNumZ = dataOriginal[i]["playNumZ"];
    var this_drawRate = dataOriginal[i]["drawRate"];
    var this_wWinRateGap = dataOriginal[i]["wWinRateGap"];
    var this_wWinRate = dataOriginal[i]["wWinRate"];
    var this_bWinRate = dataOriginal[i]["bWinRate"];
    var this_mBefore = dataOriginal[i]["mBefore"];
    var thismThis = dataOriginal[i]["mThis"];
    var this_stage = dataOriginal[i]["stage"];

    var this_row = tableMain.insertRow(i + 1);
    var cell1 = this_row.insertCell(0);
    var cell2 = this_row.insertCell(1);
    var cell3 = this_row.insertCell(2);
    var cell4 = this_row.insertCell(3);
    var cell5 = this_row.insertCell(4);
    var cell6 = this_row.insertCell(5);
    var cell7 = this_row.insertCell(6);

    this_row.classList.add("rowTableMain");
    this_row.classList.add("row" + "m" + this_stage);
    this_row.setAttribute("id", "row" + this_mFull);

    cell1.innerHTML =
      "<label><input type='button' class='btnMove' id=" +
      this_mFull +
      "/>&#128073;</label>";
    cell2.innerHTML = this_mBefore;
    cell3.innerHTML = this_mThis;

    /* rect Main below */
    var rectMain = document.createElement("div");
    var rectMainWidth = startMainWidth + this_movesNumZ * ratioMainWidth;
    var rectMainHeight = startMainHeight + this_playNumZ * ratioMainHeight;

    var currentWeight = this_tPNvalueZ;
    console.log(rectMainColor);
    var rectMainColor = pSBC(currentWeight, colorPiece, colorFight);

    rectMain.style.width = rectMainWidth + "px";
    rectMain.style.height = rectMainHeight + "px";
    rectMain.style.backgroundColor = rectMainColor;

    rectMain.classList.add("rectMain");

    cell4.appendChild(rectMain);

    /* 3 bars below */
    var wWinRateResult;
    var bWinRateResult;
    if (this_wWinRateGap >= 0) {
      wWinRateResult = this_wWinRateGap;
      bWinRateResult = 0;
    } else {
      bWinRateResult = -this_wWinRateGap;
      wWinRateResult = 0;
    }

    var rectBarW = document.createElement("div");
    var rectBarDraw = document.createElement("div");
    var rectBarB = document.createElement("div");

    rectBarW.style.height = wWinRateResult + "px";
    rectBarDraw.style.height = this_drawRate + "px";
    rectBarB.style.height = bWinRateResult + "px";

    rectBarW.classList.add("barRate");
    rectBarDraw.classList.add("barRate");
    rectBarB.classList.add("barRate");

    cell5.appendChild(rectBarW);
    cell6.appendChild(rectBarDraw);
    cell7.appendChild(rectBarB);
  }

  var btnsMove = document.getElementsByClassName("btnMove");
  for (var i = 0; i < lengthTable; i++) {
    btnsMove[i].addEventListener("click", showHide);
  }
}

function showHide() {
  currentStage = this.getAttribute("id");
  for (var i = 0; i < lengthTable; i++) {
    var this_row = document.getElementsByClassName("rowTableMain")[i];
    var this_stage = dataOriginal[i]["stage"];
    if (currentStage == this_stage) {
      this_row.classList.remove("rowHide");
    } else {
      this_row.classList.add("rowHide");
    }
  }
}

window.onload = showAll();
