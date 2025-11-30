// api/swagger.js
export const swaggerDocument = {
    openapi: "3.0.0",
    info: {
        title: "JEFFERSON COSTA _ Jitterbit - Teste Teorico IE PS - v2",
        version: "30.11.25",
        description: "API para gerenciar pedidos e itens."
    },
    servers: [
        { url: "http://localhost:3000", description: "Local" },
        { url: "https://jitterbit-api.vercel.app/", description: "Producao (Vercel)" }
    ],
    components: {
        schemas: {
            Item: {
                type: "object",
                required: ["productId", "quantity", "price"],
                properties: {
                    _id: { type: "string", readOnly: true, description: "ID do MongoDB (apenas na resposta)" },
                    productId: { type: "integer", example: 2434, description: "Identificador do produto (numerico)" },
                    quantity: { type: "integer", example: 1, description: "Quantidade do item" },
                    price: { type: "number", example: 1000, description: "Preco unitario do item" }
                },
                example: {
                    _id: "64daba7d05bcc674899dc5bf",
                    productId: 2434,
                    quantity: 1,
                    price: 1000
                }
            },

            Order: {
                type: "object",
                required: ["orderId", "value", "creationDate", "items"],
                properties: {
                    _id: { type: "string", readOnly: true, description: "ID do MongoDB (apenas na resposta)" },
                    orderId: { type: "string", example: "v10089016vdb-01", description: "Identificador do pedido (string unica)" },
                    value: { type: "number", example: 10000, description: "Valor total do pedido" },
                    creationDate: { type: "string", format: "date-time", example: "2023-07-19T12:24:11.529Z", description: "Data de criacao (ISO 8601)" },
                    items: {
                        type: "array",
                        items: { $ref: "#/components/schemas/Item" },
                        description: "Lista de itens do pedido"
                    }
                },
                example: {
                    _id: "64dab8a0f6b7183237d307f6",
                    orderId: "v10089016vdb-01",
                    value: 10000,
                    creationDate: "2023-07-19T12:24:11.529Z",
                    items: [
                        {
                            _id: "64daba7d05bcc674899dc5bf",
                            productId: 2434,
                            quantity: 1,
                            price: 1000
                        }
                    ]
                }
            },

            // Response wrappers
            SuccessMsg: {
                type: "object",
                properties: {
                    msg: { type: "string", example: "Operacao realizada com sucesso" }
                }
            },
            ErrorMsg: {
                type: "object",
                properties: {
                    error: { type: "string", example: "Descricao do erro" }
                }
            }
        }
    },

    paths: {
        /***** ITENS *****/
        "/itens/criar": {
            post: {
                tags: ["Itens"],
                summary: "Criar item",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Item" },
                            example: { productId: 1001, quantity: 10, price: 3500 }
                        }
                    }
                },
                responses: {
                    "201": {
                        description: "Item criado",
                        content: { "application/json": { schema: { $ref: "#/components/schemas/Item" } } }
                    },
                    "400": { description: "Requisicao invalida", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorMsg" } } } }
                }
            }
        },

        "/itens/listar": {
            get: {
                tags: ["Itens"],
                summary: "Listar todos os itens",
                responses: {
                    "200": {
                        description: "Lista de itens",
                        content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Item" } } } }
                    }
                }
            }
        },

        "/itens/buscar/{id}": {
            get: {
                tags: ["Itens"],
                summary: "Buscar item por ID (Mongo _id)",
                parameters: [
                    { name: "id", in: "path", required: true, schema: { type: "string" }, description: "ID do item (Mongo ObjectId)" }
                ],
                responses: {
                    "200": { description: "Item encontrado", content: { "application/json": { schema: { $ref: "#/components/schemas/Item" } } } },
                    "404": { description: "Item nao encontrado", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorMsg" } } } }
                }
            }
        },

        "/itens/atualizar/{id}": {
            put: {
                tags: ["Itens"],
                summary: "Atualizar item por ID (Mongo _id)",
                parameters: [
                    { name: "id", in: "path", required: true, schema: { type: "string" }, description: "ID do item (Mongo ObjectId)" }
                ],
                requestBody: {
                    required: true,
                    content: { "application/json": { schema: { $ref: "#/components/schemas/Item" } } }
                },
                responses: {
                    "200": { description: "Item atualizado", content: { "application/json": { schema: { $ref: "#/components/schemas/Item" } } } },
                    "404": { description: "Item nao encontrado", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorMsg" } } } }
                }
            }
        },

        "/itens/deletar/{id}": {
            delete: {
                tags: ["Itens"],
                summary: "Deletar item por ID (Mongo _id)",
                parameters: [
                    { name: "id", in: "path", required: true, schema: { type: "string" }, description: "ID do item (Mongo ObjectId)" }
                ],
                responses: {
                    "200": { description: "Item deletado", content: { "application/json": { schema: { $ref: "#/components/schemas/SuccessMsg" } } } },
                    "404": { description: "Item nao encontrado", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorMsg" } } } }
                }
            }
        },

        /***** ORDERS *****/
        "/order/criar": {
            post: {
                tags: ["Pedidos"],
                summary: "Criar pedido",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Order" },
                            example: {
                                orderId: "v10089016vdb-01",
                                value: 10000,
                                creationDate: "2023-07-19T12:24:11.529Z",
                                items: [{ productId: 2434, quantity: 1, price: 1000 }]
                            }
                        }
                    }
                },
                responses: {
                    "201": { description: "Pedido criado", content: { "application/json": { schema: { $ref: "#/components/schemas/Order" } } } },
                    "400": { description: "Requisicao invalida", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorMsg" } } } }
                }
            }
        },

        "/order/listar": {
            get: {
                tags: ["Pedidos"],
                summary: "Listar todos os pedidos",
                responses: {
                    "200": {
                        description: "Lista de pedidos",
                        content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Order" } } } }
                    }
                }
            }
        },

        "/order/buscar/{id}": {
            get: {
                tags: ["Pedidos"],
                summary: "Buscar pedido por orderId (campo orderId)",
                parameters: [
                    { name: "id", in: "path", required: true, schema: { type: "string" }, description: "orderId (ex: v10089016vdb-01)" }
                ],
                responses: {
                    "200": { description: "Pedido encontrado", content: { "application/json": { schema: { $ref: "#/components/schemas/Order" } } } },
                    "404": { description: "Pedido nao encontrado", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorMsg" } } } }
                }
            }
        },

        "/order/atualizar/{id}": {
            put: {
                tags: ["Pedidos"],
                summary: "Atualizar pedido por orderId (campo orderId)",
                parameters: [
                    { name: "id", in: "path", required: true, schema: { type: "string" }, description: "orderId (ex: v10089016vdb-01)" }
                ],
                requestBody: {
                    required: true,
                    content: { "application/json": { schema: { $ref: "#/components/schemas/Order" } } }
                },
                responses: {
                    "200": { description: "Pedido atualizado", content: { "application/json": { schema: { $ref: "#/components/schemas/Order" } } } },
                    "404": { description: "Pedido nao encontrado", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorMsg" } } } }
                }
            }
        },

        "/order/deletar/{id}": {
            delete: {
                tags: ["Pedidos"],
                summary: "Deletar pedido por orderId (campo orderId)",
                parameters: [
                    { name: "id", in: "path", required: true, schema: { type: "string" }, description: "orderId (ex: v10089016vdb-01)" }
                ],
                responses: {
                    "200": { description: "Pedido deletado", content: { "application/json": { schema: { $ref: "#/components/schemas/SuccessMsg" } } } },
                    "404": { description: "Pedido nao encontrado", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorMsg" } } } }
                }
            }
        }
    }
};