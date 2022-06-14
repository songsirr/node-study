"use strict";

const e = require("express");
const { query } = require("express");
const mysql = require("mysql");
const db = require("../config/db");
const querys = require("../querys/category.query");

class Category {
    constructor(body) {
        this.body = body;
    }

    async createCategory(){
        try{
            const client = this.body;
            return await new Promise((resolve, reject) => {
                db.beginTransaction();
                db.query(querys.createCategory, [client.id, client.name], (err, result) => {
                    if(err){
                        switch(err.code){
                            case "ER_BAD_NULL_ERROR" : reject({status: false, error: "NAME CANNOT BE NULL"});
                            case "ER_DATA_TOO_LONG" : reject({status: false, error: "ID IS TOO LONG"});
                            case "ER_DUP_ENTRY" : reject({status: false, error: "DUPLICATED ID"});
                            default : reject({status: false, error: err.code});
                        }
                    } else resolve({status: true, data: true});
                });
                db.commit();
            }).catch((error) => {
                return error;
            })
        } catch(e){
            return {status: false, error: err};
        }
    }

    async getCategory(){
        try {
            const client = this.body;
            let q = querys.getCategory;
            const params = [];
            if(client.name){
                q += querys.findByName;
                params.push('%' + client.name + '%');
            }
            return await new Promise((resolve, reject) => {
                db.query(q, params, (err, result) => {
                    if(err) reject({status: false, error: err.code});
                    else resolve({status: true, data: result})
                })
            }).catch((error) => {
                return error;
            })
        } catch (e) {
            return {status: false, error: e};
        }
    }

    async getCategoryById(id){
        try {
            const q = querys.getCategory + querys.findById;
            return await new Promise((resolve, reject) => {
                db.query(q, [id], (err, result) => {
                    if(err) reject({status: false, error: err.code});
                    else resolve({status: true, data: result})
                })
            }).catch((error) => {
                return error;
            })
        } catch (e) {
            return {status: false, error: e};
        }
    }

    async updateCategory(id){
        try {
            const client = this.body;
            return await new Promise((resolve, reject) => {
                db.beginTransaction();
                db.query(querys.updateCategory, [client.name, id], (err, result) => {
                    if(err) {
                        switch (err.code){
                            case "ER_BAD_NULL_ERROR" : reject({status: false, error: "NAME CANNOT BE NULL"});
                            default : reject({status: false, error: err.code});
                        }
                    } else resolve({status: true})
                })
                db.commit();
            }).catch((error) => {
                return error;
            })
        } catch (e) {
            return {status: false, error: e};
        }
    }

    async deleteCategory(id){
        try {
            return await new Promise((resolve, reject) => {
                const categoryQuery = mysql.format(querys.softDeleteCategory, id);
                const categoryTemplateQuery = mysql.format(querys.softRemoveAllFromCategory, id);
                db.beginTransaction();
                db.query(categoryQuery + categoryTemplateQuery, (err, result) => {
                    if(err) reject({status: false, error: err.code});
                    else resolve({status: true})
                })
                db.commit();
            }).catch((error) => {
                return error;
            })
        } catch (e) {
            return {status: false, error: e};
        }
    }

    async getChildrenTemplate(id){
        try {
            const q = querys.getChildrenTemplate;
            return await new Promise((resolve, reject) => {
                db.query(q, [id], (err, result) => {
                    if(err) reject({status: false, error: err.code});
                    else resolve({status: true, data: result})
                })
            }).catch((error) => {
                return error;
            })
        } catch (e) {
            return {status: false, error: e};
        }
    }
}

module.exports=Category;