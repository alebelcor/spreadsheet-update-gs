/**
 * @param {string} message
 */
function logError(message) {
  return ContentService.createTextOutput('ERROR: ' + message);
}

/**
 * @param {object} e {@link https://developers.google.com/apps-script/guides/web#url_parameters}
 */
function validateParameters(e) {
  if (typeof e.parameter.sheet === 'undefined' || e.parameter.sheet.length === 0) {
    return logError('Query string parameter "sheet" is missing');
  }

  const sheetNumber = parseInt(e.parameter.sheet, 10);

  if (isNaN(sheetNumber) || sheetNumber < 1) {
    return logError('Query string parameter "sheet" should be a valid number');
  }

  if (typeof e.parameter.cell === 'undefined') {
    return logError('Query string parameter "cell" is missing');
  }

  if (typeof e.parameter.value === 'undefined') {
    return logError('Query string parameter "value" is missing');
  }

  const cell = e.parameters.cell;
  const value = e.parameters.value;

  if (cell.length !== value.length) {
    return logError('Query string parameters "cell" and "value" should have the same amount of values');
  }
}

/**
 * @param {object} e {@link https://developers.google.com/apps-script/guides/web#url_parameters}
 */
function doGet(e) {
  const parameterError = validateParameters(e);

  if (parameterError) {
    return parameterError;
  }

  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  if (activeSpreadsheet === null) {
    return logError('No currently active spreadsheet');
  }

  const sheetNumber = e.parameter.sheet - 1;
  const sheet = activeSpreadsheet.getSheets()[sheetNumber];

  if (typeof sheet === 'undefined') {
    return logError('The specified sheet (' + sheetNumber + ') was not found in the spreadsheet');
  }

  const cells = e.parameters.cell;
  const values = e.parameters.value;

  for (var i = 0; i < cells.length; i++) {
    var cell;

    try {
      cell = sheet.getRange(cells[i]);
    } catch (e) {
      return logError('Cell (' + cells[i] + ') was not found in the sheet');
    }

    cell.setValue(values[i]);
  }
}
