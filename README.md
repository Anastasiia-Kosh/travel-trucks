# TravelTrucks

TravelTrucks is a camper rental web application that allows users to browse available campers, filter the catalog, view detailed vehicle information and submit booking requests.

## Features

- Camper catalog loaded from the backend
- Filtering by location, camper form, engine and transmission
- Pagination with Load More
- Detailed camper pages
- Image gallery powered by Swiper
- Customer reviews with five-star ratings
- Booking form with validation
- Success and error notifications
- Loading indicators for asynchronous requests

## Technologies

- Next.js
- TypeScript
- TanStack Query
- Axios
- CSS Modules
- Formik
- Yup
- Swiper
- React Hot Toast

## Routes

- `/` — home page
- `/catalog` — camper catalog
- `/catalog/[camperId]` — camper details

## Installation

Clone the repository and install its dependencies:

```bash
git clone https://github.com/Anastasiia-Kosh/travel-trucks.git
cd travel-trucks
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Production build

```bash
npm run build
npm start
```

## Resources

- [Figma design](https://www.figma.com/design/6vTbzaB3EPgOreQz2jOJJe/Campers)
- [Backend documentation](https://campers-api.goit.study/docs)
- Live application — link will be added after deployment

## Author

Anastasiia Kosh

- [GitHub](https://github.com/Anastasiia-Kosh)
