## Presentation of the solution
URL [Google Sheets](https://docs.google.com/presentation/d/1qiYO1B8BkOTyFQIhQTuDhptAHfCm8ZFFF2lrKqcNqPQ/edit?usp=sharing)
## First steps

### ⚙️ Installing dependencies

Open the command terminal at the root of the project and run the following command.

```shell
$ npm install
```

### Defining environment variables

An .env file must be generated in the root of the project, the structure that it will contain can be obtained from the file
called .env.example, once the structure is copied, it only remains to define the values for each of the parameters.

```dotenv
# Api
APP_SERVICE_URL
APP_SERVICE_PORT
APP_SERVICE_BASEPATH

#PRODUCT
PRODUCT_BASEPATH
PRODUCT_PATH_SEARCH

```

### 🚀 Running on dev

If you want to run the project in a local environment, open the command terminal at the root of the project and run the
following command.

```bash
# development
$ npm run start

# o 

# watch mode
$ npm run start:dev
```

## ➕ Swagger

To access the project swagger documentation
 [Url swagger](http://localhost:3000/api/swagger)


## 🐳 Running the app with docker
```bash
# Construir la imagen
$ docker-compose up --build

# Levantar el servicios
$ docker-compose up

# Levantar el servicio en modo detach
$ docker-compose up -d

# Detener el servicio
$ docker-compose down
```

## 🧪Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

### Running in production

It is recommended to delete the dist folder before running the project, to remove any old code that may have been cached.
code that has been cached.

This can be done by running the following command:

```shell
$ npm run prebuild
```
To re-build the dist folder, run the following command:
```shell
$ npm run build
```

Finally, you can run the project in production with the following command:
```shell
$ npm start
```

