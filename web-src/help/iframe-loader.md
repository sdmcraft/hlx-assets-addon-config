# Dynamic Iframe Loader

## Overview
The Dynamic Iframe Loader is a web application that allows users to add multiple iframes dynamically, specify headers and URLs for each iframe, and load all iframes simultaneously. The iframes are displayed in a responsive layout, with a maximum of 4 iframes per row.

[📺 Watch Demo Video](iframe-loader.mp4)

## Features
- Add multiple iframes dynamically.
- Provide a custom header and URL for each iframe.
- Load all iframes simultaneously.
- Remove any iframe from the view.
- Responsive layout with a maximum of 4 iframes per row.
- Rows are evenly spaced to occupy the full screen height.

## How to Use
1. **Initial View**: The application starts with 2 iframes displayed by default.
2. **Adding More Iframes**:
   - Click on the `➕ Add Iframe` button.
   - Two input fields appear for the new iframe:
     - The first input is for the iframe's header.
     - The second input is for the URL to be loaded inside the iframe.
3. **Loading the Iframes**:
   - Enter the desired headers and URLs in the input fields.
   - Click the `Load` button to load the URLs into their respective iframes.
4. **Removing an Iframe**:
   - Each iframe has a `✖` (cross) button at the top-right corner.
   - Click the button to remove the iframe from the view.
5. **Responsive Layout**:
   - A maximum of 4 iframes are displayed per row.
   - When more iframes are added, they are placed in a new row.
   - The height of all rows adjusts dynamically to occupy the full screen height.



## Technical Details
- Built with HTML, CSS, and JavaScript.
- Uses `flexbox` for layout and responsiveness.
- Dynamically adjusts row heights based on the number of iframes.

## Future Enhancements
- Option to specify iframe sizes.
- Support for saving and reloading previous iframe configurations.
- Additional styling improvements for better UI/UX.

