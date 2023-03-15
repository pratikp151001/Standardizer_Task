$(document).ready(function () {
  jQuery("#Searchbtn").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    jQuery("#DestinationAccountList div").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });

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
    if (SourceAccountData[i].Number != "") {
      list +=
        "<div class='Item SourceDATA' id='" +
        SourceAccountData[i].Number +
        "' data-type='" +
        SourceAccountData[i].Type +
        "'> " +
        SourceAccountData[i].Number +
        " " +
        SourceAccountData[i].Name +
        "<i class='fa-solid fa-clock-rotate-left history'></i> <i class='bi bi-check2-all doubleRight'></i></div>";
      mostLickely +=
        "<div class='Item Most_Likely' id='ML" +
        SourceAccountData[i].Number +
        "'></div>";
      likely +=
        "<div class='Item LIKELY'  id='L" +
        SourceAccountData[i].Number +
        "'></div>";
      possible +=
        "<div class='Item POSSIBLE' id='P" +
        SourceAccountData[i].Number +
        "' ></div>";

      // new Sortable($(`#ML${SourceAccountData[i].Number}`), {
      //   group: {
      //     name: "shared",
      //     pull: "true", // To clone: set pull to 'clone'
      //   },
      //   animation: 150,
      // });
    }
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
    $("#horizontal" + ClickedBtn + "").trigger("click");
    $("#horizontal" + ClickedBtn + "").focus()
    DataSourceAccountDisplay(ClickedBtn);
    // $("#horizontal" + ClickedBtn + "").trigger("click");
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
    // debugger
    // console.log(SourceAccountData)
    // for (let i = 0; i < SourceAccountData.length; i++) {
    //   // var id = $(".SourceDATA")[i].id;

    $.each($(".SourceDATA"), function () {
      // debugger
      
      id = this.id;
      // console.log(id)
      $(`#${id}`).hide();
      $(`#ML${id}`).hide();
      $(`#L${id}`).hide();
      $(`#P${id}`).hide();

      var Account_Type= $(`#${id}`).data('type')

      

      // new Sortable(  $(`#P${id}`), {
      //   group: {
      //     name: "shared",
      //     pull: "true", // To clone: set pull to 'clone'
      //   },
      //   animation: 150,
      // });
      if (
        Account_Type.toUpperCase().trim() == AccType.toUpperCase().trim()
      ) {
        // console.log("ascfa", SourceAccountData[i].Type.toUpperCase())
        // console.log(AccType.toUpperCase())

        // if (SourceAccountData[i].Number == "") {
        // } else {
        // var id = $(".SourceDATA")[i].id;
        $(`#ML${id}`).show();
        $(`#L${id}`).show();
        $(`#P${id}`).show();
        $(`#${id}`).show();
        // }

        // }
      }
    });
    // var Most_LikelyId = $(".Most_Likely")[i].id;
    // var LikelyId = $(".LIKELY")[i].id;

    //  console.log(typeof(id))
    //$('#'+id).show();

    // $("#SourceAccountList").html(list);
    // $("#Mostlikely").html(mostLickely);
    // $("#likely").html(likely);
    // $("#possibleList").html(possible);
  }
  function DataDestination(AccountType) {
    // debugger
    // alert(AccountType);
    destinationList = "";
    ResultData = destinationData.filter(function (Data) {
      if(destinationData.AccountCode!=""){
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
        if (Data.AccountTypeName.toUpperCase().includes(AccountType)){
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
    }
    });

    $("#DestinationAccountList").html(destinationList);
  }
  new Sortable(DestinationAccountList, {
    group: {
      name: "shared",
      pull: "clone",
      put: false, // To clone: set pull to 'clone'
    },
    animation: 150,
    sort:false
  });

  // new Sortable(P1003, {
  //   group: {
  //     name: "shared",
  //     pull: "true", // To clone: set pull to 'clone'
  //   },
  //   animation: 150,
  // });

  $.each($('.POSSIBLE'), function () {
    // id = "P"+this.id;
    // console.log(typeof(id))

    new Sortable(this, {
      group: {
        name: "shared",
        put: function (to, from, dragEl, evt) {
      // Remove any existing items in the droppable area
      if (to.el.children.length > 0) {
        to.el.removeChild(to.el.children[0]);
      }
      // Allow the item to be dropped
      return true;
    } // To clone: set pull to 'clone'
      },
      animation: 150,
    
    })
  })
  $.each($('.LIKELY'), function () {
    // id = "P"+this.id;
    // console.log(typeof(id))

    new Sortable(this, {
      group: {
        name: "shared", 
      },
      animation: 150,
    
    })
  })
  $.each($('.Most_Likely  '), function () {
    // id = "P"+this.id;
    // console.log(typeof(id))

    new Sortable(this, {
      group: {
        name: "shared", 
      },
      animation: 150,
    
    })
  })

  $("#ASSETSBTN").trigger('click')
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
  }
  // console.log(result)
  return result;
}

function check(destinationData) {
  return destinationData.AccountTypeName == AccountType;
}
