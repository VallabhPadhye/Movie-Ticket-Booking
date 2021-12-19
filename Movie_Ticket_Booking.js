//Movie Ticket Booking using Node js and mysql database
//importing packages
const { Console } = require("console");
var mysql = require("mysql");
var np = require("upper-case");

//creating database connection
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pass",
  database: "movie_ticket_booking",
});

// ************************** Front End **************************
console.log("\n\n********************* Movie Ticket Booking *********************"); //Title
chooseuser();

function chooseuser() {
  console.log("\nSelect User: 1. Admin 2. Customer 3. Exit"); // User Selection
  var userchoice = require("readline-sync").question(">>>Enter your choice: ");
  switch (userchoice) {
    case "1":
      console.clear();
      console.log("\n\n********************* Movie Ticket Booking *********************");
      admin(); // imports admin module
      break;
    case "2":
      console.clear();
      console.log("\n\n********************* Movie Ticket Booking *********************");
      user(); // imports user module
      break;
    case "3":
      console.clear();
      console.log("\n\n********************* Thank You *********************");
      break;
    default:
      console.log("Invalid Input"); // Invalid Input
      break;
  }
}

//********************************** All Modules ***************************************
//********************************** ADMIN SECTION ***************************************

// module of admin
function admin() {
  console.log("\n\n********************** Admin Menu *********************");
  console.log(
    "\nSelect Options: \n\n1.Add Show\n2.Display Shows\n3.Edit Show\n4.Delete Show\n5.Display Bookings\n6.Logout");
  var choice = require("readline-sync").question("\n>>>Enter your choice: ");
  switch (choice) {
    case "1":
      console.clear();
      console.log("\n\n********************* Movie Ticket Booking *********************");
      addMovie();
      break;

    case "2":
      console.clear();
      console.log("\n\n********************* Movie Ticket Booking *********************");
      displayMovies();
      break;

    case "3":
      console.clear();
      console.log("\n\n********************* Movie Ticket Booking *********************");
      editMovies();
      break;

    case "4":
      console.clear();
      console.log("\n\n********************* Movie Ticket Booking *********************");
      deleteMovies();
      break;

    case "5":
      console.clear();
      console.log("\n\n********************* Movie Ticket Booking *********************");
      displayTable();
      break;

    case "6":
      console.clear();
      console.log("\n\n********************* Movie Ticket Booking *********************");
      chooseuser();
      break;
    default:
      alert("Invalid Choice");
      break;
  }
}

// module of addMovie
function addMovie() {
  console.log("\n\n********************** Add a Movie *********************");
  var movieName = require("readline-sync").question("Enter Movie Name: ");
  var movieTime = require("readline-sync").question("Enter Movie Time: ");
  var movieDate = require("readline-sync").question("Enter Movie Date: ");
  var movieSeats = require("readline-sync").question("Enter Number of Seats: ");
  var moviePrice = require("readline-sync").question("Enter Movie Price: ");
  var movie = {
    movieName: movieName,
    movieTime: movieTime,
    movieDate: movieDate,
    movieSeats: movieSeats,
    moviePrice: moviePrice,
  };
  connection.query("INSERT INTO movie SET ?", movie, function (err, result) {
    if (err) throw err;
    console.clear();
    //displaying current added movie details using npm table
    console.log(
      "\n\n********************** Movie Details *********************"
    );
    var table = require("table");
    var data = [
      ["Movie Name", "Movie Time", "Movie Date", "Movie Seats", "Movie Price"],
    ];
    data.push([
      movie.movieName,
      movie.movieTime,
      movie.movieDate,
      movie.movieSeats,
      movie.moviePrice,
    ]);
    var output = table.table(data);
    console.log(output);
    console.log("\n>>>Movie Added Successfully<<<");
    var loop = require("readline-sync").question(
      "\nDo you want to continue (Y/N)?"
    );
    if (loop == "Y" || loop == "y") {
      console.clear();
      admin();
    } else {
      console.clear();
      chooseuser();
    }
  });
}

//module for display movies using npm table
function displayMovies() {
  console.log(
    "\n\n********************** All Scheduled Shows *********************"
  );
  connection.query("SELECT * FROM movie", function (err, result) {
    if (err) throw err;
    var table = require("table");
    var data = [
      [
        "Movie Number",
        "Movie Name",
        "Movie Time",
        "Movie Date",
        "Movie Seats",
        "Movie Price",
      ],
    ];
    for (var i = 0; i < result.length; i++) {
      data.push([
        result[i].movieNumber,
        result[i].movieName,
        result[i].movieTime,
        result[i].movieDate,
        result[i].movieSeats,
        result[i].moviePrice,
      ]);
    }
    var output = table.table(data);
    console.log(output);
    var loop = require("readline-sync").question(
      "\nDo you want to continue (Y/N)?"
    );
    if (loop == "Y" || loop == "y") {
      console.clear();
      admin();
    } else {
      console.clear();
      chooseuser();
    }
  });
}

