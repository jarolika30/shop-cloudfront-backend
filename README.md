# shop-cloudfront-backend

### Done:
Evaluation criteria (70 points for covering all criteria)
- Product Service Serverless config contains configuration for 2 lambda functions, API is not working at all, but YAML configuration is correct
- The getProductsList OR getProductsById lambda function returns a correct response (POINT1)
- The getProductsById AND getProductsList lambda functions return a correct response code (POINT2)
- Your own Frontend application is integrated with Product Service (/products API) and products from Product Service are represented on Frontend. AND POINT1 and POINT2 are done.

### Endpoints:
  GET - https://j02ahsxjv4.execute-api.us-east-1.amazonaws.com/dev/products
  GET - https://j02ahsxjv4.execute-api.us-east-1.amazonaws.com/dev/products/{id}
