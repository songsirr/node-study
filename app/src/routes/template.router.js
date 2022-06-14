"user strict";

const router = require('express').Router();
const ctrl = require("../controller/template.ctrl");

router.post("/", ctrl.createTemplate);
router.get("/", ctrl.getTemplateList);
router.get("/:id", ctrl.getTemplateDetail);
router.put("/:id", ctrl.updateTemplate);
router.delete("/:id", ctrl.deleteTemplate);
router.post("/category", ctrl.addToCategory);
router.delete("/category/:id", ctrl.removeFromCategory);
module.exports = router;