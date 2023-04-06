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
  
### CloudFront

https://d29obi8qjqqayl.cloudfront.net/

### Screenshots

![image](https://user-images.githubusercontent.com/44402789/230286641-3689fd0d-1239-4e3c-ae16-51a8377e7142.png)

![image](https://user-images.githubusercontent.com/44402789/230286545-b4c1731f-d4a2-494f-9804-ce283038ed8f.png)

### Additional (optional) tasks

Done:

+5 - Async/await is used in lambda functions

+5 - ES6 modules are used for Product Service implementation

+4 (All languages) - Lambda handlers (getProductsList, getProductsById) code is written not in 1 single module (file) and separated in codebase.

+4 (All languages) - Main error scenarios are handled by API ("Product not found" error).
