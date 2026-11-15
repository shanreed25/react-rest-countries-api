# React Rest Countries API

**React application that fetches data from the REST Countries API , displays country information, and includes a color theme switcher for light and dark modes.**

> **Live demo:** https://react-rest-countries-api.shannontlreed.workers.dev/


- [X] Project Setup
- [X] Setup the functinality to Load the data from the API
- [X] Create Home page
- [X] Setup Routing
- [X] Create Details Page
- [ ] Add Theme(review other api project for theme details and convert the code from there)
- [ ] Clean up code and add accessibility

> [Reflection](./Reflection.md)


## Project Summary

### Rest Countries API

> `restCountriesApi.ts` is where all the API code is. The main functions it uses are `loadCountries()`, `getAllCountries()` and `getCountries()`

- **`loadCountries()`** is the entry function and it uses the cached data in localStorage or gets fresh data from the API and stores it in localStorage then passes it to the App component
    - **Cached Data:** if it is not pass the 24 hour limit the data returned from the `readCacheCountries()` function in `cacheUtils.ts` is used
    - **Fresh Data:**  if the 24 hour limit has passed it uses the `getAllCountries()` function to get fresh data from the API and saves to it to localStorage using the `writeCacheCountries()` function in `cacheUtils.ts`
    - **Pass Data To App Component:** the `useCountries()` hook starts in loading state then uses `loadCountries()` and ends in success or error state
- **`getAllCountries()`** gets 100 countries at a time, using the `getCountries()` function and the offset parameter each time by moving it forward by the number of countries already returned 
- **`getCountries()`** sends the fetch request with the API key in the header, throwing a custom ApiError if the request fails
    - **`createCountriesUrl`** is used to build the query using the browser's `URLSearchParams()`
    - **`createApiError()`** uses the `ApiError` custom class to turn a failed response into a readable message with a status code

> `convertAPICountryObject()` is used to turn each country object into a flat country shape the components can use

### User Facing 
**The user-facing side does 3 things show the right screen for the loading state, let the user search and filter, and display the country cards.**

#### Showing the right Screen
**The screen that is used is based on the status that the `useCountries()` hook returns**

- `loading` state the user sees a status message with "Loading countries....."
- `error` state the user sees a status message with `role="alert"` and the error message
- `success` state the user sees the home page with a list of countries as cards

#### Searching and filtering
**`useCountryFilters()` hook keeps the filter logic out of the app and the app only add valuse to the components**

- `useCountryFilters()` holds two pieces of state that the user controls for searching and filtering
    - **`searchQuery`:** controlled input for the text typed in the search box and starts as `""`
    - **`region`:** controlled input for the filter by region dropdown and starts as `""` which means all regions
- **`getRegions()`** helper function builds the dropdown options fron the data by looping over the country regions, removing duplicates and sorting them. It is wrapped in `useMemo()` which saves the results and only call it again if the dependency array `[countries]` changes
- **`filterByRegion()`** helper function returns all regions, when a region is choosen it builds a new array from the countries whose region match the choosen region and the original array of countries is left unchanged
- **`searchByName`** helper function returns all countries, when text is typed in the search input it builds a new array from the countries whose name includes the text and the original array of countries is left unchanged

> The inputs are controlled inputs and only get a `value` and a `OnChange` holding no state