"user strict";

const router = require('express').Router();
const ctrl = require("../controller/category.ctrl");

router.post("/", ctrl.createCategory);
router.get("/", ctrl.getCategoryList);
router.get("/:id", ctrl.getCategoryDetail);
router.put("/:id", ctrl.updateCategory);
router.delete("/:id", ctrl.deleteCategory);
router.get("/:id/template", ctrl.getChildrenTemplate);

module.exports = router;