// module of editTicket and editSeats
function editMovies() {
  //display movies

  console.log(
    "\n\n********************** All Scheduled Shows *********************"
  );
  connection.query("SELECT * FROM movie", function (err, result) {
    if (err) throw err;
    var table = require("table");
    var data = [
      [
        "Movie Number",
        "Movie Name",
        "Movie Time",
        "Movie Date",
        "Movie Seats",
        "Movie Price",
      ],
    ];
    for (var i = 0; i < result.length; i++) {
      data.push([
        result[i].movieNumber,
        result[i].movieName,
        result[i].movieTime,
        result[i].movieDate,
        result[i].movieSeats,
        result[i].moviePrice,
      ]);
    }
    var output = table.table(data);
    console.log(output);
    //edit ticket
    editTicket();
  });
}

function editTicket() {
  //update ticket
  console.log("\n\n********************** Edit Show *********************");
  var movienumber = require("readline-sync").question(
    "\nSelect Movie Number: "
  );
  console.log("\n********Edit Details********");
  var movieName = require("readline-sync").question("Enter Movie Name: ");
  var movieTime = require("readline-sync").question("Enter Movie Time: ");
  var movieDate = require("readline-sync").question("Enter Movie Date: ");
  var movieSeats = require("readline-sync").question("Enter Number of Seats: ");
  var moviePrice = require("readline-sync").question("Enter Movie Price: ");
  var movie = {
    movieName: movieName,
    movieTime: movieTime,
    movieDate: movieDate,
    movieSeats: movieSeats,
    moviePrice: moviePrice,
  };
  connection.query(
    "UPDATE movie SET ? WHERE movieNumber = ?",
    [movie, movienumber],
    function (err, result) {
      if (err) throw err;

      //displaying current updated movie details using npm table
      console.log(
        "\n\n********************** Movie Details *********************"
      );
      var table = require("table");
      var data = [
        [
          "Movie Name",
          "Movie Time",
          "Movie Date",
          "Movie Seats",
          "Movie Price",
        ],
      ];
      data.push([
        movie.movieName,
        movie.movieTime,
        movie.movieDate,
        movie.movieSeats,
        movie.moviePrice,
      ]);
      var output = table.table(data);
      console.log(output);
      console.log("\n>>>Ticket Updated Successfully<<<");
      var loop = require("readline-sync").question(
        "\nDo you want to continue (Y/N)?"
      );
      if (loop == "Y" || loop == "y") {
        admin();
      } else {
        chooseuser();
      }
    }
  );
}

// module of deleteshow
function deleteMovies() {
  console.log(
    "\n\n********************** All Scheduled Shows *********************"
  );
  connection.query("SELECT * FROM movie", function (err, result) {
    if (err) throw err;
    var table = require("table");
    var data = [
      [
        "Movie Number",
        "Movie Name",
        "Movie Time",
        "Movie Date",
        "Movie Seats",
        "Movie Price",
      ],
    ];
    for (var i = 0; i < result.length; i++) {
      data.push([
        result[i].movieNumber,
        result[i].movieName,
        result[i].movieTime,
        result[i].movieDate,
        result[i].movieSeats,
        result[i].moviePrice,
      ]);
    }
    var output = table.table(data);
    console.log(output);

    //delete show
    console.log("\n\n********************** Delete Show *********************");
    var movienumber = require("readline-sync").question(
      "Select Movie Number: "
    );
    connection.query(
      "DELETE FROM movie WHERE movieNumber = ?",
      movienumber,
      function (err, result) {
        if (err) throw err;
        console.log("\n>>>Show Deleted Successfully<<<");

        //display shows using npm table
        console.log(
          "\n\n********************** Remaining Shows *********************"
        );
        connection.query("SELECT * FROM movie", function (err, result) {
          if (err) throw err;
          var table = require("table");
          var data = [
            [
              "Movie Number",
              "Movie Name",
              "Movie Time",
              "Movie Date",
              "Movie Seats",
              "Movie Price",
            ],
          ];
          for (var i = 0; i < result.length; i++) {
            data.push([
              result[i].movieNumber,
              result[i].movieName,
              result[i].movieTime,
              result[i].movieDate,
              result[i].movieSeats,
              result[i].moviePrice,
            ]);
          }
          var output = table.table(data);
          console.log(output);

          var loop = require("readline-sync").question(
            "\nDo you want to continue (Y/N)?"
          );
          if (loop == "Y" || loop == "y") {
            admin();
          } else {
            chooseuser();
          }
        });
      }
    );
  });
}

//display userinfo table
function displayTable() {
  console.log("\n\n********************** All Bookings *********************");
  var table = require("table").table;
  var data = [
    [
      "Customer Name",
      "Customer Email",
      "Customer Phone",
      "Movie Name",
      "Movie Time",
      "Movie Date",
      "Movie Seats",
      "Total Price",
    ],
  ];
  connection.query("SELECT * FROM userinfo", function (err, result) {
    if (err) throw err;
    for (var i = 0; i < result.length; i++) {
      data.push([
        result[i].customerName,
        result[i].customerEmail,
        result[i].customerPhone,
        result[i].movieName,
        result[i].movieTime,
        result[i].movieDate,
        result[i].customerSeats,
        result[i].totalPrice,
      ]);
    }
    console.log(table(data));
    var loop = require("readline-sync").question(
      "\nDo you want to continue (Y/N)?"
    );
    if (loop == "Y" || loop == "y") {
      admin();
    } else {
      chooseuser();
    }
  });
}

