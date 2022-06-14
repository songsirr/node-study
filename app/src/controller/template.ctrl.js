"user strict";

const Template = require("../models/Template");

const process = {
    createTemplate: async(req, res) => {
        const template = new Template(req.body);
        const response = await template.createTemplate();
        return res.status(response.status == true ? 201 : 400).json(response);
    },

    getTemplateList: async(req, res) => {
        const template = new Template(req.query);
        const response = await template.getTemplate();
        return res.status(response.status == true ? 200 : 400).json(response);
    },

    getTemplateDetail: async(req, res) => {
        const template = new Template(req.body);
        const response = await template.getTemplateById(req.params.id);
        return res.status(response.status == true ? 200 : 400).json(response);
    },

    updateTemplate: async(req, res) => {
        const template = new Template(req.body);
        const response = await template.updateTemplate(req.params.id);
        return res.status(response.status == true ? 204 : 400).json(response);
    },

    deleteTemplate: async(req, res) => {
        const template = new Template(req.body);
        const response = await template.deleteTemplate(req.params.id);
        return res.status(response.status == true ? 204 : 400).json(response);
    },

    addToCategory: async(req, res) => {
        const template = new Template(req.body);
        const response = await template.addToCategory();
        return res.status(response.status == true ? 204 : 400).json(response);
    },

    removeFromCategory: async(req, res) => {
        const template = new Template(req.body);
        const response = await template.removeFromCategory(req.params.id);
        console.log(response.status);
        return res.status(response.status == true ? 204 : 400).json(response);
    }
}

module.exports = process;