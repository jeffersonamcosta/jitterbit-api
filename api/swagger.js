export const swaggerDocument = {
    openapi: "3.0.0",
    info: {
        title: "Jitterbit API",
        version: "1.0.0",
        description: "API de Pedidos e Itens com CRUD completo."
    },
    servers: [
        {
            url: "http://localhost:3000",
            description: "Ambiente local"
        },
        {
            url: "https://jitterbit-api.vercel.app/",
            description: "Vercel"
        }
    ],

    components: {
        schemas: {
            Item: {
                type: "object",
                properties: {
                    productId: { type: "number" },
                    quantity: { type: "number" },
                    price: { type: "number" }
                }
            },
            OrderItem: {
                type: "object",
                properties: {
                    idItem: { type: "string" },
                    quantidadeItem: { type: "number" },
                    valorItem: { type: "number" }
                }
            },
            Order: {
                type: "object",
                properties: {
                    numeroPedido: { type: "string" },
                    valorTotal: { type: "number" },
                    dataCriacao: { type: "string", format: "date-time" },
                    items: {
                        type: "array",
                        items: { $ref: "#/components/schemas/OrderItem" }
                    }
                }
            }
        }
    },

    paths: {

        "/itens/criar": {
            post: {
                summary: "Criar item",
                tags: ["Itens"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Item" }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Item criado"
                    }
                }
            }
        },

        "/itens/listar": {
            get: {
                summary: "Listar itens",
                tags: ["Itens"],
                responses: {
                    200: {
                        description: "Lista de itens"
                    }
                }
            }
        },

        "/itens/buscar/{id}": {
            get: {
                summary: "Buscar item por ID",
                tags: ["Itens"],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true
                    }
                ],
                responses: {
                    200: {
                        description: "Item encontrado"
                    },
                    404: {
                        description: "Item não encontrado"
                    }
                }
            }
        },

        "/itens/atualizar/{id}": {
            put: {
                summary: "Atualizar item",
                tags: ["Itens"],
                parameters: [
                    { name: "id", in: "path", required: true }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Item" }
                        }
                    }
                },
                responses: {
                    200: { description: "Item atualizado" }
                }
            }
        },

        "/itens/deletar/{id}": {
            delete: {
                summary: "Deletar item",
                tags: ["Itens"],
                parameters: [
                    { name: "id", in: "path", required: true }
                ],
                responses: {
                    200: { description: "Item deletado" }
                }
            }
        },

        "/order/criar": {
            post: {
                summary: "Criar pedido",
                tags: ["Pedidos"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Order" }
                        }
                    }
                },
                responses: {
                    201: { description: "Pedido criado com sucesso" }
                }
            }
        },

        "/order/listar": {
            get: {
                summary: "Listar pedidos",
                tags: ["Pedidos"],
                responses: {
                    200: { description: "Lista de pedidos" }
                }
            }
        },

        "/order/buscar/{id}": {
            get: {
                summary: "Buscar pedido por ID",
                tags: ["Pedidos"],
                parameters: [
                    { name: "id", in: "path", required: true }
                ],
                responses: {
                    200: { description: "Pedido encontrado" },
                    404: { description: "Pedido não encontrado" }
                }
            }
        },

        "/order/atualizar/{id}": {
            put: {
                summary: "Atualizar pedido",
                tags: ["Pedidos"],
                parameters: [
                    { name: "id", in: "path", required: true }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Order" }
                        }
                    }
                },
                responses: {
                    200: { description: "Pedido atualizado" }
                }
            }
        },

        "/order/deletar/{id}": {
            delete: {
                summary: "Deletar pedido",
                tags: ["Pedidos"],
                parameters: [
                    { name: "id", in: "path", required: true }
                ],
                responses: {
                    200: { description: "Pedido deletado" }
                }
            }
        }
    }
};
