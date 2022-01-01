const express = require("express");
const app = express();
const mysql = require("mysql");
require("dotenv").config();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

app.listen(3000, () => {
  connection.connect(() => console.log("connected to db-dbmsmp"));
  console.log("listening on port 3000");
});

let marks = "";

app.get("/", (req, res) => {
  marks = "";
  res.render("index");
});

app.post("/", (req, res) => {
  console.log(req.body);
  connection.query(
    `SELECT USN, 18MAT31 , 18CS32 , 18CS33 , 18CS34 , 18CS35 , 18CS36 , 18CSL27 , 18CSL28 , 18KVK39 
     FROM REPORT 
     WHERE USN = '${req.body.USN}'`,
    (error, result) => {
      if (result.length == 0) {
        res.redirect("/");
      } else {
        marks = {
          usn: result[0]["USN"],
          s1: result[0]["18MAT31"],
          s2: result[0]["18CS32"],
          s3: result[0]["18CS33"],
          s4: result[0]["18CS34"],
          s5: result[0]["18CS35"],
          s6: result[0]["18CS36"],
          s7: result[0]["18CSL27"],
          s8: result[0]["18CSL28"],
          s9: result[0]["18KVK39"],
        };
        res.redirect("/result");
      }
    }
  );
});

app.get("/result", (req, res) => {
  if (marks == "") {
    res.redirect("/");
    return;
  }
  connection.query(
    `SELECT (18MAT31 + 18CS32 + 18CS33 + 18CS34 + 18CS35 + 18CS36 + 18CSL27 + 18CSL28 + 18KVK39) / 9 
     AS AVG_MARKS 
     FROM REPORT 
     WHERE USN = '${marks.usn}'`,
    (error, result) => {
      marks["avg"] = result[0]["AVG_MARKS"];
      console.log(marks);
      connection.query(
        `SELECT SNAME 
         FROM STUDENT 
         WHERE USN = '${marks.usn}'`,
        (error1, result1) => {
          marks["name"] = result1[0]["SNAME"];
          res.render("result", { marks });
        }
      );
    }
  );
});

const cLink = {
  Cognizant: "https://careers.cognizant.com/global/en",
  Accenture: "https://www.accenture.com/in-en/careers",
  Wipro: "https://careers.wipro.com/careers-home/",
  Capgemini: "https://www.capgemini.com/in-en/careers/",
  "DXC Technologies": "https://dxc.com/us/en/careers",
  "LnT Infotech": "https://www.lntinfotech.com/careers/",
  "Persistent Systems": "https://www.persistent.com/careers/",
  Mindtree: "https://www.mindtree.com/careers",
  Amazon: "https://www.amazon.jobs/en/",
  "Surya Software": "https://www.surya-soft.com/careers/current-openings/",
  Dell: "https://jobs.dell.com/",
  "Byju's": "https://byjus.com/careers-at-byjus/",
  Paytm: "https://paytm.com/careers/",
  Oracle: "https://www.oracle.com/in/corporate/careers/",
  TCS: "https://www.tcs.com/careers?country=IN&lang=EN",
  Infosys: "https://www.infosys.com/careers/apply.html",
  "Lowe's India": "https://www.infosys.com/careers/apply.html",
  "Re Solutions": "https://www.indeed.com/q-Re-Solutions-jobs.html",
  "ZEE Entertainment": "https://www.zee.com/careers/",
  "Birla Soft": "https://www.birlasoft.com/company/careers/current-openings",
  Mindteck: "https://www.mindteck.com/career/job-openings.html",
};

app.get("/companies", (req, res) => {
  if (marks == "") {
    res.redirect("/");
    return;
  }
  connection.query(
    `SELECT * FROM COMPANIES
    WHERE GPA <= ${Number((marks.avg / 10 + 0.4).toString().slice(0, 3))}`,
    (error, result) => {
      res.render("companies", { companies: result, cLink: cLink });
    }
  );
});
