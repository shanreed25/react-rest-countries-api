# Reflection

## Development process

I built a react UI with placeholders first because that was the easiest part. Then I started working with the data writing the types for the API response and a function that converts each API country into a `Country` object for the app. I put the fetching logic in a custom hook, `useCountries`, so `App` only asks for the countries and does not deal with loading or errors directly. After the data was working, I started adding the UI components I built and connecting them to the data.

## Challenges and solutions

I used a loop to keep getting countries until I got all the countries because the free API plan only returns 100 countries per request and there are 254 countries. I used local storage to cache the country for 24 hours.

I assumed handling error would be easier because I tried to just use what I had built from previous project but it did not work out as I planned it. I had to make an `ApiError` class that stores the HTTP status because the error only had a message. I also used an `AbortController` in the `useEffect` cleanup so requests do not stack up when the component re-renders.

Some countries have no flag, so the card shows a placeholder when the image is missing or fails to load. I had a hard time getting my environment variables to work at first so I had to learn how Vite handles environment and the API key had to be set as a build variable in Cloudflare.

## Potential improvements

- Add a details page with border countries
- Add a light and dark theme using the Context API
- Format population numbers with commas
- Add tests for the utility functions
