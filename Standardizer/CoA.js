$(document).ready(function () {
  jQuery("#Searchbtn").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    jQuery("#DestinationAccountList div").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });

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
    $("#horizontal" + ClickedBtn + "").focus();
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

      var Account_Type = $(`#${id}`).data("type");

      // new Sortable(  $(`#P${id}`), {
      //   group: {
      //     name: "shared",
      //     pull: "true", // To clone: set pull to 'clone'
      //   },
      //   animation: 150,
      // });
      if (Account_Type.toUpperCase().trim() == AccType.toUpperCase().trim()) {
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
    // debugger
    var Sourceheight = document.getElementById("SourceAccountList");
    Sourceheight = Sourceheight.offsetHeight;
    // alert(Sourceheight)
    document.getElementById("DestinationAccountList").style.height =
      Sourceheight + "px";
  }
  function DataDestination(AccountType) {
    // debugger
    // alert(AccountType);
    destinationList = "";
    ResultData = destinationData.filter(function (Data) {
      if (destinationData.AccountCode != "") {
        if (AccountType == "ALL") {
          destinationList +=
            "<div class='Item DESDATA' id='Source" +
            Data.AccountCode +
            "'>⠿" +
            Data.AccountCode +
            "-" +
            Data.AccountName +
            "</div>";
        } else {
          if (Data.AccountTypeName.toUpperCase().includes(AccountType)) {
            destinationList +=
              "<div class='Item DESDATA'id='Source" +
              Data.AccountCode +
              "' >⠿" +
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
    sort: false,
  });

  // new Sortable(P1003, {
  //   group: {
  //     name: "shared",
  //     pull: "true", // To clone: set pull to 'clone'
  //   },
  //   animation: 150,
  // });
  // var divs = document.querySelectorAll("#DestinationAccountList div.DESDATA");
  // console.log(divs)
  // divs.forEach(function (div) {
  //   debugger
  //   console.log(div)
  //   Sortable.create(div, {
  //     group: {
  //       name: "shared",
  //       pull: "clone",
  //     },
  //     animation: 150,
  //     // other Sortable.js options
  //   });
  // });

  var divs = document.querySelectorAll("div.POSSIBLE");
  divs.forEach(function (div) {
    Sortable.create(div, {
      group: {
        name: "shared",
        },
        onAdd: function(evt) {
          evt.to.children[0].classList.remove("Item")
          // console.log(evt.to.children)
          // evt.to.classList.remove("")
          // var AlreadyPresentChildren=evt.to.children[0].id
          // console.log(AlreadyPresentChildren)
          // var newAddedChildren=evt.item.id
          // console.log(newAddedChildren)
          if (evt.to.children.length >1) {
          //   console.log(evt.to.children)
          //   var AlreadyPresentChildren=evt.to.children[1].id
          // console.log(AlreadyPresentChildren)
          // var newAddedChildren=evt.to.children[0].id
          // console.log(newAddedChildren)
            // console.log(evt.to.children[0].id)
            // console.log(evt.to.children[1].id)
            // if(AlreadyPresentChildren==newAddedChildren){
            //   Swal.fire("Duplicate Account")
            // }
            // else{
              console.log("ELse")
            evt.to.removeChild(evt.to.children[1]);
            // }
          }
      },
      animation: 150,
      ghostClass: "ghost",
      // other Sortable.js options
    });
  });

  // $.each($(".POSSIBLE"), function () {
  //   // id = "P"+this.id;
  //   // console.log(typeof(id))

  //   new Sortable(this, {
  //     group: {
  //       name: "shared",
  //       put: function (to, from, dragEl, evt) {
  //         // Remove any existing items in the droppable area
  //         if (to.el.children.length > 0) {
  //           to.el.removeChild(to.el.children[0]);
  //         }

  //         // Allow the item to be dropped
  //         return true;
  //       }, // To clone: set pull to 'clone'
  //     },
  //     animation: 150,
  //   });
  // });

  var divs = document.querySelectorAll("div.Most_Likely");
  divs.forEach(function (div) {
    Sortable.create(div, {
      group: {
        name: "shared",
        // put: function (to, from, dragEl, evt) {
        //   // Remove any existing items in the droppable area
        //   if (to.el.children.length > 0) {
        //     var divID = div.id;

        //     LikelydivID = divID.replace("ML", "L");
        //     PossibledivID = divID.replace("ML", "P");
        //     // console.log(PossibledivID);

        //     LikelyDIV = document.getElementById(LikelydivID);
        //     PossibleDIV = document.getElementById(PossibledivID);
        //     MostLikelyOldItem = to.el.children[0].cloneNode(true);
        //     // console.log(MostLikelyOldItem);

        //     to.el.removeChild(to.el.children[0]);
        //     LikelyDIV.appendChild(MostLikelyOldItem);
        //     if (LikelyDIV.children.length > 1) {
        //       LikelyOldItem = LikelyDIV.children[0].cloneNode(true);
        //       console.log(LikelyOldItem);
        //       PossibleDIV.appendChild(LikelyOldItem);
        //       LikelyDIV.removeChild(LikelyDIV.children[0]);
        //     }

        //     if (PossibleDIV.children.length > 1) {
        //       PossibleDIV.removeChild(PossibleDIV.children[0]);
        //     }
        //   }
        //   // Allow the item to be dropped
        //   return true;
        // },
        
      },
      onAdd: function(evt) {
        // var mostLikelyItem = evt.to.children[0];
        evt.to.children[0].classList.remove("Item")
        // console.log(evt.to.children)
        var divID = div.id;

        LikelydivID = divID.replace("ML", "L");

            PossibledivID = divID.replace("ML", "P");
            // console.log(PossibledivID);
            LikelyDIV = document.getElementById(LikelydivID);
            PossibleDIV = document.getElementById(PossibledivID);
        if (evt.to.children.length >1) {
          var oldMostLikelyitem=evt.to.children[1]
          LikelyDIV.appendChild(oldMostLikelyitem);
          console.log(LikelyDIV.children)
          // evt.to.removeChild(evt.to.children[1]);
        }
        if (LikelyDIV.children.length > 1) {
          var oldLikelyitem=LikelyDIV.children[0]
          console.log(oldLikelyitem)
          PossibleDIV.appendChild(oldLikelyitem);
          // LikelyDIV.removeChild(LikelyDIV.children[1]);
              }
              if (PossibleDIV.children.length > 1) {
               
                PossibleDIV.removeChild(PossibleDIV.children[0]);
                    }

    },
      animation: 150,
      ghostClass: "ghost",
      // other Sortable.js options
    });
  });

  var divs = document.querySelectorAll("div.LIKELY");
  divs.forEach(function (div) {
    // console.log(PossibleDIV);

    Sortable.create(div, {
      group: {
        name: "shared",
        // put: function (to, from, dragEl, evt) {
        //   if (to.el.children.length > 0) {
        //     // Clone the existing item

        //     var divID = div.id;

        //     PossibledivID = divID.replace("L", "P");
        //     // console.log(PossibledivID);

        //     PossibleDIV = document.getElementById(PossibledivID);
        //     oldItem = to.el.children[0].cloneNode(true);
        //     console.log(oldItem);

        //     to.el.removeChild(to.el.children[0]);
        //     PossibleDIV.appendChild(oldItem);
        //     if (PossibleDIV.children.length > 1) {
        //       PossibleDIV.removeChild(PossibleDIV.children[0]);
        //     }
        //   }
        //   return true;
        // },
      },
      onAdd: function(evt) {
        // console.log(evt.to.children)
        evt.to.children[0].classList.remove("Item")
        var divID = div.id;

            PossibledivID = divID.replace("L", "P");
            // console.log(PossibledivID);

            PossibleDIV = document.getElementById(PossibledivID);
        if (evt.to.children.length >1) {
         
          var olditem=evt.to.children[1]
          PossibleDIV.appendChild(olditem);
          // evt.to.removeChild(evt.to.children[1]);
        }
        if (PossibleDIV.children.length > 1) {
                PossibleDIV.removeChild(PossibleDIV.children[0]);
              }

    },
      animation: 150,
      ghostClass: "ghost",
      // other Sortable.js options
    });
    // Sortable.create(PossibleDIV, {
    //   group: {
    //     name: "shared",
    //     put: function (to, from, dragEl, evt) {
    //       if (to.el.children.length > 0) {
    //         // Clone the existing item
    //         oldItem = to.el.children[0].cloneNode(true);
    //         console.log(oldItem);

    //         to.el.removeChild(to.el.children[0]);
    //       }
    //       return true;
    //     },
    //   },
    //   animation: 150,
    //   ghostClass: "ghost",
    //   // other Sortable.js options
    // });
  });

  // $.each($('.Most_Likely  '), function () {
  //   // id = "P"+this.id;
  //   // console.log(typeof(id))

  //   new Sortable(this, {
  //     group: {
  //       name: "shared",
  //     },
  //     animation: 150,

  //   })
  // })

  $(document).on("click", "#submitbtn", function () {
    var AccountChartDetails = new Array();
    for (let i = 0; i < SourceAccountData.length; i++) {
      var Dataobj = {
        id: SourceAccountData[i].Number,
        MostLickely: $("#ML" + SourceAccountData[i].Number).html(),
        Lickely: $("#L" + SourceAccountData[i].Number).html(),
        Possible: $("#P" + SourceAccountData[i].Number).html(),
      };
      AccountChartDetails.push(Dataobj);
    }

    localStorage.setItem(
      "AccountChartData",
      JSON.stringify(AccountChartDetails)
    );

    DATE=getFormattedDate()
     $("#lastUpdate").text("Last Updated on"+DATE)
  });

  //  Get Data From Local Storage
  var AccountChartsData = JSON.parse(localStorage.getItem("AccountChartData"));
  if (AccountChartsData) {
    for (let i = 0; i < AccountChartsData.length; i++) {
      if (
        AccountChartsData[i].Lickely != "" ||
        AccountChartsData[i].MostLickely != "" ||
        AccountChartsData[i].Possible != ""
      ) {
        $("#ML" + AccountChartsData[i].id).html(
          AccountChartsData[i].MostLickely
        );
        $("#L" + AccountChartsData[i].id).html(AccountChartsData[i].Lickely);
        $("#P" + AccountChartsData[i].id).html(AccountChartsData[i].Possible);
      }
    }
  }

  function getFormattedDate() {
    date=new Date()
    var year = date.getFullYear();
  
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
  
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    
    return month + '-' + day + '-' + year;
  }

  $("#ASSETSBTN").trigger("click");
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
