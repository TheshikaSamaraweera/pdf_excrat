const express = require("express");
const fileUpload = require("express-fileupload");
const pdfParse = require("pdf-parse");

const app = express();

app.use("/", express.static("public"));
app.use(fileUpload());

app.post("/extract-text", (req, res) => {
    if (!req.files || !req.files.pdfFile) {
        res.status(400).send("No file uploaded.");
        return;
    }

    const pdfFile = req.files.pdfFile;

    pdfParse(pdfFile.data).then(result => {
        const extractedText = result.text;
        res.send(extractedText);
    }).catch(error => {
        console.error("Error parsing PDF:", error);
        res.status(500).send("Error parsing PDF.");
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
