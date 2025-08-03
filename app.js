const http = require("http");
const fs = require("fs");

const path = "./data.json";

const server = http.createServer((req, res) => {
  const [, rout, userEmail] = req.url.split("/");

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
      let { id, name, age, email, password } = JSON.parse(body);

      id = students.length + 1;
      students.push({ id, name, age, email, password });

      fs.writeFileSync(path, JSON.stringify(students));
      res.end(JSON.stringify({ id, name, age, email, password }));
    });
    res.writeHead(201, { "Content-Type": "application/json" });
    // res.end("Student added Successfully");
  } else if (rout === "deletestudent" && userEmail && req.method === "DELETE") {
    let students = JSON.parse(fs.readFileSync(path, "utf8"));

    req.on("end", () => {
      students = students.filter((student) => {
        return student.email !== userEmail;
      });

      fs.writeFileSync(path, JSON.stringify(students));
      // res.end(JSON.stringify(removeStudent));
    });
    res.end("Student deleted Successfully");
  } else if (rout === "updatestudent" && userEmail && req.method === "PUT") {
    let students = JSON.parse(fs.readFileSync(path, "utf8"));

    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      let { name, age, email, password } = JSON.parse(body);
      students = students.map((currentStud) => {
        if (currentStud.email === userEmail) {
          return {
            id: currentStud.id,
            name: name || currentStud.name,
            age: age || currentStud.age,
            email: email || currentStud.email,
            password: password || currentStud.password,
          };
        }
        return currentStud;
      });
      fs.writeFileSync(path, JSON.stringify(students));
      // res.end(JSON.stringify(student));
    });
    res.end("Student updated Successfully");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("No Found Page");
  }
});

server.listen(3000, "localhost", () => {
  console.log("Server is listening on port 3000....");
});
