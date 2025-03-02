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
      "value": "reference"
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
      "value": "<table border='1' style=\"width:100%\">\n  <tr>\n        <td style=\"background-color:#f5680a;color:#fff\">${blockName}</td>\n      </tr>\n      <tr>\n        <td>\n        <img src=\"${posterUrl}\" alt=\"${name}\">\n        <br/>\n        <a href=\"${videoUrl}\">${name}</a>\n        </td>\n      </tr>   </table>"
    },
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
    },
    {
      "fields": [
        {
          "element": "drop-down",
          "name": "property=metadata.embedded.dc:language",
          "orientation": "vertical",
          "options": [
            {
              "label": "Albanian (Albania)",
              "value": "sq_al"
            },
            {
              "label": "Arabic (Tunisia)",
              "value": "ar_tn"
            },
            {
              "label": "Arabic (Yemen)",
              "value": "ar_ye"
            },
            {
              "label": "Belorussian (Belorussia)",
              "value": "be_by"
            },
            {
              "label": "Bulgarian (Bulgaria)",
              "value": "bg_bg"
            },
            {
              "label": "Catalan (Spain)",
              "value": "ca_es"
            },
            {
              "label": "Chinese (Hong Kong SAR of China)",
              "value": "zh_hk"
            },
            {
              "label": "Chinese (Simplified)",
              "value": "zh"
            },
            {
              "label": "Chinese (Taiwan region)",
              "value": "zh_tw"
            },
            {
              "label": "Croatian (Croatia)",
              "value": "hr_hr"
            },
            {
              "label": "Czech (Czech Republic)",
              "value": "cs_cz"
            },
            {
              "label": "Danish (Denmark)",
              "value": "da_dk"
            },
            {
              "label": "Dutch (Belgium)",
              "value": "nl_be"
            },
            {
              "label": "Dutch (Netherlands)",
              "value": "nl_nl"
            },
            {
              "label": "English",
              "value": "en"
            },
            {
              "label": "English (Australia)",
              "value": "en_au"
            },
            {
              "label": "English (Canada)",
              "value": "en_ca"
            },
            {
              "label": "English (India)",
              "value": "en_in"
            },
            {
              "label": "English (Ireland)",
              "value": "en_ie"
            },
            {
              "label": "English (New Zealand)",
              "value": "en_nz"
            },
            {
              "label": "English (South Africa)",
              "value": "en_za"
            },
            {
              "label": "English (United Kingdom)",
              "value": "en_gb"
            },
            {
              "label": "English (United States)",
              "value": "en_us"
            },
            {
              "label": "Estonian (Estonia)",
              "value": "et_ee"
            },
            {
              "label": "Finnish (Finland)",
              "value": "fi_fi"
            },
            {
              "label": "French",
              "value": "fr"
            },
            {
              "label": "French (Belgium)",
              "value": "fr_be"
            },
            {
              "label": "French (Canada)",
              "value": "fr_ca"
            },
            {
              "label": "French (France)",
              "value": "fr_fr"
            },
            {
              "label": "French (Luxembourg)",
              "value": "fr_lu"
            },
            {
              "label": "French (Switzerland)",
              "value": "fr_ch"
            },
            {
              "label": "German",
              "value": "de"
            },
            {
              "label": "German (Austria)",
              "value": "de_at"
            },
            {
              "label": "German (Germany)",
              "value": "de_de"
            },
            {
              "label": "German (Luxembourg)",
              "value": "de_lu"
            },
            {
              "label": "German (Switzerland)",
              "value": "de_ch"
            },
            {
              "label": "Greek (Greece)",
              "value": "el_gr"
            },
            {
              "label": "Hebrew (Israel)",
              "value": "iw_il"
            },
            {
              "label": "Hindi (India)",
              "value": "hi_in"
            },
            {
              "label": "Hungarian (Hungary)",
              "value": "hu_hu"
            },
            {
              "label": "Icelandic (Iceland)",
              "value": "is_is"
            },
            {
              "label": "Italian",
              "value": "it"
            },
            {
              "label": "Italian (Italy)",
              "value": "it_it"
            },
            {
              "label": "Italian (Switzerland)",
              "value": "it_ch"
            },
            {
              "label": "Japanese",
              "value": "ja"
            },
            {
              "label": "Japanese (Japan)",
              "value": "ja_jp"
            },
            {
              "label": "Korean (South Korea)",
              "value": "ko_kr"
            },
            {
              "label": "Latvian (Latvia)",
              "value": "lv_lv"
            },
            {
              "label": "Lithuanian (Lithuania)",
              "value": "lt_lt"
            },
            {
              "label": "Macedonian (Macedonia)",
              "value": "mk_mk"
            },
            {
              "label": "Norwegian (Bokmål) (Norway)",
              "value": "no_no"
            },
            {
              "label": "Norwegian (Nynorsk) (Norway)",
              "value": "no_no_ny"
            },
            {
              "label": "Polish (Poland)",
              "value": "pl_pl"
            },
            {
              "label": "Portuguese",
              "value": "pt"
            },
            {
              "label": "Portuguese (Brazil)",
              "value": "pt_br"
            },
            {
              "label": "Portuguese (Portugal)",
              "value": "pt_pt"
            },
            {
              "label": "Romanian (Romania)",
              "value": "ro_ro"
            },
            {
              "label": "Russian",
              "value": "ru"
            },
            {
              "label": "Russian (Russia)",
              "value": "ru_ru"
            },
            {
              "label": "Serbian (Cyrillic) (Yugoslavia)",
              "value": "sr_yu"
            },
            {
              "label": "Serbo-Croatian (Yugoslavia)",
              "value": "sh_yu"
            },
            {
              "label": "Simplified Chinese (China)",
              "value": "zh_cn"
            },
            {
              "label": "Slovak (Slovakia)",
              "value": "sk_sk"
            },
            {
              "label": "Slovenian (Slovenia)",
              "value": "sl_si"
            },
            {
              "label": "Spanish",
              "value": "es"
            },
            {
              "label": "Spanish (Argentina)",
              "value": "es_ar"
            },
            {
              "label": "Spanish (Bolivia)",
              "value": "es_bo"
            },
            {
              "label": "Spanish (Chile)",
              "value": "es_cl"
            },
            {
              "label": "Spanish (Colombia)",
              "value": "es_co"
            },
            {
              "label": "Spanish (Costa Rica)",
              "value": "es_cr"
            },
            {
              "label": "Spanish (Dominican Republic)",
              "value": "es_do"
            },
            {
              "label": "Spanish (Ecuador)",
              "value": "es_ec"
            },
            {
              "label": "Spanish (El Salvador)",
              "value": "es_sv"
            },
            {
              "label": "Spanish (Guatemala)",
              "value": "es_gt"
            },
            {
              "label": "Spanish (Honduras)",
              "value": "es_hn"
            },
            {
              "label": "Spanish (Mexico)",
              "value": "es_mx"
            },
            {
              "label": "Spanish (Nicaragua)",
              "value": "es_ni"
            },
            {
              "label": "Spanish (Panama)",
              "value": "es_pa"
            },
            {
              "label": "Spanish (Paraguay)",
              "value": "es_py"
            },
            {
              "label": "Spanish (Peru)",
              "value": "es_pe"
            },
            {
              "label": "Spanish (Puerto Rico)",
              "value": "es_pr"
            },
            {
              "label": "Spanish (Spain)",
              "value": "es_es"
            },
            {
              "label": "Spanish (Uruguay)",
              "value": "es_uy"
            },
            {
              "label": "Spanish (Venezuela)",
              "value": "es_ve"
            },
            {
              "label": "Swedish",
              "value": "sv"
            },
            {
              "label": "Swedish (Sweden)",
              "value": "sv_se"
            },
            {
              "label": "Thai (Thai digits) (Thailand)",
              "value": "th_th_th"
            },
            {
              "label": "Thai (Western digits) (Thailand)",
              "value": "th_th"
            },
            {
              "label": "Turkish (Turkey)",
              "value": "tr_tr"
            },
            {
              "label": "Ukrainian (Ukraine)",
              "value": "uk_ua"
            }
          ]
        }
      ],
      "header": "Language",
      "groupKey": "LanguageGroup"
    }
  ],
  "hideFilters": "true"
};

const { Core } = require('@adobe/aio-sdk')
const { errorResponse } = require('../utils')


// main function that will be executed by Adobe I/O Runtime
async function main(params) {
  // create a Logger
  const logger = Core.Logger('main', { level: params.LOG_LEVEL || 'info' })

  try {
    // 'info' is the default level if not set
    logger.info('Calling the main action')
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
