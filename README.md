# hacktivoverflow

**user router**

| No | Router | Method | Description 
--- | --- | --- | ---
1 | /register | POST | Register a User
2 | /login | POST | Login User
3 | /verify | GET | Verify if Token Exist

**question router**

| No | Router | Method | Description
--- | --- | --- | ---
1 | / | POST | Add New Question
2 | /findall | GET | Get All Question
3 | /:id | GET | Get One Question
4 | /addvote/:id | POST | Add Vote Question
5 | /downvote/:id | POST | Remove Vote Question
6 | /:id | DELETE | Remove Question
7 | /:id | PUT | Update a Question
8 | /best/:id | PUT | Add Best Answer

**answer routers**

| No | Router | Method | Description
--- | --- | --- | ---
1 | /:id | POST | Add New Answer
2 | /voteup/:id | POST | Add Vote Answer
3 | /votedown/:id | POST | Remove Vote Question
4 | /:id | GET | Get One Answer
5 | /:id | PUT | Update an Answer
6 | /:id | delete | Delete an Answer