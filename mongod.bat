@ECHO ON
ECHO ################ Run Mongo db server ################ 
SET MongoDBBasepath=C:\Program Files\MongoDB\Server\4.0\bin
REM
cd %MongoDBBasepath%
mongod --dbpath D:\MYPROJ\PMP\Syne-PMP\NodeAPIServer\data


PAUSE
CLS
EXIT



