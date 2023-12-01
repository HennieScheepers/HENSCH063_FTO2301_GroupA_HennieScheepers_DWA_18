This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

# Podcast Application Feature Documentation

## Table of Contents

- [Podcast Application Feature Documentation](#podcast-application-feature-documentation)
  - [Table of Contents](#table-of-contents)
  - [Deployment](#deployment)
  - [Favicon Configuration](#favicon-configuration)
  - [Metatag Setup](#metatag-setup)
  - [Advanced Audio Experience](#advanced-audio-experience)
  - [User Personalization](#user-personalization)
  - [Intelligent Sorting and Filtering](#intelligent-sorting-and-filtering)
  - [Seamless Supabase Integration](#seamless-supabase-integration)
  - [Secure User Authentication](#secure-user-authentication)
  - [Responsive Design Excellence](#responsive-design-excellence)
  - [Show Information Presentation](#show-information-presentation)
  - [Efficient Loading States](#efficient-loading-states)
  - [API Interaction](#api-interaction)

## Deployment

- The application is successfully deployed to a unique Netlify URL.

## Favicon Configuration

- Favicon details are meticulously crafted and implemented using [RealFaviconGenerator](https://realfavicongenerator.net/).
- Choose any suitable PNG image from [Flaticon](https://www.flaticon.com/) for customization.

## Metatag Setup

- All metatag specifications are designed and integrated via [Metatags](https://metatags.io/).
- Utilize images from [Unsplash](https://unsplash.com/) during metatag creation.
- Post-deployment, ensure manual substitution of URL values with absolute Netlify URLs, especially the image URL.

## Advanced Audio Experience

- Users enjoy a seamless audio experience, allowing them to play any episode within a season effortlessly.
- The audio player remains consistently visible, facilitating continuous playback while browsing.
- A user confirmation prompt prevents unintentional closure when audio is active.
- The application intuitively recalls the last listened show and episode upon re-entry.
- Precise tracking of the last listening timestamp is preserved within a 10-second accuracy period upon closure.
- The audio player displays current progress and episode duration as timestamps.

## User Personalization

- Users can view the timestamp of when an episode was added to their favorites list.
- Episodes are logically organized by season/show within the favorites section.
- A dedicated favorites view allows users to conveniently explore all their favored content.
- Show and season details are visible for each episode in the favorites list.
- Favorites can be arranged based on date updated, both in ascending and descending order.
- Alphabetical sorting is available for show titles from A-Z and Z-A.
- User favorites are securely stored within the [Supabase](https://app.supabase.com) database.
- Automatic synchronization of user favorites ensures a seamless experience across devices.
- Users can mark and unmark specific episodes as favorites, tailoring their content selection.

## Intelligent Sorting and Filtering

- Shows are automatically filtered by genre when the genre label is interacted with.
- An intuitive text input allows users to filter shows based on title.
- Efficient sorting options include date updated (ascending and descending) and alphabetical arrangement of titles (A-Z and Z-A).
- Genre associations, human-readable last updated dates, and the number of seasons per show are prominently displayed during browsing.
- Preview images provide a visual overview of shows available on the platform.
- A comprehensive list of all available shows is easily accessible.

## Seamless Supabase Integration

- User favorites are securely stored within the [Supabase](https://app.supabase.com) database.

## Secure User Authentication

- Users can securely log in using [Supabase](https://app.supabase.com) authentication.

## Responsive Design Excellence

- All application views are meticulously designed to ensure flawless display on the smallest mobile devices, including the "iPhone SE". Emulation is possible using Chrome Dev tools.

## Show Information Presentation

- Users seamlessly navigate back to a show view from a season-specific perspective.
- The number of episodes in a season is clearly presented.
- Preview images offer a visual snapshot of seasons for a specific show.
- Easy toggling between different seasons within the same show is facilitated.
- A dedicated view showcases episodes specific to a selected season.
- Detailed breakdowns of shows, organized by season and sorted by episode number, provide comprehensive information.
- All show data is efficiently loaded through a `fetch` call from the [Podcast API](https://podcast-api.netlify.app/shows).

## Efficient Loading States

- Users experience a loading state while new data is being loaded.
- A loading state is seamlessly integrated during the initial data load.
- Data for specific shows is fetched via `fetch` from individual show endpoints, ensuring a responsive experience.

## API Interaction

- The application interacts seamlessly with the [Podcast API](https://podcast-api.netlify.app/shows) to retrieve and present show data.
