const endpoints_info = {
  "endpoints": [
    {
      "path": "/",
      "method": "GET",
      "description": "Get general information",
    },
    {
      "path": "/info",
      "method": "GET",
      "description": "Get endpoints information",
    },
    {
      "path": "/story",
      "method": "GET",
      "description": "Get the story in plain text format",
    },
    {
      "path": "/objects",
      "method": "GET",
      "description": "Get all objects",
    },
    {
      "path": "/objects/:character",
      "method": "GET",
      "description": "Get objects by character",
    },
    {
      "path": "/objects/:character/:type",
      "method": "GET",
      "description": "Get objects by character and type",
    },
    {
      "path": "/file/:filename",
      "method": "GET",
      "description": "Get the content of a text file",
      "query_parameters": "Specify filename in the query parameters",
    },
  ]
};

module.exports = endpoints_info;
