const http = require("http");
const fs = require("fs");

const path = "./data.json";

const server = http.createServer((req, res) => {
  if (req.url === "/getstudents" && req.method === "GET") {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) console.log("Error", err);
      res.end(data);
    });
  } else if (req.url === "/setstudent" && req.method === "POST") {
    let students = JSON.parse(fs.readFileSync(path, "utf8"));

    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      let newStudent = JSON.parse(body);
      students.push(newStudent);
      //Sort Students with id
      students.sort((a, b) => a.id - b.id);
      //
      fs.writeFileSync(path, JSON.stringify(students));
      res.end(JSON.stringify(newStudent));
    });
    res.writeHead(201, { "Content-Type": "application/json" });
    // res.end("Student added Successfully");
  } else if (req.url === "/deletestudent" && req.method === "DELETE") {
    let students = JSON.parse(fs.readFileSync(path, "utf8"));

    let body = ""; //id
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      let removeStudent = JSON.parse(body);
      students = students.filter((student) => {
        return student.id !== removeStudent.id;
      });

      fs.writeFileSync(path, JSON.stringify(students));
      // res.end(JSON.stringify(removeStudent));
    });
    res.end("Student deleted Successfully");
  } else if (req.url === "/updatestudent" && req.method === "PUT") {
    let students = JSON.parse(fs.readFileSync(path, "utf8"));

    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      let student = JSON.parse(body);
      students = students.map((currentStud) => {
        if (currentStud.id === student.id) {
          return { ...currentStud, ...student };
        }
        return currentStud;
      });
      fs.writeFileSync(path, JSON.stringify(students));
      // res.end(JSON.stringify(student));
    });
    res.end("Student updated Successfully");
  } else {
    res.end("No Found Page");
  }
});

server.listen(3000, "localhost", () => {
  console.log("Server is listening on port 3000....");
});
