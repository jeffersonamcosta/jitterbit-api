# 🚀 Jitterbit - Teste Teorico IE PS - v2 - API Pedidos & Itens
------------------------------------------------------------------------
## 🛠 Tecnologias Utilizadas

- **Vercel** – Deploy serverless da aplicação
- **MongoDB Atlas** – Banco de dados NoSQL em nuvem

------------------------------------------------------------------------

## 📂 Estrutura do Projeto

    jitterbit-api/
    │ vercel.json
    │ package.json
    │ README.md
    │
    └── api/
        │ index.js
        │ db.js
        │ swagger.js
        │ order.js
        │ itens.js
        │
        └── models/
            │ Order.js
            │ Item.js

------------------------------------------------------------------------

## 📦 Modelos da Aplicação (Mongoose)

### 🧩 **Item**

``` js
{
  productId: Number,
  quantity: Number,
  price: Number
}
```

------------------------------------------------------------------------

### 📦 **Order**

``` js
{
  orderId: String,
  value: Number,
  creationDate: Date,
  items: [Item]
}
```

------------------------------------------------------------------------

## 📘 Documentação da API (Swagger)

A documentação foi construída com **Swagger UI Express**, utilizando CDN
para carregar:

-   `swagger-ui.min.css`
-   `swagger-ui-bundle.min.js`
-   `swagger-ui-standalone-preset.min.js`

Isso garante total compatibilidade com ambientes serverless como o
Vercel.

------------------------------------------------------------------------

## 🌐 Rotas Implementadas

### 📄 **Itens**

-   `POST /itens/criar`
-   `GET /itens/listar`
-   `GET /itens/buscar/:id`
-   `PUT /itens/atualizar/:id`
-   `DELETE /itens/deletar/:id`

------------------------------------------------------------------------

### 📄 **Pedidos**

-   `POST /order/criar`
-   `GET /order/listar`
-   `GET /order/buscar/:orderId`
-   `PUT /order/atualizar/:orderId`
-   `DELETE /order/deletar/:orderId`

------------------------------------------------------------------------

## 📚 Documentação Online

Swagger UI disponível em:

   https://jitterbit-api.vercel.app/docs/


------------------------------------------------------------------------

## 📜 Licença

MIT License.

## 🎯 Autor

**[Jefferson Costa](https://www.linkedin.com/in/jeffersonamcosta/)**

