const fs = require("fs");
const http = require("http");
const url = require("url");

const replacetemplate = require('./modules/replaceTemplate')

// read file -synchronous way
// let text = fs.readFileSync("./txt/input.txt", "utf-8");
// let textOut = `this is the meaning of avacado ${text}. \n time is ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);

// read file non-Blocking asychronous way
// fs.readFile("./txt/input.txt", "utf-8", (err, data) => {
//     fs.readFile('./txt/output.txt',  'utf-8', (err, data2)=>{
//         fs.writeFile('./txt/final.txt', `this is ${data}\n${data2} `, 'utf-8', (err)=>{

//         })
//     })
// });

// Http response and requests----------- Server________


// templates
const card = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const overview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const productTemp = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

// Json file
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const objData = JSON.parse(data);

// Server Rendering
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  // Overview Page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    const cardsHtml = objData.map((el) => replacetemplate(card, el)).join("");
    const output = overview.replace(/{%PRODUCT_CARD%}/g, cardsHtml);
    res.end(output);
  }

  //PRODUCT PAGE
  else if (pathname === "/product") {
    res.writeHead(200, {'Content-type': 'text/html'})
    const product = objData[query.id];
    const output = replacetemplate(productTemp, product)
    res.end(output);
  }

  // API
  else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
  }

  // NOT FOUND
  else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("error page not found");
  }
});

// SERVER

server.listen(8000, (err) => {
  console.log("the web host on localhost:8000");
});
