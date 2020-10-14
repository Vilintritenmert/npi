##NPI 

##Requirements 

_Docker && Docker Compose_

##Installation 

1. `docker-compose up` 
2. `docker-compose run --rm --no-deps npi-microservice npm run migration:run`
3. `docker-compose run --rm --no-deps npi-microservice npm run npi:import`


 Enjoy
  
  
 Get request by url `http://localhost:3000/health-care-provider`
 
Parameters:
 ``` 
   name - optional 
   limit - optional, min:1, max:200
   page - optional, min:1 
   code - optional
```   

Response
```
{
  data: HealthCareProvider[];
  page: number;
  limit: number;
  totalCount: number;
}
```
