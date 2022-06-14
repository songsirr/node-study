"use strict";

const request = require("supertest");
const app = require("../../app");

describe('POST /category', () => {
    test('카테고리 생성', async () => {
        const res = await request(app)
            .post('/category')
            .set('Accept', 'application/json')
            .type('application/json')
            .send({id : "1CzNrdTy4qa8ovwfojc9bQ", name : "Basic"});
        expect(res.status).toBe(201);
    });
});

describe('POST /category', () => {
    test('카테고리 생성', async () => {
        const res = await request(app)
            .post('/category')
            .set('Accept', 'application/json')
            .type('application/json')
            .send({id : "1baRRuWQbDDaMKBl2sYWpo", name : "Vintage Logos"});
        expect(res.status).toBe(201);
    });
});

describe('POST /category', () => {
    test('카테고리 생성', async () => {
        const res = await request(app)
            .post('/category')
            .set('Accept', 'application/json')
            .type('application/json')
            .send({id : "testtesttesttesttestte", name : "Test category"});
        expect(res.status).toBe(201);
    });
});

describe('GET /category', () => {
    test('카테고리 리스트', async () => {
        const res = await request(app)
            .get('/category')
            .set('Accept', 'application/json');
        expect(res.status).toBe(200);
    });
});

describe('GET /category?name=##', () => {
    test('카테고리 이름 검색', async () => {
        const res = await request(app)
            .get('/category?name=Test category')
            .set('Accept', 'application/json');
        expect(res.status).toBe(200);
    });
});

describe('GET /category/:id', () => {
    test('카테고리 상세 (w/ id)', async () => {
        const res = await request(app)
            .get('/category/testtesttesttesttestte')
            .set('Accept', 'application/json');
        expect(res.status).toBe(200);
    });
});

describe('PUT /category/:id', () => {
    test('카테고리 수정', async () => {
        const res = await request(app)
            .put('/category/testtesttesttesttestte')
            .set('Accept', 'application/json')
            .type('application/json')
            .send({name : "Updated Test category"});
        expect(res.status).toBe(204);
    });
});

describe('POST /template', () => {
    test('템플릿 생성', async () => {
        const res = await request(app)
            .post('/template')
            .set('Accept', 'application/json')
            .type('application/json')
            .send({id : "48RxBXe9z73aVCYPkgJePJ", name : "template1", category_ids : ["1CzNrdTy4qa8ovwfojc9bQ"]});
        expect(res.status).toBe(201);
    });
});

describe('POST /template', () => {
    test('템플릿 생성', async () => {
        const res = await request(app)
            .post('/template')
            .set('Accept', 'application/json')
            .type('application/json')
            .send({id : "3truI3KlGbfpVtFSD1hwGL", name : "template2", category_ids : ["1CzNrdTy4qa8ovwfojc9bQ", "1baRRuWQbDDaMKBl2sYWpo"]});
        expect(res.status).toBe(201);
    });
});

describe('POST /template', () => {
    test('템플릿 생성', async () => {
        const res = await request(app)
            .post('/template')
            .set('Accept', 'application/json')
            .type('application/json')
            .send({id : "testtemplateidtesttemp", name : "Test template", category_ids : ["testtesttesttesttestte"]});
        expect(res.status).toBe(201);
    });
});

describe('GET /template', () => {
    test('템플릿 목록', async () => {
        const res = await request(app)
            .get('/template')
            .set('Accept', 'application/json');
        expect(res.status).toBe(200);
    });
});

describe('GET /template?name=##', () => {
    test('템플릿 이름 검색', async () => {
        const res = await request(app)
            .get('/template?name=test')
            .set('Accept', 'application/json');
        expect(res.status).toBe(200);
    });
});

describe('GET /template/:id', () => {
    test('템플릿 상세 (w/ id)', async () => {
        const res = await request(app)
            .get('/template/testtemplateidtesttemp')
            .set('Accept', 'application/json');
        expect(res.status).toBe(200);
    });
});

describe('PUT /template/:id', () => {
    test('템플릿 수정', async () => {
        const res = await request(app)
            .put('/template/testtemplateidtesttemp')
            .set('Accept', 'application/json')
            .type('application/json')
            .send({name : "Updated Test template"});
        expect(res.status).toBe(204);
    });
});

describe('POST /template/category', () => {
    test('템플릿 상위 카테고리 등록 (관계 생성)', async () => {
        const res = await request(app)
            .put('/template/category')
            .set('Accept', 'application/json')
            .type('application/json')
            .send({category_id : "1CzNrdTy4qa8ovwfojc9bQ", template_id : "testtemplateidtesttemp"});
        expect(res.status).toBe(204);
    });
});

describe('DELETE /template/category/:id', () => {
    test('템플릿 상위 카테고리 삭제 (관계 해제)', async () => {
        const res = await request(app)
            .delete('/template/category/testtemplateidtesttemp')
            .set('Accept', 'application/json')
            .type('application/json')
            .send({category_id : "1CzNrdTy4qa8ovwfojc9bQ"});
        expect(res.status).toBe(204);
    });
});

describe('GET /category/:id/template', () => {
    test('카테고리 소속 템플릿 목록', async () => {
        const res = await request(app)
            .get('/category/1CzNrdTy4qa8ovwfojc9bQ/template')
            .set('Accept', 'application/json');
        expect(res.status).toBe(200);
    });
});

describe('DELETE /template/:id', () => {
    test('템플릿 삭제', async () => {
        const res = await request(app)
            .delete('/template/testtemplateidtesttemp')
            .set('Accept', 'application/json');
        expect(res.status).toBe(204);
    });
});

describe('DELETE /category/:id', () => {
    test('카테고리 삭제', async () => {
        const res = await request(app)
            .delete('/category/testtesttesttesttestte')
            .set('Accept', 'application/json');
        expect(res.status).toBe(204);
    });
});