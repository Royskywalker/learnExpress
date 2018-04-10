var express = require("express");
var app = express();
var fs = require("fs");
//Express默认并不处理HTTP请求体中的数据，对于普通请求体(JSON、二进制、字符串)数据，可以使用body-parser中间件
var bodyParser = require("body-parser");
//文件上传(multipart/form-data请求)，可以基于请求流处理，也可以使用formidable模块或Multer中间件
var multer = require("multer");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: "/tmp/" }).array("image"));

app.get("/index.html", function(req, res) {
    //_dirname相当于根目录，但是不能去掉直接以/开头
    res.sendFile(__dirname + "/" + "index.html");
});

app.post("/file_upload", function(req, res) {
    console.log(req.files[0]); // 上传的文件信息

    var des_file = __dirname + "/public/" + req.files[0].originalname;
    fs.readFile(req.files[0].path, function(err, data) {
        fs.writeFile(des_file, data, function(err) {
            if (err) {
                console.log(err);
            } else {
                response = {
                    message: "File uploaded successfully",
                    filename: req.files[0].originalname
                };
            }
            console.log(response);
            res.end(JSON.stringify(response));
        });
    });
});

var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port);
});