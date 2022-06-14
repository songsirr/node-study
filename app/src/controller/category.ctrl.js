"user strict";

const Category = require("../models/Category");

const process = {
    createCategory: async(req, res) => {
        const category = new Category(req.body);
        const response = await category.createCategory();
        return res.status(response.status == true ? 201 : 400).json(response);
    },

    getCategoryList: async(req, res) => {
        const category = new Category(req.query);
        const response = await category.getCategory();
        return res.status(response.status == true ? 200 : 400).json(response);
    },

    getCategoryDetail: async(req, res) => {
        const category = new Category(req.body);
        const response = await category.getCategoryById(req.params.id);
        return res.status(response.status == true ? 200 : 400).json(response);
    },

    updateCategory: async(req, res) => {
        const category = new Category(req.body);
        const response = await category.updateCategory(req.params.id);
        return res.status(response.status == true ? 204 : 400).json(response);
    },

    deleteCategory: async(req, res) => {
        const category = new Category(req.body);
        const response = await category.deleteCategory(req.params.id);
        return res.status(response.status == true ? 204 : 400).json(response);
    },

    getChildrenTemplate: async(req, res) => {
        const category = new Category(req.body);
        const response = await category.getChildrenTemplate(req.params.id);
        return res.status(response.status == true ? 200 : 400).json(response);
    }
}

module.exports = process;