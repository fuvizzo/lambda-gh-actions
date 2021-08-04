# Run a KOA webserver on AWS lambda using github actions

### Main goals:
- deploy of KOA web server on AWS lambda 
- bind the lambda to a AWS API Gateway created in the AWS console
- use github actions for CI/CD
- use typescript
- use full TDD (JEST testing framework)
- run KOA locally environment (in debug mode - launch the process or attach a debugger)

Refer to [this video tutorial](https://www.youtube.com/watch?v=UQiRhKgQ5X0) 

## Creating lambda
1. From the AWS console, in the Lambda section hit the button "Create Function"
2. Set "lambda-gh-actions" as name
3. Choose "Create a new role with basic Lambda permissions"
4. Hit "Create Function" at the bottom of the page
5. Add the environemnt variable "API_ROOT_PATH" with value "API"

## Creating API Gateway

1. From the AWS console, in the API Gateway section hit the button "Create API"
2. Select Rest API, give it a name ad complete the initialization.
3. From the newly creted Rest APIs panel, add a new resource with name "Base" and  "API" as path
4. In the newly created resource add a new GET method. Leave "Lambda function" as integration type, remember to mark the "Use Lambda Proxy integration", choose the Lambda you deployed by github action. 
5. Add a new resource under the resource "API" with name "ID" and "{id}" as path
6. Same as point 4
7. Deploy your API gateway by choosing whatever you like as stage name

 ## Execution role for AWS CLI

 In the main.yml file inside the .github/workflows folder a "configure AWS credentials" step is defined where you can bind your IAM user credentials to the preinstalled AWS-CLI running within the docker image (github actions uses behind the hood) where your code is gonna be executed along with node.js.
 This step is mandatory in order to allow your github to connect to AWS and upload your code according to the actions you defined.

 I created a specif IAM user called "aws-cli-user" I gave basic permissions to. 
 More precisely I created a custom permission policy called "lambda-aws-cli-policy" only capable to perform the "UpdateFunctionCode" and just on my a Lambda function "lambda-gh-actions". This allows me to invoke the "aws lambda update-function-code" in the main.yml and push the code to the S3 AWS bucket where the lambda code is stored.
 
 
