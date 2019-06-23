#### Files explorer

Note:

- By default file will be stored in the `files` directory inside the project folder itself. you can change it in `config/index.js`
- Active mongo instance required as it stores all the tree related data inside mongo and including the filesz metadata and folder datas

To Run / Deploy:

- Go to project directory and run `npm i`
- as it takes Mongo connection URI from the ENV vars, you can pass it through ENV vars.
- To run the application, you must do `npm start`
- To run the application thrugh `pm2` , you can run this command: `pm2 start ecosystem.js` and also can pass ENV vars here

#### for all API head to : [here](https://www.getpostman.com/collections/4edbc723dd01845e3c2b)
