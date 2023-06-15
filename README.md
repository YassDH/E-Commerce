#  E-Commerce Website
## Project Description
**React** front-end full operating dynamic and responsive E-Commerce shop including payment connection **(stripe)** with a **NestJS** back-end with authentification handled by **JWT**.
## To run the application :
Run **npm install** in both **frontend** and **backend** directories
Then add **.env** files in both **frontend** and **backend** directories

**frontend -env :**
REACT_APP_STRIPE_PUBLIC_KEY=

**backend -env :**
APP_PORT=
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
JWT_SECRET=
API_SECRET_KEY= //Your Stripe Secret Key
NEWS_MAIL=//Your Email To Send News To The Newsletter Subscribers
NEWS_PASSWORD=//Your Email password (if you're using Gmail you'll find the password here [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) but you need first to enable 2FA ) .
