# QnA Forum API

## Overview

A RESTful API for a QnA forum discussion. [View Documentation](https://localhost:3000/).

## Installation

### Requirements

- Node.js

### Setup

**1. Install Necessary Packages**

On your terminal, from the folder directory:
```
npm install
```
___
**2. Create a ".env" File**

At the root of this folder, create a `.env` file. Edit its content with:
```
DATABASE_URL="postgresql://[PostgresUsername]:[UsernamePassword]@[DatabaseURL]/qna_forum"
JWT_SECRET="[Your-Desired-Secret-Phrase]"
BCRYPT_SALT_ROUNDS="[YourDesiredInteger]"
```
<u>**Fill in the bracket with your own preferences and then remove the bracket afterwards.**</u>

___
**3. Database Creation and Setup**

On your terminal, from the folder directory:
```
npx ts-node -T prisma/scripts/init-db.ts
```
This will create a database named `qna_forum` on the `postgres` connection if the database does not exist yet.

Next,
```
npx prisma migrate dev --config=prisma.config.ts
```
This will run Prisma migrations.

Next,
```
npx prisma generate --config=prisma.config.ts
```
This will generate Prisma Client.

Next,
```
npx ts-node -T prisma/scripts/seed.ts
```
This will seed the database.