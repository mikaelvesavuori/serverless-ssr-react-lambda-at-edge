# React Server(less)-Side Rendering on AWS Lambda@Edge

Server(less) Side Rendering is a powerful, relatively new pattern supported by services as AWS Lambda@Edge and Cloudflare Workers.

This repo demonstrates an example of a route-splitted universal/isomorphic React application that is served as HTML from an edge function. In plain-speak, this means that you should be able to combine the best of both worlds, the dynamism of client-side rendered applications with the fast paint speed of server-side rendering. Obviously, no one is going to miss the server that was unfortunately always involved in typical SSR—those days are gone, and we'll be using AWS Lambda@Edge for our compute instead.

To get there, this repo uses Serverless Framework to deploy your SSR server (running the app that's built from your universal React source code) to the AWS CloudFront edge network. Currently, I am not sure how to specify in the settings that you want a non-function behavior for CloudFront (detailed below), so every time you deploy, you will need to add a behavior that redirects traffic for assets (images etc) to an S3 bucket.

Please note that the code in this repo may or may not support your more complex use cases. See this as a starting point.

**Stack**

- [Serverless Framework](https://www.serverless.com)
- [Webpack](https://webpack.js.org) with various loaders
- [React](https://reactjs.org)
- [Babel](https://babeljs.io)

## Structure

- `dist/`: The bundled client-side application
- `docs/`: Any documentation-related things
- `server/`: A basic vanilla server that uses `renderToString` to render your React app
- `src/`: The actual universal React app, any application logic and presentation should go here
- `testdata/`: Test data so you can mock the AWS context and event objects

You will probably want to modify `serverless.yml` for your custom settings.

Webpack configs are available for both client and server, and for development usage.

## Prerequisites

- Amazon Web Services account
- Credentials that support using S3, Cloudfront, Lambda, CloudFormation
- Create an S3 bucket where you will put your static site assets
- Logged in to AWS through your environment
- Serverless Framework installed globally (?)
- AWS CLI installed

## Install dependencies

Run `npm install` or `yarn install` to install dependencies.

## Running locally

Run `npm run dev` or `yarn dev`.

## Building

Build client and server with `npm run build:server` or `yarn run build:server`. For individual builds, run:

- `npm run build:client` or `yarn run build:client`
- `npm run build:server` or `yarn run build:server`

## MANUAL STEP, PRE-DEPLOYMENT: Edit package script to point to your bucket

In `package.json` there is a step called `deploy:client`. It needs to point to your own bucket [which you must enable Static Site Hosting for](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html), as well.

Also, edit the `BUCKET_ORIGIN` variable in `serverless.yml`.

## Deploying

Run `npm run deploy` or `yarn run deploy` after having built your bundles. The `start` command combines both the build and the deployment step.

If you really hate using the callback pattern, I'd advise to use it since using the non-callback pattern (at least for me) doesn't return back correctly with Lambda@Edge. Could always be Error 30 ("idiot programmer") but for now, go with the flow.

## MANUAL STEP, POST-DEPLOMENT: Redirect static asset traffic to S3

See the below image for details. Go to CloudFront and add a new cache behavior for `/assets/*` so anything that has to do with assets reaches S3 rather than the Lambda function (which won't really help at all). Obviously, if your pattern is different, then accomodate that instead.

![CloudFront cache behavior that needs to be manually added post-deployment](/docs/cloudfront-cache-behavior-s3-assets.png)

This should absolutely be possible to automate, but that's for another day.

## Testing and troubleshooting live code

You can absolutely clean the code to be runnable from your machine more easily, so you could bundle and run your function like any other Node.js code.

1. Always try running code locally first. Try to not tie your implementation to specific AWS context signatures or somesuch. Mock those if needed. Test data is available in `testdata/`.
2. The fastest way to test your code "for real" is to copy-paste it into the Lambda view in the AWS visual console.
3. Try to only deploy and test code when you are confident things should be pretty straightforward. Cloudfront deployment takes between 5-15 minutes so you'll be waiting _a lot_ otherwise.

Being lazy, the fastest and "easiest" way to test real, bundled code has been to:

1. Compile your function code with `sls package`
2. Go to the `/.serverless/` folder, unzip the ZIP package and open your (minified) function code
3. Go to the Lambda panel in the AWS GUI/console
4. Copy-and-paste the code into the function code editor, click `Save`
5. Test the code with `Test`

_I've bundled the first two steps into the `debug:compiled` package script_. The step adds a `__temp__` folder into `.serverless` and attempts to open it with Visual Studio Code. You may need to modify the script if you change the script names, and/or don't use VS Code.

When you get the hang of this, you can even do those above steps manually in less than 20 seconds.

This approach has the added benefit of giving you the exact same results as it will give when served through Cloudfront.

## References

- [Hosting a static website on Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html)
- [Requirements and Restrictions on Lambda Functions](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-requirements-limits.html)
- [AWS Lambda permissions](https://docs.aws.amazon.com/lambda/latest/dg/lambda-permissions.html)
- [Testing and Debugging Lambda@Edge Functions](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-edge-testing-debugging.html)
- [Serverless Framework: Lambda@Edge support now available](https://www.serverless.com/blog/lambda-at-edge-support-added)
- [Serverless Framework: CloudFront reference](https://www.serverless.com/framework/docs/providers/aws/events/cloudfront/)
- [Using lambda@Edge for Server-Side Rendering](https://medium.com/medwing-engineering-product-design/using-lambda-edge-for-server-side-rendering-318d9422d76b)
- [React SPA with server-side rendering on AWS Lambda](https://sbstjn.com/serverless-create-react-app-server-side-rendering-ssr-lamda.html)
- [Serverless SSR for create-react-app](https://github.com/sbstjn/cra-serverless)
- [Serverless Side Rendering — The Ultimate Guide](https://blog.webiny.com/serverless-side-rendering-e1c0924b8da1)
- [Stack Overflow: How to create a Lamda@Edge from the command line?](https://stackoverflow.com/questions/52936350/how-to-create-a-lamdaedge-from-the-command-line)
- [AWS CLI Documentation: update-distribution](https://docs.aws.amazon.com/cli/latest/reference/cloudfront/update-distribution.html)
