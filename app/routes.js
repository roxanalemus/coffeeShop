module.exports = function (app, passport, db) {

  // normal routes ===============================================================

  // show the home page (will also have our login links)
  app.get('/', function (req, res) {
    res.render('index.ejs');
  });

  app.get('/order', function (req, res) {
    res.render('order.ejs');
  
  });

  app.post('/order', (req, res) => {
    db.collection('coffeeOrders').insertOne({ customerName: req.body.customerName, size:req.body.size, status:"open"}, (err, result) => {
      if (err) return console.log(err)
      console.log(`saved to database: ${req.body.customerName} ${req.body.size}`)
      res.redirect('/order')
    })
 
  })
    
  // app.post('/game', (req, res) => {
  //   let roulette = Math.floor(Math.random() * 3)
  //   let playerMoney = 0 //starting variables for player and then casino
  //   let casinoMoney = 0
  //   let result = roulette === req.body.color ? true : false//this is taking the amount of money the player has bet if they won the match
  //   let whoWins = result ? 'player Wins' : 'House Wins'
  //   if (result) {
  //     playerMoney += req.body.bet
  //     casinoMoney -= req.body.bet
  //   } else {
  //     playerMoney -= req.body.bet
  //     casinoMoney += req.body.bet
  //   }

    // db.collection('messages').insertOne({ playerMoney: playerMoney, bet: req.body.bet, casinoMoney: casinoMoney,whoWins:whoWins }, (err, result) => {
    //   if (err) return console.log(err)
    //   console.log('saved to database')
    //   res.send({})
    // })

    //randomizer between green, red, black

    //Math.floor() method to decide the result of the bet

    //if result === playerColor(?) then player wins
    //else, player loses

    //add or subtract the wins or losses. how do we preserve and update the total amount lost/won?


  // })

  // PROFILE SECTION =========================
  app.get('/profile', isLoggedIn, function (req, res) {
    db.collection('coffeeOrders').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('profile.ejs', {
        user: req.user,
        coffeeOrders : result
      })
    })
  });

  // LOGOUT ==============================
  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  // message board routes ===============================================================


  app.put('/coffeeOrders', isLoggedIn, (req, res) => {
    console.log(req.user)
    db.collection('coffeeOrders')
    //target by id when available
    .findOneAndUpdate({customerName: req.body.customerName, size: req.body.size}, {
      $set: {
        status: "complete",
        barista: req.user.local.email
      }
    }, {
      upsert: false
    }, (err, result) => {
      if (err) return res.send(err)
      res.send(result)
    })
  })

  app.delete('/messages', isLoggedIn, (req, res) => {
    db.collection('messages').findOneAndDelete({ name: req.body.name, msg: req.body.msg }, (err, result) => {
      if (err) return res.send(500, err)
      res.send('Message deleted!')
    })
  })

  // =============================================================================
  // AUTHENTICATE (FIRST LOGIN) ==================================================
  // =============================================================================

  // locally --------------------------------
  // LOGIN ===============================
  // show the login form
  app.get('/login', function (req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // SIGNUP =================================
  // show the signup form
  app.get('/signup', function (req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // =============================================================================
  // UNLINK ACCOUNTS =============================================================
  // =============================================================================
  // used to unlink accounts. for social accounts, just remove the token
  // for local account, remove email and password
  // user account will stay active in case they want to reconnect in the future

  // local -----------------------------------
  app.get('/unlink/local', isLoggedIn, function (req, res) {
    var user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;
    user.save(function (err) {
      res.redirect('/profile');
    });
  });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}
