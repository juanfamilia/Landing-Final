module.exports = [
"[project]/frontend/messages/en.json (json, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/frontend_messages_en_json_6eead79c._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/frontend/messages/en.json (json)");
    });
});
}),
"[project]/frontend/messages/es.json (json, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/frontend_messages_es_json_6a2bd874._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/frontend/messages/es.json (json)");
    });
});
}),
];