var highlightKey = 0;
var selectArray = [];
var cursorInActiveHlt = false;
var cursorInActiveHltTooltip = false;

$(document).ready(function () {
  var highlightTooltip = null;
  highlightTooltip = document.getElementById("hltTooltipWrapper");

  /*$(document).mousemove(function (e) {
    if (
      e.clientX > highlightTooltip.left &&
      e.clientX < highlightTooltip.right &&
      e.clientY > highlightTooltip.top &&
      e.clientY < highlightTooltip.bottom
    ) {
      cursorInActiveHltTooltip = true;
    } else {
      cursorInActiveHltTooltip = false;
    }
    if (cursorInActiveHlt || cursorInActiveHltTooltip) {
      document.body.appendChild(highlightTooltip);
    } else {
      $(".activehlt").removeClass("activehlt");
      if (highlightTooltip && highlightTooltip.parentNode) {
        highlightTooltip.parentNode.removeChild(highlightTooltip);
      }
    }
  });*/

  /*$("#hltTooltipWrapper")
    .$("p, li, h1, h2, h3, h4, h5, h6")
    .on("click", ".usrhlt", function () {
      //$(this).replaceWith($(this).html());
      console.log("mouse enter usr hlt");
      $(".activehlt").removeClass("activehlt");
      $(this).addClass("activehlt");
      let sel = document.getSelection();
      sel.removeAllRanges();
      let range = document.createRange();
      let el = document.getElementsByClassName("activehlt")[0];
      range.selectNode(el);
      openHighlightToolTip(range);
    });
  $("p, li, h1, h2, h3, h4, h5, h6").on("mouseenter", ".usrhlt", function () {
    console.log("mouse enter usr hlt");
    $(".activehlt").removeClass("activehlt");
    $(this).addClass("activehlt");
    cursorInActiveHlt = true;
    let sel = document.getSelection();
    sel.removeAllRanges();
    let range = document.createRange();
    let el = document.getElementsByClassName("activehlt")[0];
    range.selectNode(el);
    openHighlightToolTip(range);
  });
  $("p, li, h1, h2, h3, h4, h5, h6").on(
    "mouseleave",
    ".activehlt",
    function () {
      console.log("mouse leave");
      cursorInActiveHlt = false;
    }
  );*/

  function onWindowClick() {
    $(window).click(function (e) {
      e.preventDefault();
      $("#hltTooltipWrapper").fadeOut();
    });
  }

  function openHighlightToolTip(range) {
    rect = range.getBoundingClientRect();
    if (rect.width > 0) {
      highlightTooltip.style.border = "2px solid black"; // with outline
      highlightTooltip.style.position = "fixed"; // fixed positioning
      highlightTooltip.style.top =
        rect.top - highlightTooltip.offsetHeight + "px"; // set coordinates
      highlightTooltip.style.left =
        rect.left + rect.width / 2 - highlightTooltip.offsetWidth / 2 + "px";
      $("#hltTooltipWrapper").fadeIn();
    }
  }

  function objToRange(rangeStr) {
    range = document.createRange();
    range.setStart(
      document.querySelector('[data-highlight-key="' + rangeStr.startKey + '"]')
        .childNodes[rangeStr.startTextIndex],
      rangeStr.startOffset
    );
    range.setEnd(
      document.querySelector('[data-highlight-key="' + rangeStr.endKey + '"]')
        .childNodes[rangeStr.endTextIndex],
      rangeStr.endOffset
    );
    return range;
  }

  function rangeToObj(range) {
    return {
      startKey: range.startContainer.parentNode.dataset.highlightKey,
      startTextIndex: Array.prototype.indexOf.call(
        range.startContainer.parentNode.childNodes,
        range.startContainer
      ),
      endKey: range.endContainer.parentNode.dataset.highlightKey,
      endTextIndex: Array.prototype.indexOf.call(
        range.endContainer.parentNode.childNodes,
        range.endContainer
      ),
      startOffset: range.startOffset,
      endOffset: range.endOffset,
    };
  }

  document
    .getElementById("textToSelect")
    .addEventListener("mouseup", function (e) {
      var textu = document.getSelection().toString();
      var matchu = /\r|\n/.exec(textu);
      if (textu.length && !matchu) {
        if (confirm("highlight?")) {
          var range = document.getSelection().getRangeAt(0);
          selectArray.push(rangeToObj(range));
          let newNode = document.createElement("mark");
          newNode.classList.add("usrhlt");
          newNode.appendChild(range.extractContents());
          range.insertNode(newNode);
        }
      }
    });

  function addKey(element) {
    if (element.children.length > 0) {
      Array.prototype.forEach.call(element.children, function (each, i) {
        each.dataset.highlightKey = highlightKey++;
        addKey(each);
      });
    }
  }

  document
    .getElementById("getSelectionString")
    .addEventListener("click", function () {
      alert("Copy string to save selections: " + JSON.stringify(selectArray));
    });

  document
    .getElementById("setSelection")
    .addEventListener("click", function () {
      let selStr = prompt("Paste string");
      if (selStr) {
        let selArr = JSON.parse(selStr);
        let sel = document.getSelection();
        selArr.forEach(function (each) {
          let range = objToRange(each);
          sel.removeAllRanges();
          sel.addRange(range);
          let newNode = document.createElement("mark");
          newNode.classList.add("usrhlt");
          newNode.appendChild(range.extractContents());
          range.insertNode(newNode);
        });
      }
    });

  addKey(document.getElementById("textToSelect"));
});

