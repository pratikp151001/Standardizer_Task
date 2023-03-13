$(document).ready(function () {

  jQuery("#Searchbtn").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    jQuery("#DestinationAccountList div").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
  //   // When the user scrolls the page, execute myFunction
  // window.onscroll = function() {myFunction()};

  // // Get the navbar
  // var navbar = document.getElementById("NavBar");

  // // Get the offset position of the navbar
  // var sticky = navbar.offsetTop;

  // // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
  // function myFunction() {debugger
  //   if (window.pageYOffset >= sticky) {
  //     navbar.classList.add("sticky")
  //   } else {
  //     navbar.classList.remove("sticky");
  //   }
  // }
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
      "<div class='Item' id='" +
      SourceAccountData[i].Number +
      "'> " +
      SourceAccountData[i].Number +
      " " +
      SourceAccountData[i].Name +
      "<i class='fa-solid fa-clock-rotate-left history'></i> <i class='bi bi-check2-all doubleRight'></i></div>";
    mostLickely +=
      "<div class='Item' id='" + SourceAccountData[i].Number + "ML'></div>";
    likely +=
      "<div class='Item'  id='" + SourceAccountData[i].Number + "L'></div>";
    possible +=
      "<div class='Item POSSIBLE' id='P" +
      SourceAccountData[i].Number +
      "' ></div>";
  }
  $("#SourceAccountList").html(list);
  $("#Mostlikely").html(mostLickely);
  $("#likely").html(likely);
  $("#possibleList").html(possible);

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
    mostLickely = "";
    likely = "";
    possible = "";
    SourceData = SourceAccountData.filter(function (Data) {
      // debugger;
      if (Data.Type.toUpperCase() == AccType.toUpperCase()) {
        if (Data.Number == "") {
        } else {
          list += "<li class='Item'>" + Data.Number + "-" + Data.Name + "</li>";
          mostLickely += "<div class='Item' id='" + Data.Number + "ML'></div>";
          likely += "<div class='Item'  id='" + Data.Number + "L'></div>";
          possible +=
            "<div class='Item POSSIBLE' id='P" + Data.Number + "' ></div>";
          // console.log(Data);
        }
      }
      return Data;
    });
    $("#SourceAccountList").html(list);
    $("#Mostlikely").html(mostLickely);
    $("#likely").html(likely);
    $("#possibleList").html(possible);
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
          // console.log(Data);
        }
        return Data;
      }
    });

    $("#DestinationAccountList").html(destinationList);
  }
  new Sortable(DestinationAccountList, {
    group: {
      name: "shared",
      pull: "clone", // To clone: set pull to 'clone'
    },
    animation: 150,
  });

  new Sortable(P1002, {
    group: {
      name: "shared",
      pull: "clone", // To clone: set pull to 'clone'
    },
    animation: 150,
  });
  // var nestedSortables=$(".POSSIBLE")

  // for (var i = 0; i < nestedSortables.length; i++) {
  // 	new Sortable(nestedSortables[i], {
  // 		group: 'nested',
  // 		animation: 150,
  // 		fallbackOnBody: true,
  // 		swapThreshold: 0.65,
  //   //   onSort: function (e) {
  //   //     var items = e.to.children;
  //   //     var result = [];
  //   //     for (var i = 0; i < items.length; i++) {
  //   //         result.push($(items[i]).data('id'));
  //   //     }

  //   //     $('#standard_order').val(result);
  //   // }
  // 	});
  // }
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
