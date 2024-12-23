# dnd

Prepare .env file from .env.example.

### Run application with docker
1) Make sure that .sh files end of line are set to LF.

2) Go to directory "/dnd" in terminal.

3) To start application.
```
make start
```

4) To start application e2e tests:
```
make e2e-test
```

5) To start application unit tests:
```
make unit-test
```

6) Application documentation:
```
http://localhost:{port}/api
```

## Run application without docker
### Setup application
Create database for development purpose for example "mydatabase".
Create database for testing purpose for example "mydatabase_test".
Testing database should have the same name like development database plus postfix "_test".

Prepare .env file from .env.example.

### Run application
1) Go to directory "/dnd/app" in terminal and install all dependencies.
```
yarn
```

2) Run command.
```
yarn build
```

3) Run migrations.
```
yarn migration:run
```

4) To start application.
```
yarn start
```

5) To start application e2e tests:
```
yarn test:e2e
```

6) To start application unit tests:
```
yarn test
```

7) Application documentation:
```
http://localhost:{port}/api
```
