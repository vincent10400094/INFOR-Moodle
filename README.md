# INFOR-Moodle
INFOR 木豆

## Usage
```
$ npm install
$ npm run build
```
config
```
//credentials.js
module.exports = {
	cookieSecret: 'your secret',
	gmail: {
		user: 'your mail',
		pass: 'your pass',
	},
	facebookAuth: {
		ID: 'your facebook app id',
		Secret: 'your facebook app secret',
		callbackURL: 'your domain/auth/facebook/callback',
	},
}
```
```
//setting.js
module.exports = {
  'cookieSecret': 'your secret',
  'db': 'blog',
  'host': 'localhost',
  'port': 27017,
  'serverport': your port,
};

```
start
```
$ npm start
```
