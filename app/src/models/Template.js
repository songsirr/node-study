"use strict";

const mysql = require("mysql");
const db = require("../config/db");
const querys = require("../querys/template.query");

class Template {
	constructor(body){
		this.body = body;
	}

	async createTemplate(){
		try{
            const client = this.body;
			const categoryTemplateArray = [];
			for(var i = 0; i < client.category_ids.length; i++){
				var arr = [
					client.category_ids[i],
					client.id
				];
				categoryTemplateArray.push(arr);
			}
			const insertQuery = mysql.format(querys.createTemplate, [client.id, client.name]);
			const addQuery = mysql.format(querys.addToCategory, [categoryTemplateArray]);
            return await new Promise((resolve, reject) => {
                db.beginTransaction();
                db.query(insertQuery + addQuery, (err, result) => {
                    if(err){
                        switch(err.code){
                            case "ER_BAD_NULL_ERROR" : reject({status: false, error: "NAME CANNOT BE NULL"});
                            case "ER_DATA_TOO_LONG" : reject({status: false, error: "ID IS TOO LONG"});
                            case "ER_DUP_ENTRY" : reject({status: false, error: "DUPLICATED ID"});
                            default : reject({status: false, error: err.code});
                        }
                    } else resolve({status: true});
                });
                db.commit();
            }).catch((error) => {
                return error;
            })
        } catch(e){
            return {status: false, error: err};
        }
	}

	async getTemplate(){
        try {
            const client = this.body;
            let q = querys.getTemplate;
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

	async getTemplateById(id){
        try {
            const q = querys.getTemplate + querys.findById;
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

	async updateTemplate(id){
        try {
            const client = this.body;
            return await new Promise((resolve, reject) => {
                db.beginTransaction();
                db.query(querys.updateTemplate, [client.name, id], (err, result) => {
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

    async deleteTemplate(id){
        try {
            return await new Promise((resolve, reject) => {
                const templateQuery = mysql.format(querys.softDeleteTemplate, id);
                const categoryTemplateQuery = mysql.format(querys.softRemoveAllFromCategory, id);
				db.beginTransaction();
                db.query(templateQuery + categoryTemplateQuery, (err, result) => {
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

	async addToCategory(){
		try {
			client = this.body;
            return await new Promise((resolve, reject) => {
				db.beginTransaction();
                db.query(querys.addToCategory, [[client.category_id, client.Template_id]], (err, result) => {
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

	async removeFromCategory(id){
		try {
			const client = this.body;
            return await new Promise((resolve, reject) => {
				db.beginTransaction();
                const q = mysql.format(querys.softRemoveFromCategory, [client.category_id, id]);
                db.query(q, (err, result) => {
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
}

module.exports=Template;