/* 이용 가능한 것들
dataOriginal (배열) 
pSBC (함수)
*/
var btnsM1 = document.getElementsByClassName("btnM1");
var currentMove1;
var tableMain = document.getElementById("tableMain");
var lengthTable = dataOriginal.length;

var currentStage;

var startMainWidth = 20;
var ratioMainWidth = 60;
var startMainHeight = 10;
var ratioMainHeight = 30;

var ratioBarHeight = 1.2;

var colorPiece = "#33D71E";
var colorFight = "#FF3130";

function compaireFunc(key) {
  return function(a, b) {
    return b[key] - a[key];
  };
}

function showAll() {
  currentMove1 = "e4";
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
    var this_mThis = dataOriginal[i]["mThis"];
    var this_stage = dataOriginal[i]["stage"];

    var this_row = tableMain.insertRow(i + 1);
    var cell1 = this_row.insertCell(0);
    var cell2 = this_row.insertCell(1);
    var cell3 = this_row.insertCell(2);
    var cell4 = this_row.insertCell(3);
    var cell5 = this_row.insertCell(4);
    var cell6 = this_row.insertCell(5);

    this_row.classList.add("rowTableMain");
    this_row.classList.add("row" + "m" + this_stage);
    this_row.setAttribute("id", "row" + this_mFull);

    var edittedText1 = this_mBefore.replace(/(\s\S+)$/, "");
    console.log(edittedText1);
    var edittedText2 = edittedText1.replace(/ /g, "_");
    console.log(edittedText2);

    cell1.innerHTML =
      "<label>" +
      "<input type='button' class = 'btnMoveBefore' value =" +
      edittedText2 +
      ">" +
      this_mBefore +
      "</label>";

    /*  belows don't work... so I tried like next
    var labelMain = document.createElement("label");
    var inputBtnMain = document.createElement("input");
    inputBtnMain.setAttribute("type", "button");
    inputBtnMain.classList.add("btnMove");
    inputBtnMain.setAttribute("id", this_mFull);

    labelMain.appendChild(inputBtnMain);
    labelMain.textContent = this_mThis;
    cell2.appendChild(labelMain);
    */

    cell2.innerHTML =
      "<label>" +
      "<input type='button' class = 'btnMove' value =" +
      this_mFull.replace(/ /g, "_") +
      ">" +
      this_mThis +
      "</label>";

    /* rect Main below */
    var rectMain = document.createElement("div");
    var rectMainWidth = startMainWidth + this_movesNumZ * ratioMainWidth;
    var rectMainHeight = startMainHeight + this_playNumZ * ratioMainHeight;

    var currentWeight = this_tPNvalueZ;
    var rectMainColor = pSBC(currentWeight, colorPiece, colorFight);

    rectMain.style.width = rectMainWidth + "px";
    rectMain.style.height = rectMainHeight + "px";
    rectMain.style.backgroundColor = rectMainColor;

    rectMain.classList.add("rectMain");
    cell3.appendChild(rectMain);

    /* 3 bars below */
    /*
    var wWinRateResult;
    var bWinRateResult;
    if (this_wWinRateGap >= 0) {
      wWinRateResult = this_wWinRateGap;
      bWinRateResult = 0;
    } else {
      bWinRateResult = -this_wWinRateGap;
      wWinRateResult = 0;
    }
    */

    var rectBarW = document.createElement("div");
    var rectBarDraw = document.createElement("div");
    var rectBarB = document.createElement("div");

    rectBarW.style.height = this_wWinRate * ratioBarHeight + "px";
    rectBarDraw.style.height = this_drawRate * ratioBarHeight + "px";
    rectBarB.style.height = this_bWinRate * ratioBarHeight + "px";

    rectBarW.classList.add("barRate");
    rectBarDraw.classList.add("barRate");
    rectBarB.classList.add("barRate");

    cell4.appendChild(rectBarW);
    cell5.appendChild(rectBarDraw);
    cell6.appendChild(rectBarB);
  }

  var btnsMove = document.getElementsByClassName("btnMove");
  var btnsMoveBefore = document.getElementsByClassName("btnMoveBefore");
  for (var i = 0; i < lengthTable; i++) {
    btnsMove[i].addEventListener("click", hideShowCurrentMove);
    btnsMoveBefore[i].addEventListener("click", hideShowMoveBefore);
  }
  btnsM1[0].addEventListener("click", hideShowM1);
  btnsM1[1].addEventListener("click", hideShowM1);

  /* can't use hideShowM1 because I can't use 'this'  */
  for (var i = 0; i < lengthTable; i++) {
    var this_row = document.getElementsByClassName("rowTableMain")[i];
    var this_mBefore = dataOriginal[i]["mBefore"];

    if (currentMove1 == this_mBefore) {
      this_row.classList.remove("rowHide");
    } else {
      this_row.classList.add("rowHide");
    }
  }
}

function hideShowM1() {
  currentMove1 = this.value;
  for (var i = 0; i < lengthTable; i++) {
    var this_row = document.getElementsByClassName("rowTableMain")[i];
    var this_mBefore = dataOriginal[i]["mBefore"];

    if (currentMove1 == this_mBefore) {
      this_row.classList.remove("rowHide");
    } else {
      this_row.classList.add("rowHide");
    }
  }
}

function hideShowCurrentMove() {
  var clikedMoveFull = this.value;
  for (var i = 0; i < lengthTable; i++) {
    var this_row = document.getElementsByClassName("rowTableMain")[i];
    var this_mBefore = dataOriginal[i]["mBefore"].replace(/ /g, "_");

    if (clikedMoveFull == this_mBefore) {
      this_row.classList.remove("rowHide");
    } else {
      this_row.classList.add("rowHide");
    }
  }
}

function hideShowMoveBefore() {
  /* MoveBefore  를 클릭했을때 적혀져있는 상황의 또 이전 상황을 value 값으로 가져온다 */
  var clikedMoveBefore = this.value;
  for (var i = 0; i < lengthTable; i++) {
    var this_row = document.getElementsByClassName("rowTableMain")[i];
    var this_mBefore = dataOriginal[i]["mBefore"].replace(/ /g, "_");

    if (clikedMoveBefore == this_mBefore) {
      this_row.classList.remove("rowHide");
    } else {
      this_row.classList.add("rowHide");
    }
  }
}

window.onload = showAll();
