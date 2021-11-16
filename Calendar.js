var daysOfWeek = ["Pazar", "Ptesi", "Salı", "Çarş", "Perş", "Cuma", "Ctesi"];
var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var monthArray = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];
let currentMonth = document.querySelector(".month");
let currentYear = document.querySelector(".year");
var todayDate = new Date();
var today = todayDate.getDate();
currentYear.text = todayDate.getFullYear();
currentMonth.text = todayDate.getMonth();
var lastDay = monthDays[currentMonth.text];
var date = new Date(currentYear.text, currentMonth.text, 01);
var firstDay = date.getDay();
var counter = 1;

change();
yearChange();

function monthChange() {
  var date = new Date();
  var todayy = new Date(currentYear.text, currentMonth.text, date.getDate());

  var tableDom = document.querySelector(".table");
  let mainTr = document.createElement("tr");
  mainTr.setAttribute("class", "calendar");
  tableDom.appendChild(mainTr);

  calendar = document.querySelector(".calendar");
  for (let tr = 0; tr < 7; tr++) {
    var trDom = document.createElement("tr");
    for (let td = 0; td < 7; td++) {
      if (tr == 0) {
        let tdHead = document.createElement("td");
        tdHead.innerHTML = daysOfWeek[td];
        tdHead.setAttribute("class", "day");
        trDom.appendChild(tdHead);
        calendar.appendChild(trDom);
      } else if (tr == 1 && td < firstDay) {
        let thDom = document.createElement("td");
        trDom.appendChild(thDom);
        calendar.appendChild(trDom);
      } else if (counter <= lastDay) {
        let thDom = document.createElement("td");
        let input = document.createElement("input");
        if (
          todayy.getDate() == counter &&
          date.getMonth() == currentMonth.text &&
          date.getFullYear() == currentYear.text
        ) {
          input.setAttribute("id", "today");
        }
        input.type = "button";
        input.setAttribute("class", "day");
        input.setAttribute("onclick", "dayClick()");
        input.value = counter;
        thDom.appendChild(input);
        trDom.appendChild(thDom);
        calendar.appendChild(trDom);
        counter++;
      }
      if (counter > lastDay) {
        break;
      }
    }
  }
}

function change() {
  if (document.querySelector(".month").childNodes.length == 0) {
    monthArray.forEach((element) => {
      let option = document.createElement("option");
      if (element == monthArray[currentMonth.text]) {
        option.setAttribute("selected", "");
      }
      option.text = element;
      currentMonth.appendChild(option);
    });
    monthChange();
  } else {
    var month = document.querySelector(".month").value;
    getDateSelected(monthArray.indexOf(month));
    counter = 1;
    calendar.remove();
    monthChange();
  }
}

function yearChange() {
  if (document.querySelector(".year").childNodes.length == 0) {
    for (let i = 2000; i < 2999; i++) {
      let option = document.createElement("option");
      if (i == currentYear.text) {
        option.setAttribute("selected", "");
      }
      option.text = i;
      option.setAttribute("id", `year${i}`);
      currentYear.appendChild(option);
    }
  } else {
    var test = document.querySelector(".month").value;
    var yearTest = document.querySelector(".year").value;
    currentYear.text = yearTest;
    getDateSelected(monthArray.indexOf(test));
    counter = 1;
    calendar.remove();
    monthChange();
  }
}

function getDateSelected(monthIndex) {
  todayDate = new Date(currentYear.text, monthIndex, 01);
  today = todayDate.getDate();
  currentYear.text = todayDate.getFullYear();
  currentMonth.text = todayDate.getMonth();
  lastDay = monthDays[currentMonth.text];
  date = new Date(currentYear.text, currentMonth.text, 01);
  firstDay = date.getDay();
}

function increaseDecrease(sign) {
  if (sign == "+") {
    if (currentMonth.text == 11) {
      currentYear.text = parseInt(currentYear.text) + 1;
      currentMonth.text = currentMonth.text + 1;
      let current = document.querySelectorAll("#" + "year" + currentYear.text);
      var select = document.querySelectorAll("[selected]");
      select[1].removeAttribute("selected");
      current[0].setAttribute("selected", "");
      date = new Date(currentYear.text, currentMonth.text, 01);
    } else {
      currentMonth.text = currentMonth.text + 1;
      date = new Date(currentYear.text, currentMonth.text, 01);
    }
  } else {
    if (currentMonth.text == 0) {
      currentMonth.text = 11;
      var select = document.querySelectorAll("[selected]");
      let current = document.querySelectorAll("#" + "year" + select[1].text);
      current[0].removeAttribute("selected");
      current[0].text = current[0].text - 1;
      currentYear = current[0];

      current[0].setAttribute("selected", "");
      date = new Date(currentYear.text, currentMonth.text, 01);
    } else {
      currentMonth.text = currentMonth.text - 1;
      date = new Date(currentYear.text, currentMonth.text, 01);
    }
  }
  lastDay = monthDays[currentMonth.text];
  firstDay = date.getDay();
  getDateSelected(currentMonth.text);

  var select = document.querySelector("[selected]");
  select.removeAttribute("selected");
  currentMonth[currentMonth.text].setAttribute("selected", "");

  counter = 1;
  calendar.remove();
  monthChange();
}

function dayClick() {
  let today = document.querySelector(".today");
  let day = document.querySelectorAll(".day");
  day.forEach((element) => {
    element.onclick = () => {
      let date = new Date(currentYear.text, currentMonth.text, element.value);
      let firstDay = date.getDay();
      today.innerHTML = `${daysOfWeek[firstDay]}  ${element.value}`;
    };
  });
}
