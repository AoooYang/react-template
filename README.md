# **File-SDK**

Configuring a React Packaging Environment Based on Webpack

## **Running Locally**

1. Install dependencies:

```
npm install
```

1. Start the dev server:

```
npm run serve
```

1. Build production package:

```
npm run build
```

## **Modify webpack configuration**

1. Create a new `webpack.config.js` file in the root directory (if it does not exist)

2. Write your own personalized configuration in the exported object

3. For example, if you need to modify the alias

   ```
   const path = require("path");
   module.exports = {
     resolve: {
       alias: {
         '@': path.resolve(__dirname, './src'),
       },
     }
   }
   ```
