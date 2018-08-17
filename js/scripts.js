var acc = document.getElementsByClassName("accordion");

for (let i = 0; i < acc.length; i++){
    acc[i].addEventListener('click', function(){
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block"){
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    })
}


/**smooth scroll**/
//finds all links with hashes

$('a[href*="#"]')
//remove links that don't link to anything
.not('[href="#"]')
.click(function(event){
        //stop current animation TODO: MAKE IT WORK
        $('html, body').stop();
       //regular expression to replace the beginning / at the link
       //then it checks if the pathnames of the target and this page match. Or checks if the domain host is the same
       if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//,'') || location.hostname == this.hostname)
        {
          //get the hash of the link we clicked - the #whatever - and set to a variable
            var target = $(this.hash); 
          // check if target has a length. Use ternary operator - if length is 0, then query for the name attribute for the string of the hash (minus the #). Otherwise, just return the hash.
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          //does target exist?
          if (target.length){
            //prevent default if animation is going to happen
            event.preventDefault();
            //animate the body of html
            $('html, body').animate({
            //scrolltop gets the scrollbar position of the target's offset from the top. Animates the scroll to there over a 1000 time 
            scrollTop: target.offset().top
            }, 800);
        
            //prevent default behavior
            return false;                        
            }
          }
        });


/**highlight nav**/

//add highlight-element class to any section you want to use to change button highlights
var $highlight_elements = $('.highlight-element');
//viewport window
var $window = $(window);
//checks to see if the element is in view, and then adds the appropriate highlight class.
function check_if_in_view() {
    //get the window positions
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = (window_top_position + window_height); 
   
    //checks to see if the highlight element is in view and then highlights the navbar button corresponding to it
    $.each($highlight_elements, function () {
      var h_element = $(this);
      //get the heights and position
      var h_element_height = h_element.outerHeight();
      var h_element_top = h_element.offset().top;
      var h_element_bottom = (h_element_height + h_element.position().top);
      //get the element id and format it to get the nav link id
      var h_button_id = "#" + h_element.attr('id') + "-nav";
      
      //if within view, adds the highlight active class to highlight the navbar button
      if ((h_element_bottom >= window_top_position) &&
         (h_element_top <= window_bottom_position)){
        //remove any existing highlight class
        $(".highlight-active").removeClass("highlight-active");
        //then add to current
        $(h_button_id).addClass('highlight-active');
      } else {
        $(h_button_id).removeClass('highlight-active');
      }
    });
  }
  
  
  //calls the check if in view if on scroll or resize
  $window.on('scroll resize', check_if_in_view);
  $window.trigger('scroll');