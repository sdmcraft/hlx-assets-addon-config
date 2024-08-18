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
  "useProdDomain": true,
  "copyMode": [
    {
      "mimeType": "image/*",
      "value": "use-alt-text"
    }
  ],
  "blockName": [
    {
      "mimeType": "video/*",
      "value": "Video"
    }
  ],
  "blockTemplate": [
    {
      "mimeType": "video/*",
      "value": "<table border='1' style='width:100%'><tr><td>${blockName}</td></tr><tr><td><img src='${posterUrl}' alt='${name}'><br/><a href='${videoUrl}'>${name}</a></td></tr></table>"
    }
  ],
  "filterSchema": [
    {
      "header": "File Types",
      "groupKey": "TopGroup",
      "fields": [
        {
          "defaultValue": [
            "image/*"
          ],
          "element": "checkbox",
          "name": "type",
          "options": [
            {
              "label": "Images",
              "value": "image/*"
            },
            {
              "label": "Videos",
              "value": "video/*"
            },
            {
              "label": "Documents",
              "value": "application/pdf"
            },
            {
              "label": "Archives",
              "value": "application/zip"
            }
          ],
          "columns": 2
        }
      ]
    },
    {
      "header": "Assets Tags",
      "groupKey": "AssetTagsGroup",
      "fields": [
        {
          "element": "taggroup",
          "name": "property=metadata.application.xcm:keywords.id",
          "columns": 3
        }
      ]
    },
    {
      "header": "Asset Status",
      "groupKey": "AssetStatusGroup",
      "fields": [
        {
          "element": "checkbox",
          "name": "status",
          "options": [
            {
              "label": "Active",
              "value": "active"
            },
            {
              "label": "Inactive",
              "value": "inactive"
            }
          ],
          "orientation": "horizontal",
          "columns": 2
        }
      ]
    },
    {
      "fields": [
        {
          "element": "checkbox",
          "name": "expiredAsset",
          "options": [
            {
              "label": "Expired",
              "value": "expired"
            }
          ],
          "orientation": "horizontal",
          "columns": 2
        },
        {
          "element": "DateRange",
          "name": "property=pur:expirationDate",
          "position": "top",
          "label": "Expiration Duration",
          "orientation": "horizontal"
        }
      ],
      "header": "Expiration Status",
      "groupKey": "ExpirationGroup"
    }
  ],
  "hideFilters": "true"
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
