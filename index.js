/* dataOriginal 이용 가능 (배열) */
var tableMain = document.getElementById("tableMain");
var lengthTable = dataOriginal.length;

var ratioMainWidth = 60;
var ratioMainHeight = 30;
var ratioBarHeight = 2;

function compaireFunc(key) {
  return function(a, b) {
    return b[key] - a[key];
  };
}

function pickHex(color1, color2, weight) {
  var w1 = weight;
  var w2 = 1 - w1;
  var rgb = [
    Math.round(color1[0] * w1 + color2[0] * w2),
    Math.round(color1[1] * w1 + color2[1] * w2),
    Math.round(color1[2] * w1 + color2[2] * w2)
  ];
  return rgb;
}

function showAll() {
  var m1 = document.querySelector('input[name="m1"]:checked').value;
  var rows = document.getElementsByClassName("rowTableMain");

  for (var i = 0; i < lengthTable; i++) {
    var current_mFull = dataOriginal[i]["mFull"];
    var current_movesNumZ = dataOriginal[i]["movesNumZ"];
    var current_tPNvalueZ = dataOriginal[i]["tPNvalueZ"];
    var current_playNumZ = dataOriginal[i]["playNumZ"];
    var current_drawRate = dataOriginal[i]["drawRate"];
    var current_wWinRateGap = dataOriginal[i]["wWinRateGap"];
    var current_wWinRate = dataOriginal[i]["wWinRate"];
    var current_bWinRate = dataOriginal[i]["bWinRate"];
    var current_mBefore = dataOriginal[i]["mBefore"];
    var current_mThis = dataOriginal[i]["mThis"];
    var current_stage = dataOriginal[i]["stage"];

    var row = tableMain.insertRow(i + 1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);

    row.classList.add("rowTableMain");
    row.classList.add("row" + "m" + current_stage);
    row.setAttribute("id", "row" + current_mFull);

    cell1.innerHTML =
      "<label><input type='button' class='btnMove' id=" +
      current_mFull +
      "/>&#128073;</label>";
    cell2.innerHTML = current_mBefore;
    cell3.innerHTML = current_mThis;

    /* rect Main below */
    var rectMain = document.createElement("div");
    var rectMainWidth = current_movesNumZ * ratioMainWidth;
    var rectMainHeight = current_playNumZ * ratioMainHeight;

    var currentWeight = current_tPNvalueZ / 6 + 1;
    var rectMainColor = pickHex("#FF3130", "#33D71E", currentWeight);

    rectMain.style.width = rectMainWidth + "px";
    rectMain.style.height = rectMainHeight + "px";
    rectMain.style.backgroundColor = rectMainColor;

    rectMain.classList.add("rectMain");

    cell4.appendChild(rectMain);

    /* 3 bars below */
    var wWinRateResult;
    var bWinRateResult;
    if (current_wWinRateGap >= 0) {
      wWinRateResult = current_wWinRateGap;
      bWinRateResult = 0;
    } else {
      bWinRateResult = -current_wWinRateGap;
      wWinRateResult = 0;
    }

    var rectBarW = document.createElement("div");
    var rectBarDraw = document.createElement("div");
    var rectBarB = document.createElement("div");

    rectBarW.style.height = wWinRateResult + "px";
    rectBarDraw.style.height = current_drawRate + "px";
    rectBarB.style.height = bWinRateResult + "px";

    rectBarW.classList.add("barRate");
    rectBarDraw.classList.add("barRate");
    rectBarB.classList.add("barRate");

    cell5.appendChild(rectBarW);
    cell6.appendChild(rectBarDraw);
    cell7.appendChild(rectBarB);
  }
}
