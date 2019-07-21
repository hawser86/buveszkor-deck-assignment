# buveszkor-deck-assignment

A tool to find the best card assignment for the **BME Bűvészkör - körpakli** project based on the votes of the
participants in a Google Form.

## Prerequisites
In order to use the script, or run the tests install NodeJs, then install dependencies
```
npm install
```

## Run the script
1. First download the results of the [Google Form](https://docs.google.com/forms/d/1uxkwyGVn4oI1Zh0oLD6NKE16O2DnTgp7-h6Ok3_C1Sw/edit#responses)
   as a csv file.
2. Run the script
   ```
   node scripts/best-assignments.js --file [path-to-csv]
   ```
3. Wait for the result (it will take a while)

## Testing
```
npm test
npm test:watch
```
