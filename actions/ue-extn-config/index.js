/*
* <license header>
*/

/**
 * This is a sample action showcasing how to access an external API
 *
 * Note:
 * You might want to disable authentication and authorization checks against Adobe Identity Management System for a generic action. In that case:
 *   - Remove the require-adobe-auth annotation for this action in the manifest.yml of your application
 *   - Remove the Authorization header from the array passed in checkMissingRequestInputs
 *   - The two steps above imply that every client knowing the URL to this deployed action will be able to invoke it without any authentication and authorization checks against Adobe Identity Management System
 *   - Make sure to validate these changes against your security requirements before deploying the action
 */

const AS_CONFIG = {
  "repoNames": [
    "delivery-p66302-e574366.adobeaemcloud.com",
    "author-p66302-e574366.adobeaemcloud.com",
  ],
  "preferredDimensions":{
      "minWidth": 500,
      "maxWidth": 2000,
      "minHeight": 500,
      "maxHeight": 2000
  },
  "filterSchema": [
      {
          "fields": [
              {
                  "element": "checkbox",
                  "name": "type",
                  "defaultValue": [
                      "image/*"
                  ],
                  "options": [
                      {
                          "label": "Image",
                          "value": "image/*",
                          "readOnly": true
                      }
                  ],
                  "orientation": "horizontal"
              }
          ],
          "header": "File Type",
          "groupKey": "FileTypeGroup"
      },
      {
          "fields": [
            {
              "element": "Number",
              "name": "property=tiff:imageWidth",
              "range": true,
              "quiet": true,
              "label": "Width",
              "hideArrows": true,
              "columns": 2,
              "readOnly": true,
              "defaultValue": [
                {
                  "min": 0,
                  "max": 1000
                }
              ]
            }
          ],
          "header": "Size",
          "groupKey": "SizeGroup"
        }
  ]
};

const fetch = require('node-fetch')
const { Core } = require('@adobe/aio-sdk')
const { errorResponse, getBearerToken, stringParameters, checkMissingRequestInputs } = require('../utils')


function matchesPattern(pattern, text) {
  const regex = new RegExp(pattern, 'i'); // 'i' flag makes the regex case-insensitive
  return regex.test(text);
}

// Function to find tags matching the provided path
function findMatchingTags(webPath, json, logger) {
  logger.info(`Finding matching tags for path: ${webPath}`);
  const matchingTags = [];

  json.data.forEach(item => {
    if (matchesPattern(item.pattern, webPath)) {
      matchingTags.push(item);
    }
  });

  return matchingTags;
}

function injectDefaultTags(tags) {
  AS_CONFIG.filterSchema.forEach(schema => {
    if (schema.groupKey === 'AssetTagsGroup') {
      schema.fields.forEach(field => {
        if (field.name === 'property=metadata.application.xcm:keywords.id') {
          field.defaultValue = tags.map(tag => tag.id);
          field.options = tags.map(tag => {
            return {
              label: tag.name,
              value: tag.id
            };
          });
        }
      });
    }
  });
}

// main function that will be executed by Adobe I/O Runtime
async function main(params) {
  // create a Logger
  const logger = Core.Logger('main', { level: params.LOG_LEVEL || 'info' })

  try {
    // 'info' is the default level if not set
    logger.info('Calling the main action')

    // log parameters, only if params.LOG_LEVEL === 'debug'
    logger.debug(stringParameters(params))

    // check for missing request input parameters and headers
    const requiredParams = [];
    // const requiredHeaders = ['Authorization']
    const requiredHeaders = []
    const errorMessage = checkMissingRequestInputs(params, requiredParams, requiredHeaders)
    if (errorMessage) {
      // return and log client errors
      return errorResponse(400, errorMessage, logger)
    }

    // extract the user Bearer token from the Authorization header
    //const token = getBearerToken(params)

    if (params['webPath']) {
      // replace this with the api you want to access
      const apiEndpoint = 'https://assets-addon.adobeaemcloud.com/tags.json'

      // fetch content from external api endpoint
      const res = await fetch(apiEndpoint)
      if (!res.ok) {
        throw new Error('request to ' + apiEndpoint + ' failed with status code ' + res.status)
      }
      const content = await res.json();
      logger.info(`Fetched content from ${apiEndpoint}`);
      const matchingTags = findMatchingTags(params['webPath'], content, logger);
      injectDefaultTags(matchingTags);

    }
    const response = {
      statusCode: 200,
      body: AS_CONFIG
    };

    // log the response status code
    logger.info(`${response.statusCode}: successful request`)
    return response
  } catch (error) {
    // log any server errors
    logger.error(error)
    // return with 500
    return errorResponse(500, 'server error', logger)
  }
}

exports.main = main
