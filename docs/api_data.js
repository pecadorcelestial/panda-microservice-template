define({ "api": [
  {
    "type": "delete",
    "url": "/address",
    "title": "Elimina la información de una dirección.",
    "version": "1.0.0",
    "name": "DeleteAddress",
    "group": "Address",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador único de la dirección.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "messge",
            "description": "<p>Mensaje de éxito.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     message: \"Registro eliminado con éxito.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AddressNotFound",
            "description": "<p>Un objeto vacío.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/address.ts",
    "groupTitle": "Address"
  },
  {
    "type": "get",
    "url": "/address",
    "title": "Solicita la información de una dirección.",
    "version": "1.0.0",
    "name": "GetAddress",
    "group": "Address",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador único de la dirección.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Ejemplo de uso:",
        "content": "curl -i http://localhost:8098/address?id=5c704eeaf4ce5a673cc0bb14",
        "type": "json"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AddressNotFound",
            "description": "<p>Un objeto vacío.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/address.ts",
    "groupTitle": "Address",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Identificador único generado por MongoDB.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "parentId",
            "description": "<p>Identificador tipo ObjectId del catálogo padre.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "street",
            "description": "<p>Nombre de la calle.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "outdoorNumber",
            "description": "<p>Número exterior.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "interiorNumber",
            "description": "<p>Número interior.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "settlement",
            "description": "<p>Nombre de la colonia / asentamiento.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>Información sobre la ubicación.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "reference",
            "description": "<p>Referencia de la dirección.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "latitude",
            "description": "<p>Distancia angular que hay desde un punto de la superficie de la Tierra hasta el paralelo del ecuador.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "longitude",
            "description": "<p>Dimensión de una línea o de un cuerpo considerando su extensión en línea recta..</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "zipCode",
            "description": "<p>Código postal.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "zipCodeId",
            "description": "<p>Identificador tipo ObjectId del catálogo de ubicaciones.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Fecha de creación.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Fecha de la última modificación.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"loc\": {\n        \"coordinates\": [\n            -100.3889093,\n            20.6165895\n        ],\n        \"type\": \"Point\"\n    },\n    \"_id\": \"5c704eeaf4ce5a673cc0bb14\",\n    \"parentId\": \"5c6f2856f002554ab4b07fd5\",\n    \"street\": \"Nogal\",\n    \"outdoorNumber\": \"121\",\n    \"interiorNumber\": \"3er. Piso\",\n    \"settlement\": \"Arboledas\",\n    \"location\": \"\",\n    \"reference\": \"\",\n    \"latitude\": 20.6165895,\n    \"longitude\": -100.3889093,\n    \"zipCode\": 76140,\n    \"zipCodeId\": 1,\n    \"createdAt\": \"2019-02-22T19:35:06.150Z\",\n    \"updatedAt\": \"2019-02-22T19:35:06.150Z\",\n    \"__v\": 0\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/address",
    "title": "Guarda la información de una dirección.",
    "version": "1.0.0",
    "name": "PostAddress",
    "group": "Address",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AddressNotFound",
            "description": "<p>Un objeto vacío.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/address.ts",
    "groupTitle": "Address",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "address",
            "description": "<p>Objeto / Interface tipo dirección.</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "address.parentId",
            "description": "<p>Identificador del catálogo padre.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "addresses._id",
            "description": "<p>Identificador único generado por MongoDB.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "addresses.parentId",
            "description": "<p>Identificador tipo ObjectId del catálogo padre.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "addresses.street",
            "description": "<p>Nombre de la calle.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "addresses.outdoorNumber",
            "description": "<p>Número exterior.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "addresses.interiorNumber",
            "description": "<p>Número interior.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "addresses.settlement",
            "description": "<p>Nombre de la colonia / asentamiento.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "addresses.location",
            "description": "<p>Información sobre la ubicación.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "addresses.reference",
            "description": "<p>Referencia de la dirección.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "addresses.latitude",
            "description": "<p>Distancia angular que hay desde un punto de la superficie de la Tierra hasta el paralelo del ecuador.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "addresses.longitude",
            "description": "<p>Dimensión de una línea o de un cuerpo considerando su extensión en línea recta..</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "addresses.zipCode",
            "description": "<p>Código postal.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "addresses.zipCodeId",
            "description": "<p>Identificador tipo ObjectId del catálogo de ubicaciones.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Identificador único generado por MongoDB.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "parentId",
            "description": "<p>Identificador tipo ObjectId del catálogo padre.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "street",
            "description": "<p>Nombre de la calle.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "outdoorNumber",
            "description": "<p>Número exterior.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "interiorNumber",
            "description": "<p>Número interior.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "settlement",
            "description": "<p>Nombre de la colonia / asentamiento.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>Información sobre la ubicación.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "reference",
            "description": "<p>Referencia de la dirección.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "latitude",
            "description": "<p>Distancia angular que hay desde un punto de la superficie de la Tierra hasta el paralelo del ecuador.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "longitude",
            "description": "<p>Dimensión de una línea o de un cuerpo considerando su extensión en línea recta..</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "zipCode",
            "description": "<p>Código postal.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "zipCodeId",
            "description": "<p>Identificador tipo ObjectId del catálogo de ubicaciones.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Fecha de creación.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Fecha de la última modificación.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"loc\": {\n        \"coordinates\": [\n            -100.3889093,\n            20.6165895\n        ],\n        \"type\": \"Point\"\n    },\n    \"_id\": \"5c704eeaf4ce5a673cc0bb14\",\n    \"parentId\": \"5c6f2856f002554ab4b07fd5\",\n    \"street\": \"Nogal\",\n    \"outdoorNumber\": \"121\",\n    \"interiorNumber\": \"3er. Piso\",\n    \"settlement\": \"Arboledas\",\n    \"location\": \"\",\n    \"reference\": \"\",\n    \"latitude\": 20.6165895,\n    \"longitude\": -100.3889093,\n    \"zipCode\": 76140,\n    \"zipCodeId\": 1,\n    \"createdAt\": \"2019-02-22T19:35:06.150Z\",\n    \"updatedAt\": \"2019-02-22T19:35:06.150Z\",\n    \"__v\": 0\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/address",
    "title": "Actualiza la información de una dirección.",
    "version": "1.0.0",
    "name": "PutAddress",
    "group": "Address",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AddressNotFound",
            "description": "<p>Un objeto vacío.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/address.ts",
    "groupTitle": "Address",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "address",
            "description": "<p>Objeto / Interface tipo dirección.</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "address.parentId",
            "description": "<p>Identificador del catálogo padre.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "addresses._id",
            "description": "<p>Identificador único generado por MongoDB.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "addresses.parentId",
            "description": "<p>Identificador tipo ObjectId del catálogo padre.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "addresses.street",
            "description": "<p>Nombre de la calle.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "addresses.outdoorNumber",
            "description": "<p>Número exterior.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "addresses.interiorNumber",
            "description": "<p>Número interior.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "addresses.settlement",
            "description": "<p>Nombre de la colonia / asentamiento.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "addresses.location",
            "description": "<p>Información sobre la ubicación.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "addresses.reference",
            "description": "<p>Referencia de la dirección.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "addresses.latitude",
            "description": "<p>Distancia angular que hay desde un punto de la superficie de la Tierra hasta el paralelo del ecuador.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "addresses.longitude",
            "description": "<p>Dimensión de una línea o de un cuerpo considerando su extensión en línea recta..</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "addresses.zipCode",
            "description": "<p>Código postal.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "addresses.zipCodeId",
            "description": "<p>Identificador tipo ObjectId del catálogo de ubicaciones.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Identificador único generado por MongoDB.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "parentId",
            "description": "<p>Identificador tipo ObjectId del catálogo padre.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "street",
            "description": "<p>Nombre de la calle.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "outdoorNumber",
            "description": "<p>Número exterior.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "interiorNumber",
            "description": "<p>Número interior.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "settlement",
            "description": "<p>Nombre de la colonia / asentamiento.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>Información sobre la ubicación.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "reference",
            "description": "<p>Referencia de la dirección.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "latitude",
            "description": "<p>Distancia angular que hay desde un punto de la superficie de la Tierra hasta el paralelo del ecuador.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "longitude",
            "description": "<p>Dimensión de una línea o de un cuerpo considerando su extensión en línea recta..</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "zipCode",
            "description": "<p>Código postal.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "zipCodeId",
            "description": "<p>Identificador tipo ObjectId del catálogo de ubicaciones.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Fecha de creación.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Fecha de la última modificación.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"loc\": {\n        \"coordinates\": [\n            -100.3889093,\n            20.6165895\n        ],\n        \"type\": \"Point\"\n    },\n    \"_id\": \"5c704eeaf4ce5a673cc0bb14\",\n    \"parentId\": \"5c6f2856f002554ab4b07fd5\",\n    \"street\": \"Nogal\",\n    \"outdoorNumber\": \"121\",\n    \"interiorNumber\": \"3er. Piso\",\n    \"settlement\": \"Arboledas\",\n    \"location\": \"\",\n    \"reference\": \"\",\n    \"latitude\": 20.6165895,\n    \"longitude\": -100.3889093,\n    \"zipCode\": 76140,\n    \"zipCodeId\": 1,\n    \"createdAt\": \"2019-02-22T19:35:06.150Z\",\n    \"updatedAt\": \"2019-02-22T19:35:06.150Z\",\n    \"__v\": 0\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/addresses",
    "title": "Solicita la información paginada de todas las direcciones.",
    "version": "1.0.0",
    "name": "GetAddresses",
    "group": "Addresses",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Cantidad de resultados por pagina.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Número de pagina solicitada.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "zipCode",
            "description": "<p>Código postal.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Ejemplo de uso:",
        "content": "curl -i http://localhost:8098/addresses?limit=20&page=2",
        "type": "json"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AddressesNotFound",
            "description": "<p>Un arreglo vacío.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n[]",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/address.ts",
    "groupTitle": "Addresses",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "addresses",
            "description": "<p>Arreglo de direcciones.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addresses._id",
            "description": "<p>Identificador único generado por MongoDB.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addresses.parentId",
            "description": "<p>Identificador tipo ObjectId del catálogo padre.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addresses.street",
            "description": "<p>Nombre de la calle.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addresses.outdoorNumber",
            "description": "<p>Número exterior.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addresses.interiorNumber",
            "description": "<p>Número interior.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addresses.settlement",
            "description": "<p>Nombre de la colonia / asentamiento.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addresses.location",
            "description": "<p>Información sobre la ubicación.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addresses.reference",
            "description": "<p>Referencia de la dirección.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "addresses.latitude",
            "description": "<p>Distancia angular que hay desde un punto de la superficie de la Tierra hasta el paralelo del ecuador.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "addresses.longitude",
            "description": "<p>Dimensión de una línea o de un cuerpo considerando su extensión en línea recta..</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "addresses.zipCode",
            "description": "<p>Código postal.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "addresses.zipCodeId",
            "description": "<p>Identificador tipo ObjectId del catálogo de ubicaciones.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "addresses.createdAt",
            "description": "<p>Fecha de creación.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "addresses.updatedAt",
            "description": "<p>Fecha de la última modificación.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "[\n\t {\n\t     \"loc\": {\n\t         \"coordinates\": [\n\t             -100.3889093,\n\t             20.6165895\n\t         ],\n\t         \"type\": \"Point\"\n\t     },\n\t     \"_id\": \"5c704eeaf4ce5a673cc0bb14\",\n\t     \"parentId\": \"5c6f2856f002554ab4b07fd5\",\n\t     \"street\": \"Nogal\",\n\t     \"outdoorNumber\": \"121\",\n\t     \"interiorNumber\": \"3er. Piso\",\n\t     \"settlement\": \"Arboledas\",\n\t     \"location\": \"\",\n\t     \"reference\": \"\",\n\t     \"latitude\": 20.6165895,\n\t     \"longitude\": -100.3889093,\n\t     \"zipCode\": 76140,\n\t     \"zipCodeId\": 1,\n\t     \"createdAt\": \"2019-02-22T19:35:06.150Z\",\n\t     \"updatedAt\": \"2019-02-22T19:35:06.150Z\",\n\t     \"__v\": 0\n\t },\n\t {\n\t     \"loc\": {\n\t         \"coordinates\": [\n\t             -100.3878499,\n\t             20.614145\n\t         ],\n\t         \"type\": \"Point\"\n\t     },\n\t     \"_id\": \"5c704eeaf4ce5a673cc0bb14\",\n\t     \"parentId\": \"5c6f2856f002554ab4b07fd5\",\n\t     \"street\": \"Boulevard Bernardo Quintana\",\n\t     \"outdoorNumber\": \"4100\",\n\t     \"interiorNumber\": \"3er. Piso\",\n\t     \"settlement\": \"Alamos 3ra. Sección\",\n\t     \"location\": \"\",\n\t     \"reference\": \"\",\n\t     \"latitude\": 20.614145,\n\t     \"longitude\": -100.3878499,\n\t     \"zipCode\": 76160,\n\t     \"zipCodeId\": 1,\n\t     \"createdAt\": \"2019-02-22T19:35:06.150Z\",\n\t     \"updatedAt\": \"2019-02-22T19:35:06.150Z\",\n\t     \"__v\": 0\n\t }\n]",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/addresses/byGeoNear",
    "title": "Solicita la información de todas las direcciones cerca de un punto.",
    "version": "1.0.0",
    "name": "GetAddressesByGeoLocation",
    "group": "Addresses",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "latitude",
            "description": "<p>Distancia angular que hay desde un punto de la superficie de la Tierra hasta el paralelo del ecuador.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "longitude",
            "description": "<p>Dimensión de una línea o de un cuerpo considerando su extensión en línea recta..</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "maxDistance",
            "description": "<p>Distancia máxima en metros en los que se buscarán resultados.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Ejemplo de uso:",
        "content": "curl -i http://localhost:8098/addresses/byGeoNear?latitude=20.6165895&longitude=-100.3889093&maxDistance=10000",
        "type": "json"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AddressesNotFound",
            "description": "<p>Un arreglo vacío.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n[]",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/address.ts",
    "groupTitle": "Addresses",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "addresses",
            "description": "<p>Arreglo de direcciones.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addresses._id",
            "description": "<p>Identificador único generado por MongoDB.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addresses.parentId",
            "description": "<p>Identificador tipo ObjectId del catálogo padre.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addresses.street",
            "description": "<p>Nombre de la calle.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addresses.outdoorNumber",
            "description": "<p>Número exterior.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addresses.interiorNumber",
            "description": "<p>Número interior.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addresses.settlement",
            "description": "<p>Nombre de la colonia / asentamiento.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addresses.location",
            "description": "<p>Información sobre la ubicación.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addresses.reference",
            "description": "<p>Referencia de la dirección.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "addresses.latitude",
            "description": "<p>Distancia angular que hay desde un punto de la superficie de la Tierra hasta el paralelo del ecuador.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "addresses.longitude",
            "description": "<p>Dimensión de una línea o de un cuerpo considerando su extensión en línea recta..</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "addresses.zipCode",
            "description": "<p>Código postal.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "addresses.zipCodeId",
            "description": "<p>Identificador tipo ObjectId del catálogo de ubicaciones.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "addresses.createdAt",
            "description": "<p>Fecha de creación.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "addresses.updatedAt",
            "description": "<p>Fecha de la última modificación.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "[\n    {\n        \"_id\": \"5c704eeaf4ce5a673cc0bb14\",\n        \"loc\": {\n            \"coordinates\": [\n                -100.3889093,\n                20.6165895\n            ],\n            \"type\": \"Point\"\n        },\n        \"parentId\": \"5c6f2856f002554ab4b07fd5\",\n        \"street\": \"Nogal\",\n        \"outdoorNumber\": \"121\",\n        \"interiorNumber\": \"3er. Piso\",\n        \"settlement\": \"Arboledas\",\n        \"location\": \"\",\n        \"reference\": \"\",\n        \"latitude\": 20.6165895,\n        \"longitude\": -100.3889093,\n        \"zipCode\": 76140,\n        \"zipCodeId\": 1,\n        \"createdAt\": \"2019-02-22T19:35:06.150Z\",\n        \"updatedAt\": \"2019-02-22T19:35:06.150Z\",\n        \"__v\": 0,\n        \"distance\": 0\n    },\n    {\n        \"_id\": \"5c74098d9213bf1754d79e7f\",\n        \"loc\": {\n            \"coordinates\": [\n                -100.3878499,\n                20.614145\n            ],\n            \"type\": \"Point\"\n        },\n        \"parentId\": \"5c6f2856f002554ab4b07fd5\",\n        \"street\": \"Boulevard Bernardo Quintana\",\n        \"outdoorNumber\": \"4100\",\n        \"interiorNumber\": \"3er. Piso\",\n        \"settlement\": \"Alamos 3ra. Sección\",\n        \"location\": \"\",\n        \"reference\": \"\",\n        \"latitude\": 20.614145,\n        \"longitude\": -100.3878499,\n        \"zipCode\": 76160,\n        \"zipCodeId\": 1,\n        \"createdAt\": \"2019-02-25T15:28:13.586Z\",\n        \"updatedAt\": \"2019-02-25T15:28:13.586Z\",\n        \"__v\": 0,\n        \"distance\": 293.65342451090686\n    }\n]",
          "type": "json"
        }
      ]
    }
  }
] });
