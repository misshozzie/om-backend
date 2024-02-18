const express = require("express");
const converterController = require("../../controllers/Converter/converter_controller");
const router = express.Router();
const securityMiddleware = require("../../middlewares/security");

// Converter Routes
router.get('/', (req, res) => {
    res.send('User route is working');
app.post("/converter/upload", securityMiddleware.checkLogin, converterController.uploadFile);
app.get("/converter/upload/download/DocxORImage", securityMiddleware.checkLogin, converterController.downloadFile);
app.post("/converter/upload/combine", securityMiddleware.checkLogin, converterController.combinePdfs);
app.get("/converter/upload/download/Combine", securityMiddleware.checkLogin, converterController.downloadCombinedPdf);
});

module.exports = router;