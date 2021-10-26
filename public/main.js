//contributors: Samekh, Alexa, Miriam, David, Shannon, Roxana
var completed = document.getElementsByClassName("completed");

Array.from(completed).forEach(function(element) {
      element.addEventListener('click', function(e){
      let customerName = e.target.parentNode.parentNode.children[1].innerText
      let size = e.target.parentNode.parentNode.children[2].innerText

        fetch('coffeeOrders', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'customerName': customerName,
            'size': size,
          
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

// Array.from(trash).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const msg = this.parentNode.parentNode.childNodes[3].innerText
//         fetch('messages', {
//           method: 'delete',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             'name': name,
//             'msg': msg
//           })
//         }).then(function (response) {
//           window.location.reload()
//         })
//       });
// });



 