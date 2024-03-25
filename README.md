# Satte challange repo

This is a repo about sattelogic's challenge.

To run the clone the repo and run

`make build-development`
`make start-development`

repeat last one if you already build the image.

## App Usage

### Use the controls to make the search

Latitude and longitude fields need to be filled with decimal geographical coordinates.
Fill dates and the amount of max features per search that its needed.

### Search results

The results will be rendered at the left, as a list of links, each one with the id and date of that resource,
and at the right as polygons and markers inside the Map.

Each link will head to a page that contains all the information and a special map that renders that asset.

### Map

The map show the polygon of the search in violet and the results in red colored polygons.
The markers contains a link to the page with additional information.

In the top right you have a layer control where you can toggle the visibility of any polygon.
