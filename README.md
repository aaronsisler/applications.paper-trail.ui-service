# applications.paper-trail.ui-service

1. UI -> API Call get token
1. API -> https://sandbox.plaid.com/link/token/create

   ```
   {
     "client_id": "CLIENT_ID",
     "secret": "SECRET",
     "user": {    "client_user_id": "unique-per-user"
     },
     "client_name": "Plaid App",
     "products": ["auth","transactions"],
   }
   ```

1. This returns a `link_token` which seems to be "clicked"
