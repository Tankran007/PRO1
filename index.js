const express = require("express");
const axios = require("axios");
const app = express();
var bodyParser = require("body-parser");
const path = require("path");



// Base URL for the API
//const base_url = "https://api.example.com";
const base_url = "http://localhost:5500";
//const base_url = "http://node41091-noderest.proen.app.ruk-com.cloud";

// Set the template engine
app.set("views", path.join(__dirname,"/public/views"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files

app.use(express.static(__dirname + "/public"));

app.get("/formatview", async (req, res) => {
  try {
      const response = await axios.get(base_url + '/yuo');
      res.render("musicformat", { musicformat: response.data });
  } catch (err) {
      console.error(err);
      res.status(500).send('Error');
  }
});

app.get("/inab", async(req, res) => {
  const musicformatdata = await axios.get(base_url + '/yuo');
  const musicdata = await axios.get(base_url + '/test');
  const Composerdata = await axios.get(base_url + '/com');
  res.render("inputdata", { musicformat: musicformatdata.data, music: musicdata.data, Composer:Composerdata.data});
}); 

app.post("/inab", async (req, res) => {
    try {
        const data = { musicformat: req.body.musicformat, music: req.body.music, Composer: req.body.Composer};
        await axios.post(base_url + '/iu', data);
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
  });

// app.get("/book/:id" , async (req, res) => {
//   try {
//       const response = await axios.get(base_url + '/books/' + req.params.id);
//       res.render("book", { book: response.data });
//   } catch (err) {
//       console.error(err);
//       res.status(500).send('Error');
//   }
// });

// app.get("/create", (req, res) => {
//   res.render("create");
// });

// app.post("/create", async (req, res) => {
//   try {
//       const data = { title: req.body.title, author: req.body.author };
//       await axios.post(base_url + '/books', data);
//       res.redirect("/");
//   } catch (err) {
//       console.error(err);
//       res.status(500).send('Error');
//   }
// });

// app.get("/update/:id", async (req, res) => {
//   try {
//       const response = await axios.get(
//           base_url + '/books/' + req.params.id);
//           res.render("update", {book: response.data});
//       } catch (err) {
//           console.error(err);
//           res.status(500).send('Error');
//       }
// });

// app.post("/update/:id", async (req, res) => {
//   try {
//       const data = { title : req.body.title, author: req.body.author };
//       await axios.put(base_url + '/books/' + req.params.id, data);
//       res.redirect("/");
//   } catch (err) {
//       console.error(err);
//       res.status(500).send('Error');
//   }
// });

// app.get("/delete/:id", async (req, res) => {
//   try {
//       await axios.delete(base_url + '/books/' + req.params.id);
//       res.redirect("/");
//   } catch (err) {
//       console.error(err);
//       res.status(500).send('Error');
//   }
// });

//app.listen(8080, () => {
//    console.log('Server started on port 8080');
//});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});