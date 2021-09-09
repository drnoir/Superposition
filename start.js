// JS FOR START PAGE ENTRY PAGE

// ENTER VR MODE ON LOAD BY DEFAULT
window.onload = function () {
  document.querySelector('a-scene').enterVR();
}

//LINK TO START GAME
AFRAME.registerComponent('start-game', {
  schema: {
    color: {default: 'white'}
  },

  init: function () {
    var data = this.data;
    var el = this.el;  // <a-box>
    var defaultColor = el.getAttribute('material').color;

    el.addEventListener('mouseenter', function () {
      el.setAttribute('color', data.color);
      window.location.pathname = '/game/main.html'
    });

    el.addEventListener('mouseleave', function () {
      el.setAttribute('color', defaultColor);
    });
  }
});