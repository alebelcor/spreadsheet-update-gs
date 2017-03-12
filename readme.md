# spreadsheet-update-gs

>️ Update a Google Spreadsheet via GET requests with Google Apps Script

Programmatically update a Google Spreadsheet (you own) via HTTP `GET` requests.

## Install

1. Open a Google Spreadsheet
2. On the menu bar, click on "Tools" > "Script Editor"
3. Copy and paste the contents of `index.gs`
4. Save the file and project
5. On the menu bar, click on "Publish" > "Deploy as web app..."
6. Ensure "Execute the app as" and "Who has access to the app" are setup correctly. Choose `Me` and `Anyone, even anonymous` for the most permissive authorization.
7. Click the "Deploy" button

## Examples

Let's pretend our web app URL is `https://script.google.com/macros/s/.../exec`

Scenario A: Update the `b2` cell with the value `food` of the _first_ sheet on my spreadsheet.

```txt
https://script.google.com/macros/s/.../exec?sheet=1&cell=b2&value=food
```

Scenario B: Update cells `c1`, `c2` and `c3` with the values `10`, `20` and `50` (respectively) of the _second_ sheet on my spreadsheet.

```txt
https://script.google.com/macros/s/.../exec?sheet=2&cell=c1&cell=c2&cell=c3&value=10&value=20&value=50
```

## API

### sheet

Type: `number`

The number of the sheet where the cells are being updated. Must be `1` or greater.

### cell

Type: `string`

The name(s) of the cell(s) being updated.

### value

Type: `string`

The value(s) for the cell(s) being updated.

## License

MIT © Alejandro Beltrán
