

$(document).ready(function() {
  var boolDebugElement,pos;


  
  var beweegRuimteX = 100;
  var beweegRuimteY = 80;

  var moveForce = 30;
  var rotateForce = 20;

  $(window).mousemove(function(evt) {
    var docX = $(document).width();
    var docY = $(document).height();

    var moveX = ((evt.pageX - docX / 2) / (docX / 2)) * -moveForce;
    var moveY = ((evt.pageY - docX / 2) / (docY / 2)) * -moveForce;

    var rotateY = (evt.pageX / docX) * rotateForce * 2 - rotateForce;
    var rotateX = (evt.pageY / docY) * rotateForce * 2 - rotateForce;

    var mx =
      evt.pageX -
      $("#ice-bear #moving").offset().left -
      $("#ice-bear #moving").width() / 2;

    var my =
      evt.pageY -
      $("#ice-bear #moving").offset().top -
      $("#ice-bear #moving").height() / 2;

    var maxMuisX = $(window).width();
    var maxMuisY = $(window).height();

    var xF = mx / maxMuisX / 2;
    var yF = my / maxMuisY / 2;

    $("#ice-bear #eyes,#ice-bear #face").css(
      "transform",
      "translate(" +
        beweegRuimteX * xF +
        100 / 2 +
        "px," +
        beweegRuimteY * yF +
        100 / 2 +
        "px)"
    );

    var mx2 =
      evt.pageX -
      $("#grizzly #moving").offset().left -
      $("#grizzly #moving").width() / 2;

    var my2 =
      evt.pageY -
      $("#grizzly #moving").offset().top -
      $("#grizzly #moving").height() / 2;

    var xF2 = mx2 / maxMuisX / 2;
    var yF2 = my2 / maxMuisY / 2;

    $("#grizzly #eyes").css(
      "transform",
      "translate(" +
        beweegRuimteX * xF2 +
        100 / 2 +
        "px," +
        beweegRuimteY * yF2 +
        100 / 2 +
        "px)"
    );
    $("#grizzly #face").css(
      "transform",
      "translate(" +
        beweegRuimteX * xF2 +
        100 / 2 +
        "px," +
        beweegRuimteY * yF2 +
        100 / 2 +
        "px)"
    );

    // $("#grizzly #face").css("transform","rotateY("+rotateY+"deg) rotateX("+rotateX+"deg)" );

    var mx3 =
      evt.pageX -
      $("#panda #moving").offset().left -
      $("#panda #moving").width() / 2;

    var my3 =
      evt.pageY -
      $("#panda #moving").offset().top -
      $("#panda #moving").height() / 2;

    var xF3 = mx3 / maxMuisX / 2;
    var yF3 = my3 / maxMuisY / 2;

    $("#panda #eyes,#panda #face").css(
      "transform",
      "translate(" +
        beweegRuimteX * xF3 +
        100 / 2 +
        "px," +
        beweegRuimteY * yF3 +
        100 / 2 +
        "px)"
    );
  });
});
