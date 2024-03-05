

function locoMotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });
  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
function videoConAnimation() {
  var videoCon = document.querySelector("#video-container");
  var playBtn = document.querySelector("#play");
  videoCon.addEventListener("mouseenter", () => {
    gsap.to(playBtn, {
      scale: 1,
      opacity: 1,
    });
  });
  videoCon.addEventListener("mouseleave", () => {
    gsap.to(playBtn, {
      scale: 0,
      opacity: 0,
    });
  });
  videoCon.addEventListener("mousemove", (details) => {
    gsap.to(playBtn, {
      left: details.x - 70,
      top: details.y - 70,
    });
  });
}

function loadingAnimation() {
  gsap.from("#page1 h1", {
    y: 50,
    opacity: 0,
    delay: 0.5,
    duration: 0.6,
    stagger: 0.3,
  });
  gsap.from("#page1 #video-container", {
    scale: 0.9,
    opacity: 0,
    delay: 1.5,
    duration: 0.3,
    stagger: 0.3,
  });
}

function cursorAnimation() {
  document.addEventListener("mousemove", (details) => {
    gsap.to("#curser", {
      left: details.x,
      top: details.y,
    });
  });

  var product = document.querySelectorAll(".product");

  for (var i = 0; i < product.length; i++) {
    product[i].addEventListener("mouseenter", () => {
      gsap.to("#curser", {
        transform: "translate(-50%, -50%) scale(1)",
      });
    });
    product[i].addEventListener("mouseleave", () => {
      gsap.to("#curser", {
        transform: "translate(-50%, -50%) scale(0)",
      });
    });
  }
}



gsap.to("#nav-part1 svg", {
  transform: "translatey(-100%)",
  scrollTrigger: {
    trigger: "#page1",
    scroller: "#main",
    markers: false,
    start: "top 0",
    end: "top -5%",
    scrub: true,
  },
});

locoMotiveAnimation();
loadingAnimation();
videoConAnimation();
cursorAnimation();


var elems = document.querySelectorAll(".elem");
var page5 = document.querySelector("#page5");
elems.forEach(function(el){
    el.addEventListener("mouseenter", function(){
        var bgimg = el.getAttribute("data-img");
        page5.style.backgroundImage = `url(${bgimg})`;
    })
})