//********************************** USER SECTION ***************************************

function user() {
  console.log("\n\n********************** Customer Menu *********************");
  console.log("\nSelect Options: \n\n1.Display Movies\n2.Book Ticket\n3.Logout ");
  var choice = require("readline-sync").question("\n>>>Enter your choice: ");
  switch (choice) {
    case "1":
      displayuserMovies();
      break;

    case "2":
      bookTicket();
      break;
    case "3":
      console.clear();
      console.log("\n\n********************* Movie Ticket Booking *********************");
      chooseuser();
      break;
    default:
      alert("Invalid Choice");
      break;
  }
}

//display all shows
function displayuserMovies() {
  console.log(
    "\n\n********************** All Scheduled Movies *********************"
  );
  connection.query("SELECT * FROM movie", function (err, result) {
    if (err) throw err;
    var table = require("table");
    var data = [
      [
        "Movie Number",
        "Movie Name",
        "Movie Time",
        "Movie Date",
        "Movie Seats",
        "Movie Price",
      ],
    ];
    for (var i = 0; i < result.length; i++) {
      data.push([
        result[i].movieNumber,
        result[i].movieName,
        result[i].movieTime,
        result[i].movieDate,
        result[i].movieSeats,
        result[i].moviePrice,
      ]);
    }
    var output = table.table(data);
    console.log(output);
    var loop = require("readline-sync").question(
      "\nDo you want to continue (Y/N)?"
    );
    if (loop == "Y" || loop == "y") {
      user();
    } else {
      chooseuser();
    }
  });
}
//creating bookTicket table in database
function bookTicket() {
  //display all scheduled shows
  console.log(
    "\n\n********************** All Scheduled Movies *********************"
  );
  connection.query("SELECT * FROM movie", function (err, result) {
    if (err) throw err;
    var table = require("table");
    var data = [
      [
        "Movie Number",
        "Movie Name",
        "Movie Time",
        "Movie Date",
        "Movie Seats",
        "Movie Price",
      ],
    ];
    for (var i = 0; i < result.length; i++) {
      data.push([
        result[i].movieNumber,
        result[i].movieName,
        result[i].movieTime,
        result[i].movieDate,
        result[i].movieSeats,
        result[i].moviePrice,
      ]);
    }
    var output = table.table(data);
    console.log(output);

    //book ticket
    console.log("\n\n********************** Book Ticket *********************");

    var userName = require("readline-sync").question("Enter User Name: ");
    var userEmail = require("readline-sync").question("Enter User Email: ");
    var userPhone = require("readline-sync").question("Enter User Phone: ");
    var movienumber = require("readline-sync").question(
      "Select Movie Number: "
    );
    var userSeats = require("readline-sync").question(
      "Enter Number of Seats: "
    );

    //fetch movie details from movie table using movie number and store in variable
    connection.query(
      "SELECT * FROM movie WHERE movieNumber = ?",
      movienumber,
      function (err, result) {
        if (err) throw err;
        var movieName = result[0].movieName;
        var movieTime = result[0].movieTime;
        var movieDate = result[0].movieDate;
        var moviePrice = result[0].moviePrice;

        //calculate total price
        var totalPrice = moviePrice * userSeats;

        var userdetails = {
          customerName: userName,
          customerEmail: userEmail,
          customerPhone: userPhone,
          movieNumber: movienumber,
          movieName: movieName,
          movieTime: movieTime,
          movieDate: movieDate,
          customerSeats: userSeats,
          totalPrice: totalPrice,
        };
        connection.query(
          "INSERT INTO userinfo SET ?",
          userdetails,
          function (err, result) {
            if (err) throw err;

            //display booking detail of user using npm table
            console.log(
              "\n\n********************** Booking Details *********************"
            );
            var table = require("table").table;
            var data = [
              [
                "Customer Name",
                "Customer Email",
                "Customer Phone",
                "Movie Name",
                "Movie Time",
                "Movie Date",
                "Movie Seats",
                "Total Price",
              ],
            ];
            connection.query(
              "SELECT * FROM userinfo where customerPhone = ?",
              userPhone,
              function (err, result) {
                if (err) throw err;
                for (var i = 0; i < result.length; i++) {
                  data.push([
                    result[i].customerName,
                    result[i].customerEmail,
                    result[i].customerPhone,
                    result[i].movieName,
                    result[i].movieTime,
                    result[i].movieDate,
                    result[i].customerSeats,
                    result[i].totalPrice,
                  ]);
                }
                console.log(table(data));

                console.log("\n>>>Ticket Booked Successfully<<<");

                var loop = require("readline-sync").question(
                  "\nDo you want to continue (Y/N)?"
                );
                if (loop == "Y" || loop == "y") {
                  user();
                } else {
                  chooseuser();
                }
              });
          });
      });
  });
}
