# Waiter WebApp

This is a web application for my sister's coffee shop in town, she need it to help her schedule weekly waiter shifts.

## Waiters can:

- register
- login
- select days they can work
- update the days they can work on

## My sister(admin) want to:

- see how many waiters are available to work
- see how many waiters are available to work
- reset the data to use the system for a new week
- She need 3 waiters for each day. Days for which there are enough waiters should be marked as green, days for which more waiters are needed still and days that are over subscribed should be highlighted accordingly.

## Getting Started

### Backend (Server side).

Clone or download this [respository](https://github.com/Gideon877/waiter_webapp.git) to your machine from GitHub.

#### Cloning

- Go to the terminal and and copy and paste the following code;

  ```
     $ git clone https://github.com/Gideon877/waiter_webapp.git waiter_webapp
  ```

### Prerequisites

What things you need to install the software and how to install them?

- NodeJS
- MongoDB
- Package.json dependencies
- Mocha

### Installing;

#### NodeJS

Before you try to install NodeJS open a terminal window and try to run it by typing, node -v. If NodeJS is installed it should tell you which version you have. Alternatively the command will fail and you will need to install it.

To install it on Ubuntu you can use the [apt-get package manager](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions.md).

Alternatively you can use nvm, the [Node Version Manager](https://github.com/creationix/nvm#install-script.md) to manage the version of NodeJS on your PC.

#### Mongodb

How to [Install MongoDB](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-mongodb-on-ubuntu-16-04.md) - only do Part 1.

#### Package.json dependencies

```json
"dependencies": {
    "body-parser": "^1.17.1",
    "express": "^4.15.2",
    "express-flash": "0.0.2",
    "express-handlebars": "^3.0.0",
    "express-session": "^1.15.4",
    "mongoose": "^4.11.5"
  }
```

To install all dependencies required for the app to run, on the terminal navigate to the project root, and type `npm install` .

#### Mocha Setup

##### Install Mocha

First you need to install Mocha using this command:

```
$ sudo npm install -g mocha
```

## Running the tests

Run `$ mocha` from app directory terminal window in the project directory and this will be your results;

```bash
modules should be able to
    ✓ store User details to MongoDB
    ✓ register/create a new unique "User" with password & username
    ✓ clear weekly schedule
    ✓ rejects duplicate

  4 passing (175ms)
```

### What does these tests?

1) create a new object (name, username and password) and store it in MongoDB.

```javascript
it('store User details to MongoDB', function(done) {
    models.Username.create({
        name: 'Vusi Baloyi',
        username: 'TaVusi',
        password: *******
    }, function(err, result) {
        if (err) {
            return done(err)
        }

        assert.equal("TaVusi", result.username)
        done(err);
    });
});
```

2) Create unique user.

```javascript
if (!theUsername) {
    models.Username.create({
        name: 'King Gideon',
        username: 'King',
        password: ****
    }, function(err, result) {
        if (err) {
            return done(err);
        }

        assert.equal('King', result.username);
        done();
    });
}
```

3) Clear waiter's weekly selected shift days.

```javascript
models.Username.find({}, function (err, user) {
    if (err) {
        return done(err)
    }

    for (var i = 0; i < user.length; i++) {
        user[i].days = [];
        user[i].save(function(err, result) {
            if (err) {
                return done(err);
            };
        });

        assert.equal(0, user[i].days.length);
    }

    done();
})
```

## Running the app locally

- In the command line, navigate to the project working folder.Once you are in the appropriate folder input this command

        $ nodemon or
        $ node index.js

- The following message should be displayed Server started at http://:::4444

- Then open a new tab on your browser and type this http://localhost:4444/ and the app will open.

## Deployment

The app is deployed at Heroku and gitHub. Use mLab to deploy your application.

### Prerequisites

The best practices in this article assume that you have:

- Node.js and npm installed.
- an existing Node.js app.
- a free Heroku account.
- the Heroku CLI.

Then start your app locally using `heroku local` command which is installed as a part of the Heroku CLI.

`$ heroku local web` Your app should now be running on <http://localhost:5000/>.

#### Deploying App on Heroku

```bash
$ git add .
$ git commit -m "Added a Procfile."
$ heroku login
Enter your Heroku credentials.
...
$ heroku create
Creating arcane-lowlands-8408... done, stack is cedar
http://arcane-lowlands-8408.herokuapp.com/ | git@heroku.com:arcane-lowlands-8408.git
Git remote heroku added
$ git push heroku master
...
-----> Node.js app detected
...
-----> Launching... done
       http://arcane-lowlands-8408.herokuapp.com deployed to Heroku
```

[Launch](http://waiter-8.herokuapp.com/)

To open the app in your browser, type `$ heroku open` .

## Built With

- [MLAB](https://mlab.com) - Cloud MongoDB server
- [NPM](https://www.npmjs.com) - Dependency Management
- [Bootstrap](https://bootswatch.com/solar/) - The web framework used

## Versioning

`"version": "1.0.0",`

## Author

- **Thabang Gideon Magaola** - _Initial work_ - [Thabang Gideon](https://github.com/Gideon877)

## License

This project is licensed under the ISC License - see the [ISC-LICENSE.md](https://github.com/nevir/readable-licenses/blob/master/markdown/ISC-LICENSE.md) file for details `"license": "ISC"`
