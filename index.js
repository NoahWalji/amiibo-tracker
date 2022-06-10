// Init variables
require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt")
const path = require('path'); 

var conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 22602,
    database: "amiibo-tracker",
})

// Server
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 8080;
app.listen(port, () => {
    conn.connect(function(err) {
        if (err) throw err;

        else {
            console.log('Amiibo Tracker Backend Listening On Port: ' + port);
        }
      });
});

app.get("/api", async (req, res) => {
    res.json({status: "Successfully running"});
});

app.get("/api/amiibo", async (req, res) => {
    if (Object.keys(req.query).length === 0) {
        const query = "SELECT A.id,A.name,F.name AS franchise, F.id AS franchiseID, S.name AS series,A.card,A.image,A.date FROM amiibo AS A INNER JOIN franchise AS F ON A.franchise = F.id INNER JOIN series AS S ON S.id = A.series";
        conn.query(query, function (err, result) {
            if (err) {
                res.json(err);
            }
    
            else {
                res.json(result);
            }
        })   
    }

    else if (req.query.id != undefined) {
        const query = "SELECT A.id,A.name,A.allias,F.name AS franchise, F.id AS franchiseID, S.name AS series, S.id AS seriesID, A.card,A.image,A.date FROM amiibo AS A INNER JOIN franchise AS F ON A.franchise = F.id INNER JOIN series AS S ON S.id = A.series WHERE A.id = ?";
        conn.query(query, [req.query.id], function (err, result) {
            if (err) {
                res.json({error: "The amiibo id could not be found"});
            }
    
            else {
                res.json(result[0]);
            }
        })
    }

    else if (req.query.search != undefined) {
        var searchQuery = "%" + req.query.search + "%"
        const query = "SELECT A.id,A.name,F.name AS franchise,S.name AS series,A.card,A.image,A.date FROM amiibo AS A INNER JOIN franchise AS F ON A.franchise = F.id INNER JOIN series AS S ON S.id = A.series WHERE A.name LIKE ? OR F.name LIKE ? OR S.name LIKE ?";
        conn.query(query, [searchQuery,searchQuery,searchQuery], function (err, result) {
            if (err) {
                res.json(err);
            }
    
            else {
                res.json(result);
            }
        })
    }

    else if (req.query.franchise != undefined) {
        const query = "SELECT A.id,A.name,F.name AS franchise,S.name AS series,A.card,A.image,A.date FROM amiibo AS A INNER JOIN franchise AS F ON A.franchise = F.id INNER JOIN series AS S ON S.id = A.series WHERE F.id = ?";
        conn.query(query, [req.query.franchise], function (err, result) {
            if (err) {
                res.json({error: "The franchise could not be found"});
            }
    
            else {
                res.json(result);
            }
        })
    }

    else if (req.query.character != undefined) {
        var searchQuery = req.query.character
        const query = "SELECT A.id,A.name,A.allias,F.name AS franchise,S.name AS series,A.card,A.image,A.date FROM amiibo AS A INNER JOIN franchise AS F ON A.franchise = F.id INNER JOIN series AS S ON S.id = A.series WHERE A.allias = ?";
        conn.query(query, [searchQuery], function (err, result) {
            if (err) {
                res.json(err);
            }
    
            else {
                res.json(result);
            }
        })
    }

    else if (req.query.series != undefined) {
        const query = "SELECT A.id,A.name,F.name AS franchise,S.name AS series,A.card,A.image,A.date FROM amiibo AS A INNER JOIN franchise AS F ON A.franchise = F.id INNER JOIN series AS S ON S.id = A.series WHERE S.id = ?";
        conn.query(query, [req.query.series], function (err, result) {
            if (err) {
                res.json({error: "The series could not be found"});
            }
    
            else {
                res.json(result);
            }
        })
    }

    else if(req.query.allseries == "true") {
        const query = "WITH cte AS (SELECT S.name, A.image, S.id, ROW_NUMBER() OVER(PARTITION BY S.name ORDER BY S.name DESC) AS RowNumber FROM amiibo AS A INNER JOIN series AS S ON S.id = A.series)SELECT * FROM cte WHERE RowNumber = 1";
        conn.query(query, function (err, result) {
            if (err) {
                res.json({error: "The series could not be found"});
            }
    
            else {
                res.json(result);
            }
        })
    }

    else if(req.query.allfranchises == "true") {
        const query = "WITH cte AS (SELECT F.name, A.image, F.id, ROW_NUMBER() OVER(PARTITION BY F.name ORDER BY F.name DESC) AS RowNumber FROM amiibo AS A INNER JOIN franchise AS F ON F.id = A.franchise)SELECT * FROM cte WHERE RowNumber=1";
        conn.query(query, function (err, result) {
            if (err) {
                res.json({error: "The series could not be found"});
            }
    
            else {
                res.json(result);
            }
        })
    }

    else if (req.query.unreleased == "true") {
        const query = "SELECT A.id,A.name,F.name AS franchise,S.name AS series,A.card,A.image,A.date FROM amiibo AS A INNER JOIN franchise AS F ON A.franchise = F.id INNER JOIN series AS S ON S.id = A.series WHERE date = '2022-12-31 00:00:00'";
        conn.query(query, [req.query.series], function (err, result) {
            if (err) {
                res.json({error: "An unknown error occured"});
            }
    
            else {
                res.json(result);
            }
        })
    }


});

