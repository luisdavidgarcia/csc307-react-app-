
URL="http://localhost:8000/users"
ID="8d2560de-8fed-4a73-8625-9090fb586928"
HEADER="Content-Type: application/json"
JSON='{"name": "John Doe", "job": "cool guy"}'

# Get Request
# curl -X GET 
#status_code=$(curl -X GET $URL/$ID -w "%{http_code}\n")

# Delete Request
#status_code=$(curl -X DELETE $URL/$ID -w "%{http_code}\n")


# Post Request
status_code=$(curl -X POST -H "$HEADER" -d "$JSON" $URL -w "%{http_code}\n")

echo "Response status code: $status_code"
