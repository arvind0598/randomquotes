$(document).ready(function() {
    $('#random').click(get_quote);
    $("#tweet").click(function(){
      var quote = $("#quote").text();
      var tweetq = quote.substr(0,quote.length > 137 ? 137 : quote.length) + (quote.length > 137 ? "..." : "");
      $(this).attr("href", "https://twitter.com/intent/tweet/?text=" + tweetq);
    });
  });

function get_quote()
{
  $("#random").addClass("active");
  $("#box").animate({opacity: 0}, 1000);
  setTimeout(function(){$("#random").removeClass("active")}, 300);  
  $.getJSON("https://api.quotable.io/random", function(post){
    $("#quote").html(post.content);
    $("#speaker").html("-" + post.author.split(" (")[0]);
  });
  document.getElementById("box").style.opacity = "0";
  setTimeout(function(){$("#box").animate({opacity: 1}, 1000)}, 1000);
  var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
  document.body.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  $("body").animate({backgroundColor: colors[Math.floor(Math.random() * colors.length)]}, 1000);
}
