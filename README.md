# applications.paper-trail.ui-service

## Current Flow

1. UI calls API for a link token
1. Link token is returned and used in usePlaidLink to init the `open` function
1. Button is clicked calls the `open` function that loads Plaid script
1. On success of authentication in Plaid, a public token is returned and set in UI
1. UI calls API with public token
1. API exchanges public token for access token and keeps access token on API server (DB later?)
1. API lets UI know exhange worked
1. UI calls API for transactions
1. API uses access token to make the call fetch transactions from plaid
1. API returns 8 transactions to UI
1. UI spits 8 transactions to a ul -> li

## Next Steps

- Each time the UI is stopped or refreshed, the public token disapears
- Each time the API is stopped or refreshed, the access token disapears
- Public token expires i.e. how do we refresh without re-authing
- Access token expires i.e. how do we refresh without re-authing
