### Run node server
```
cd /var/www/melody-server/
vagrant ssh
cd /var/www/melody-server/ && supervisor bin/www
```

------------
------------
# Create migration

[Read about Sequelize migrations](http://docs.sequelizejs.com/en/latest/docs/migrations/)

```
node_modules/.bin/sequelize --config=migrations/config/dbConfig.js migration:create --name NAME
```

# How to run migrations manually

(run inside vagrant)

```
cd /var/www/melody-server/
node_modules/.bin/sequelize --config=migrations/config/dbConfig.js db:migrate
```

## How to deploy project

### Deploy to sandbox


```
cd  /var/www/melody-server/provision && ./deploy.sh -s sandbox
#or use with flag '-f' to force deploy
cd  /var/www/melody-server/provision && ./deploy.sh -s sandbox -f
```

### Build and Deploy to sandbox
this command usage for run full software installation on sandbox server (command with flag '-i')
```
cd  /var/www/melody-server/provision && ./deploy.sh -s sandbox -i
```

if you need connect to sandbox server via ssh use next command:
```
cd  /var/www/melody-server/provision/amazon_key && ssh -i dev.pem ubuntu@92.63.99.143
```

https://sandbox.guess-melody.ru/

https://db.sandbox.guess-melody.ru/

```
{ user: admin,  password: b2bPass},
```

https://monit.sandbox.guess-melody.ru/


### HTTPS

read about -> https://certbot.eff.org/#ubuntutrusty-other
webroot folder = /var/www/storage


-----
# DB
-----

# делаем дамп из postgresql

```
sudo su - postgres
pg_dump melody > pg_melody_dump.sql

результат бюдет в /var/lib/postgresql
```


# доп. инфа

```
для локальных тестов - рекомендуется удалить базу данных ( что-бы удалились все связанные данные )
```


# заливаем dump в локальную PostgreSQL базу данных

```
psql -h 127.0.0.1 -d melody -U melody_username -f pg_melody_dump.sql
#pass 0e90415df25cfcb9892176b003d03ed4
#при возникноении ошибок можно удалить БД и создать ее заного ( provision роль pgsql )
```