(function () {
  var setUpfunction = function () {
    /*$('p').on('click', 'usrhlt', function(){
        console.log('hello');
        $(this).replaceWith($(this).html());
   })
   document.addEventListener('click', function(event) {
    if (event.target.classList.contains('usrhlt')) {
      console.log(event.target);
      }
    });*/
    /*
    function removeHighlight(el){
      range = document.createRange();
      range.selectNode(el);
      range.extractContents();
      range.insertNode(el.innerHTML);
    }*/
    var highlightKey = 0;
    function addKey(element) {
      console.log("addkey");
      if (element.children.length > 0) {
        console.log("addkeyif");
        Array.prototype.forEach.call(element.children, function (each, i) {
          each.dataset.highlightKey = highlightKey++;
          addKey(each);
        });
      }
    }
    function objToRange(rangeStr) {
      range = document.createRange();
      range.setStart(
        document.querySelector(
          '[data-highlight-key="' + rangeStr.startKey + '"]'
        ).childNodes[rangeStr.startTextIndex],
        rangeStr.startOffset
      );
      range.setEnd(
        document.querySelector('[data-highlight-key="' + rangeStr.endKey + '"]')
          .childNodes[rangeStr.endTextIndex],
        rangeStr.endOffset
      );
      return range;
    }
    function setPreviouslySavedHighlights(selStr) {
      console.log("insidesetPreviouslySavedHighlights");
      if (selStr) {
        console.log("insidesetPreviouslySavedHighlightsIf");
        let selArr = JSON.parse(selStr);
        let sel = document.getSelection();
        selArr.forEach(function (each) {
          let range = objToRange(each);
          sel.removeAllRanges();
          sel.addRange(range);
          let newNode = document.createElement("mark");
          newNode.classList.add("usrhlt");
          newNode.addEventListener("click", function (event) {
            console.log(event.target);
            //removeHighlight(el);
          });
          newNode.appendChild(range.extractContents());
          range.insertNode(newNode);
        });
      }
    }
    /*addKey(document.body);
    setPreviouslySavedHighlights(selectHighlightArray);*/
    console.log("insidesetup");
    if (document.getElementsByClassName("story-article-content").length) {
      console.log("insideIf");
      addKey(document.getElementsByClassName("story-article-content")[0]);
      let thatArray =
        '[{"startKey":"28","startTextIndex":0,"endKey":"28","endTextIndex":0,"startOffset":53,"endOffset":75},{"startKey":"38","startTextIndex":0,"endKey":"38","endTextIndex":0,"startOffset":9,"endOffset":44},{"startKey":"50","startTextIndex":0,"endKey":"50","endTextIndex":6,"startOffset":3,"endOffset":11},{"startKey":"212","startTextIndex":0,"endKey":"223","endTextIndex":0,"startOffset":50,"endOffset":10}]';
      setPreviouslySavedHighlights(thatArray);
    }
  };

  //$( document ).ready(setUpfunction);
  //window.onload = setUpfunction;
  setUpfunction();
  var selectHighlightArray = [];
  function rangeToObj(range) {
    return {
      startKey: range.startContainer.parentNode.dataset.highlightKey,
      startTextIndex: Array.prototype.indexOf.call(
        range.startContainer.parentNode.childNodes,
        range.startContainer
      ),
      endKey: range.endContainer.parentNode.dataset.highlightKey,
      endTextIndex: Array.prototype.indexOf.call(
        range.endContainer.parentNode.childNodes,
        range.endContainer
      ),
      startOffset: range.startOffset,
      endOffset: range.endOffset,
    };
  }
  document.body.addEventListener("copy", (event) => {
    let textu = document.getSelection().toString();
    let matchu = new RegExp(/\\n|\\r/).exec(textu);
    if (textu.length && !matchu) {
      let range = document.getSelection().getRangeAt(0);
      selectHighlightArray.push(rangeToObj(range));
      console.log(JSON.stringify(selectHighlightArray));
      let newNode = document.createElement("mark");
      newNode.classList.add("usrhlt");
      newNode.addEventListener("click", function () {
        console.log(event.target);
        //removeHighlight(el);
      });
      newNode.appendChild(range.extractContents());
      range.insertNode(newNode);
    }
  });
})();
