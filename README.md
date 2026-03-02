# Lucknow Hotel Compare

A Lucknow-only hotel booking comparison project built with Node.js, Express, EJS, and MongoDB.

## What it does
- Shows hotel listings only for **Lucknow, Uttar Pradesh**
- Lets users create/edit listing cards with price and photos
- Adds review comparison blocks for these platforms:
  - Trip Advisor
  - Google
  - MakeMyTrip
  - Oyo
  - Booking.com
  - Agoda

## Quick start (easy executable)
1. Install dependencies
   - `npm install`
2. Start MongoDB locally (default URL is `mongodb://localhost:27017/classified`)
3. Run app
   - `npm start`
4. Open `http://localhost:3000`

## Optional environment variables
- `DB_URL`
- `SECRET`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_KEY`
- `CLOUDINARY_SECRET`

> If Cloudinary variables are not set, listing creation with image upload may fail; run without uploading images or configure Cloudinary.
