# fullstack test  

## how to run
git clone https://github.com/alexandr-krylov/fullstack-test.git  
cd fullstack-test  
docker-compose up -d  
cp backend/.env.test backend/.env  
docker exec -it app composer install  
docker exec -it app ./artisan key:generate  
docker exec -it app chmod -R 777 storage  
docker exec -it app ./artisan migrate  
## how to use
http://localhost:5173  
### register

http://localhost:5173/register

write your name, email, password and confirm the password

### login
http://localhost:5173/login
