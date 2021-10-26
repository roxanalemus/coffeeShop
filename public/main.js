//contributors: Samekh, Alexa, Miriam, David, Shannon, Roxana
var completed = document.getElementsByClassName("completed");

// let buttons = document.querySelectorAll('button')
// document.querySelector('#buttontask').addEventListener
// buttons.forEach(e => e.addEventListener('click',game))



// function game(e){
//   const bet = Number(document.querySelector('input').value)
//   const color = e.target.innerText == 'Red' ? 0 : e.target.innerText == 'Black' ? 1 : 2
//   console.log(typeof(bet))
   
//   fetch('game', {
//     method: 'post',
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify({
//       'bet': bet,
//       'color': color,
//     })
//   })
//   .then(response => {
//     if (response.ok) return response.json()
//   })
//   .then(data => {
//     console.log(data)
//     window.location.reload(true)
//   })

// }

Array.from(completed).forEach(function(element) {
      element.addEventListener('click', function(e){
       let clientName = e.target.parentNode.parentNode.children[1].innerText
       let order = e.target.parentNode.parentNode.children[2].innerText

console.log(clientName,order);

        fetch('coffeeOrders', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'clientName': clientName,
            'order': order,
          
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



 