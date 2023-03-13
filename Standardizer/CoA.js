$(document).ready(function () {
  //   var hackerList = new List('DestinationAccOunT', options);
  //   var options = {
  //     valueNames: [ 'Items']
  // };

  // var monkeyList = new List('DestinationAccountList', {
  //   valueNames: ['Item']
  // });

  // dragula(
  //   [
  //     document.querySelector("#DestinationAccountList"),
  //     document.querySelector("#Possible"),
  //   ],
  //   {
  //     copy: function (el, source) {
  //       return source === document.querySelector("#DestinationAccountList");
  //     },
  //   }
  // );
  // $("#horizontalAll").trigger("click");

  //DEstinationData
  var destinationData;
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    destinationData = this.responseText;
    //console.log(destinationData)
  };
  xhttp.open("GET", "./DataFiles/MasterChartOfAcounts - Sheet1.csv", false);
  xhttp.send();
  destinationData = CSVtoJSON(destinationData);
  // console.log(destinationData)

  //Source Account Data
  var SourceAccountData;
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    SourceAccountData = this.responseText;
    // console.log(destinationData)
  };
  xhr.open("GET", "./DataFiles/Standard CofA.csv", false);
  xhr.send();
  SourceAccountData = CSVtoJSON(SourceAccountData);

  //    //console.log(SourceAccountData)
  list = "";
  mostLickely = "";
  likely = "";
  possible = "";
  for (let i = 1; i < SourceAccountData.length; i++) {
    // if(SourceAccountData[i].Type=="Assets")
    // list+=" <div class='dragableDiv'>"+SourceAccountData[i].Number+"</div>"
    list +=
      "<div class='Item'> " +
      SourceAccountData[i].Number +
      " " +
      SourceAccountData[i].Name +
      "<i class='fa-solid fa-clock-rotate-left history'></i> <i class='bi bi-check2-all doubleRight'></i></div>";
    mostLickely += "<div class='Item'></div>";
    likely += "<div class='Item'></div>";
    possible += "<div class='Item'></div>";
  }
  $("#SourceAccountList").html(list);
  $("#Mostlikely").html(mostLickely);
  $("#likely").html(likely);
  $("#Possible").html(possible);

  destinationList = "";
  for (let j = 0; j < destinationData.length; j++) {
    destinationList +=
      "<div class='Item'>⠿" +
      destinationData[j].AccountCode +
      "-" +
      destinationData[j].AccountName +
      "</div>";
  }
  $("#DestinationAccountList").html(destinationList);

  $(".accountTypebtn").click(function () {
    $(".accountTypebtn").removeClass("activebtn");
    $(this).addClass("activebtn");
    let ClickedBtn = $(this).data("val");
    DataSourceAccountDisplay(ClickedBtn);
    $("#horizontal" + ClickedBtn + "").trigger("click");
  });
  $(".horizontalDesBtn").click(function () {
    $(".horizontalDesBtn").removeClass("activeHorizontalbtn");
    $(this).addClass("activeHorizontalbtn");
    let clickedHorizontalBtn = $(this).data("value").toUpperCase();
    //alert(clickedHorizontalBtn)
    DataDestination(clickedHorizontalBtn);
  });

  $("#forwordbtn").click(function () {
    document.getElementById("Desbuttonslist").scrollLeft -= 100;
  });
  $("#backwordbtn").click(function () {
    document.getElementById("Desbuttonslist").scrollLeft += 100;
  });

  function DataSourceAccountDisplay(AccType) {
    //alert(AccType)
    list = "";
    SourceData = SourceAccountData.filter(function (Data) {
      // debugger;
      if (Data.Type.toUpperCase() == AccType.toUpperCase()) {
        if (Data.Number == "") {
        } else {
          list += "<li class='Item'>" + Data.Number + "-" + Data.Name + "</li>";
          console.log(Data);
        }
      }
      return Data;
    });
    $("#SourceAccountList").html(list);
  }
  function DataDestination(AccountType) {
    // alert(AccountType);
    destinationList = "";
    ResultData = destinationData.filter(function (Data) {
      if (AccountType == "ALL") {
        for (let j = 0; j < destinationData.length; j++) {
          destinationList +=
            "<div class='Item'>⠿" +
            destinationData[j].AccountCode +
            "-" +
            destinationData[j].AccountName +
            "</div>";
        }
      } else {
        if (Data.AccountTypeName == AccountType) {
          destinationList +=
            "<div class='Item'>⠿" +
            Data.AccountCode +
            "-" +
            Data.AccountName +
            "</div>";
          console.log(Data);
        }
        return Data;
      }
    });

    $("#DestinationAccountList").html(destinationList);
  }
    new Sortable(DestinationAccountList, {
      group: {
          name: 'shared',
          pull: 'clone' // To clone: set pull to 'clone'
      },
      animation: 150
  });
});

//CSV to Json
function CSVtoJSON(csv) {
  var lines = csv.split("\n");
  var result = [];
  var headers = lines[0].split(",");
  for (var i = 1; i < lines.length; i++) {
    var obj = {};
    var currentline = lines[i].split(",");

    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);
    // console.log(result)
  }
  return result;
}

function check(destinationData) {
  return destinationData.AccountTypeName == AccountType;
}
