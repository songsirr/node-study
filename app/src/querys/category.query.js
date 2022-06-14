"use strict";
exports.createCategory=`INSERT INTO category (id, name) VALUES (?, ?);`;
exports.getCategory=`SELECT id, name FROM category WHERE deleted_at IS NULL`;
exports.findById=` AND id = ? `;
exports.findByName=` AND name like ? `;
exports.updateCategory=`UPDATE category SET name = ? WHERE id = ?;`;
exports.softDeleteCategory=`UPDATE category SET deleted_at = NOW() WHERE id = ?;`;
exports.hardDeleteCategory=`DELETE FROM category WHERE id = ?;`;
exports.getChildrenTemplate=
    `SELECT t.id as id, t.name as name FROM category c 
    JOIN category_template ct ON ct.category_id = c.id 
    JOIN template t ON ct.template_id = t.id 
    WHERE ct.deleted_at IS NULL AND c.id = ? `;
exports.softRemoveAllFromCategory=`UPDATE category_template SET deleted_at = NOW() WHERE category_id = ?;`;