app.post('/api/signup', async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const repassword = req.body.repassword;
    const salt = await bcrypt.genSalt();
    var hashedPassword = await bcrypt.hash(password, salt);

    const usernameCheck = "SELECT * FROM users WHERE username = ?";
    conn.query(usernameCheck, [username], function (err, result) {
        if (result.length != 0) {
            res.send({message: "Sorry! The entered username is already in use."})
        }

        else {
            const emailCheck = "SELECT * FROM users WHERE email = ?";
            conn.query(emailCheck, [email], function (err, result) {
                if (result.length != 0) {
                    res.send({message: "Sorry! The entered email is already in use."})
                    this.error = true;
                }

                else {
                    if (password !== repassword) {
                        res.send({message: "Sorry! The entered passwords do not match."})
                        error = true;
                    }

                    else {
                        const query = "INSERT INTO users (username,email,password) VALUES (?,?,?)";
                        conn.query(query, [username,email,hashedPassword], function (err, result) {
                            if (err) {
                                res.json(err);
                            }
                    
                            else {
                                res.json(result);
                            }
                        })  
                    }
                }
            })
        }
    })   
})

app.post('/api/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const query = "SELECT id,username,password FROM users WHERE username = ?";
    conn.query(query, [username,password], function (err, result) {
        if (err) {
            res.json(err);
        }

        else if (result.length == 1) {
            var hash = result[0].password;
            bcrypt.compare(password, hash, function(err, isMatch) {
                if (err || !isMatch) {
                    res.send({message: "An incorrect username/password has been entered."})
                }

                else if (isMatch) {
                    res.send(result)
                }
            })
        }
        else {
            res.send({message: "An incorrect username/password has been entered."})
        }
    })   
})

app.post('/api/isCollection', (req, res) => {
    const id = req.body.id;
    const userID = req.body.userID;

    const query = "SELECT * FROM collection WHERE userID=? AND amiiboID=? AND wishlist IS NULL";
    conn.query(query, [userID,id], function (err, result) {
        if (result.length == 1) {
            res.send({collection: true});
        }

        else {
            res.send({collection: false})
        }
    })   
})

app.post('/api/isWishlist', (req, res) => {
    const id = req.body.id;
    const userID = req.body.userID;

    const query = "SELECT * FROM collection WHERE userID=? AND amiiboID=? AND wishlist=1";
    conn.query(query, [userID,id], function (err, result) {
        if (result.length == 1) {
            res.send({wishlist: true});
        }
        else {
            res.send({collection: false})
        }
    })   
})

app.post('/api/addCollection', (req, res) => {
    const id = req.body.id;
    const userID = req.body.userID;

    const query = "INSERT INTO collection (userID,amiiboID) VALUES (?,?)";
    conn.query(query, [userID,id], function (err, result) {
        if (err) {
            res.json(err);
        }

        else {
            res.json(result);
        }
    })   
})

app.post('/api/removeCollection', (req, res) => {
    const id = req.body.id;
    const userID = req.body.userID;

    const query = "DELETE FROM collection WHERE userID=? AND amiiboID =? AND wishlist IS NULL";
    conn.query(query, [userID,id], function (err, result) {
        if (err) {
            res.json(err);
        }

        else {
            res.json(result);
        }
    })   
})

app.post('/api/addWishlist', (req, res) => {
    const id = req.body.id;
    const userID = req.body.userID;

    const query = "INSERT INTO collection (userID,amiiboID,wishlist) VALUES (?,?,1)";
    conn.query(query, [userID,id], function (err, result) {
        if (err) {
            res.json(err);
        }

        else {
            res.json(result);
        }
    })   
})

app.post('/api/removeWishlist', (req, res) => {
    const id = req.body.id;
    const userID = req.body.userID;

    const query = "DELETE FROM collection WHERE userID=? AND amiiboID =? AND wishlist=1";
    conn.query(query, [userID,id], function (err, result) {
        if (err) {
            res.json(err);
        }

        else {
            res.json(result);
        }
    })   
})

app.post('/api/getCollection', (req, res) => {
    const userID = req.body.userID;

    const query = "SELECT C.userID,C.`amiiboID`amiiboID,A.name,A.allias,S.name AS series, F.name AS franchise,C.wishlist,A.image FROM collection AS C INNER JOIN amiibo AS A ON A.id = C.amiiboID INNER JOIN franchise AS F ON F.id=A.franchise INNER JOIN series AS S ON S.id=A.series WHERE userID=? AND wishlist IS NULL";
    conn.query(query, [userID], function (err, result) {
        if (err) {
            res.json(err);
        }

        else {
            res.json(result);
        }
    })   
})

app.post('/api/getWishlist', (req, res) => {
    const userID = req.body.userID;

    const query = "SELECT C.userID,C.`amiiboID`amiiboID,A.name,A.allias,S.name AS series, F.name AS franchise,C.wishlist,A.image FROM collection AS C INNER JOIN amiibo AS A ON A.id = C.amiiboID INNER JOIN franchise AS F ON F.id=A.franchise INNER JOIN series AS S ON S.id=A.series WHERE userID=? AND wishlist IS NOT NULL";
    conn.query(query, [userID], function (err, result) {
        if (err) {
            res.json(err);
        }

        else {
            res.json(result);
        }
    })   
})

app.use(express.static(path.join(__dirname, "/frontend/build")))
app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "/frontend/build", "index.html"));
})
