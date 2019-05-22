## Quickstart

1.  Install the [node.js](https://nodejs.org)
2.  Clone the project
3.  Dependency installation
    ```bash
    npm i
    ```
4.  Start dev for index page
    ```bash
    npm run dev-index
    ```
5.  Start build for index page
    ```bash
    npm run build-index
    ```    
   
6.  In browser open page with address [`http://localhost:8085/`](http://localhost:8085/)

7.  Commands for build all pages on server
    ```bash
    npm i
    npm link gulp
    sed -i -e 's/ build/ build --env=production/g' builder.sh
    sh builder.sh
    ```
